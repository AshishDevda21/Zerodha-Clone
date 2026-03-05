import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import API from "./api";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const normalizeTransactions = (list) =>
  (Array.isArray(list) ? [...list] : []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

const getTransactionType = (tx) => tx.transactionType || tx.type || "ADD";

const getTransactionLabel = (txType) => {
  const map = {
    BUY: "Buy",
    SELL: "Sell",
    ADD: "Add Fund",
    WITHDRAW: "Withdrawal",
  };
  return map[txType] || txType;
};

const Funds = () => {
  const [totalFunds, setTotalFunds] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [addAmount, setAddAmount] = useState(500);
  const [withdrawAmount, setWithdrawAmount] = useState(500);
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [isSubmittingWithdraw, setIsSubmittingWithdraw] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchFunds = async () => {
      try {
        setLoading(true);
        const res = await API.get("/funds");

        if (!mounted) return;

        setTotalFunds(res.data.totalFunds || 0);
        setTransactions(normalizeTransactions(res.data.transactions));
        setError("");
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || "Unable to load funds");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFunds();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onFundsUpdated = (event) => {
      const nextTotal = event?.detail?.totalFunds;
      const nextTx = event?.detail?.latestTransaction;

      if (typeof nextTotal === "number") {
        setTotalFunds(nextTotal);
      }

      if (nextTx) {
        setTransactions((prev) => normalizeTransactions([nextTx, ...prev]));
      }
    };

    window.addEventListener("funds-updated", onFundsUpdated);
    return () => window.removeEventListener("funds-updated", onFundsUpdated);
  }, []);

  const totalAdded = useMemo(
    () =>
      transactions.reduce(
        (sum, tx) =>
          sum + (getTransactionType(tx) === "ADD" ? Number(tx.amount || 0) : 0),
        0
      ),
    [transactions]
  );

  const totalWithdrawn = useMemo(
    () =>
      transactions.reduce(
        (sum, tx) =>
          sum +
          (getTransactionType(tx) === "WITHDRAW" ? Number(tx.amount || 0) : 0),
        0
      ),
    [transactions]
  );

  const handleAddFunds = async () => {
    const numericAmount = Number(addAmount);
    if (!numericAmount || numericAmount < 500) {
      Swal.fire({
        icon: "warning",
        title: "Invalid amount",
        text: "Minimum add amount is 500 INR.",
      });
      return;
    }

    try {
      setIsSubmittingAdd(true);
      const res = await API.post("/funds/add", { amount: numericAmount });

      setTotalFunds(res.data.totalFunds || 0);
      setTransactions(normalizeTransactions(res.data.transactions));
      setIsAddModalOpen(false);
      setAddAmount(500);

      Swal.fire({
        icon: "success",
        title: "Funds added",
        text: `${formatCurrency(numericAmount)} added successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Add fund failed",
        text: err.response?.data?.message || "Unable to add funds.",
      });
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  const handleWithdrawFunds = async () => {
    const numericAmount = Number(withdrawAmount);
    if (!numericAmount || numericAmount < 500) {
      Swal.fire({
        icon: "warning",
        title: "Invalid amount",
        text: "Minimum withdraw amount is 500 INR.",
      });
      return;
    }

    if (!withdrawPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password required",
        text: "Please enter your password.",
      });
      return;
    }

    try {
      setIsSubmittingWithdraw(true);
      const res = await API.post("/funds/withdraw", {
        amount: numericAmount,
        password: withdrawPassword,
      });

      setTotalFunds(res.data.totalFunds || 0);
      setTransactions(normalizeTransactions(res.data.transactions));
      setIsWithdrawModalOpen(false);
      setWithdrawAmount(500);
      setWithdrawPassword("");

      Swal.fire({
        icon: "success",
        title: "Withdrawal successful",
        text: `${formatCurrency(numericAmount)} withdrawn successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      const message = err.response?.data?.message || "Unable to withdraw funds.";
      if (message === "Incorrect password") {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Incorrect password",
          showConfirmButton: false,
          timer: 1800,
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Withdraw failed",
        text: message,
      });
    } finally {
      setIsSubmittingWithdraw(false);
    }
  };

  if (loading) {
    return (
      <div className="funds-page-modern">
        <h3 className="title">Funds</h3>
        <div className="funds-state">Loading funds...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="funds-page-modern">
        <h3 className="title">Funds</h3>
        <div className="funds-state error">{error}</div>
      </div>
    );
  }

  return (
    <div className="funds-page-modern">
      <div className="funds-header-modern">
        <div>
          <h3 className="title">Funds</h3>
          <p className="funds-subtitle">Manage and track your account balance</p>
        </div>
        <div className="funds-actions">
          <button className="btn btn-green" onClick={() => setIsAddModalOpen(true)}>
            Add Fund
          </button>
          <button className="btn btn-blue" onClick={() => setIsWithdrawModalOpen(true)}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="funds-cards-grid">
        <div className="funds-balance-card">
          <p>Total Available Funds</p>
          <h2>{formatCurrency(totalFunds)}</h2>
        </div>
        <div className="funds-stat-card">
          <p>Total Added</p>
          <h4>{formatCurrency(totalAdded)}</h4>
        </div>
        <div className="funds-stat-card">
          <p>Total Transactions</p>
          <h4>{transactions.length}</h4>
        </div>
        <div className="funds-stat-card">
          <p>Total Withdrawn</p>
          <h4>{formatCurrency(totalWithdrawn)}</h4>
        </div>
      </div>

      <div className="funds-history-panel">
        <div className="funds-history-header">
          <h4>Transaction History</h4>
        </div>

        {!transactions.length ? (
          <div className="funds-empty-history">No fund transactions yet.</div>
        ) : (
          <div className="funds-history-table-wrap">
            <table className="funds-history-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => {
                  const txType = getTransactionType(tx);
                  const isDebit = txType === "WITHDRAW" || txType === "BUY";

                  return (
                    <tr key={tx._id || `${tx.createdAt}-${idx}`}>
                      <td>
                        <span className={`fund-badge ${isDebit ? "withdraw" : "add"}`}>
                          {getTransactionLabel(txType)}
                        </span>
                      </td>
                      <td className="fund-amount">{formatCurrency(tx.amount)}</td>
                      <td>{formatDateTime(tx.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="funds-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="funds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="funds-modal-head">
              <h4>Add Funds</h4>
              <button
                className="funds-close"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close"
              >
                x
              </button>
            </div>
            <p className="funds-modal-note">Enter amount in INR (minimum 500)</p>
            <input
              className="funds-input"
              type="number"
              min="500"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />
            <button
              className="btn btn-blue funds-submit"
              onClick={handleAddFunds}
              disabled={isSubmittingAdd}
            >
              {isSubmittingAdd ? "Adding..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {isWithdrawModalOpen && (
        <div
          className="funds-modal-backdrop"
          onClick={() => setIsWithdrawModalOpen(false)}
        >
          <div className="funds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="funds-modal-head">
              <h4>Withdraw Funds</h4>
              <button
                className="funds-close"
                onClick={() => setIsWithdrawModalOpen(false)}
                aria-label="Close"
              >
                x
              </button>
            </div>
            <p className="funds-modal-note">Enter withdraw amount and password</p>
            <input
              className="funds-input"
              type="number"
              min="1"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <input
              className="funds-input"
              type="password"
              placeholder="Password"
              value={withdrawPassword}
              onChange={(e) => setWithdrawPassword(e.target.value)}
            />
            <button
              className="btn btn-blue funds-submit"
              onClick={handleWithdrawFunds}
              disabled={isSubmittingWithdraw}
            >
              {isSubmittingWithdraw ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
