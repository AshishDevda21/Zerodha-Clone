import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Number(value || 0));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/myOrders");
        if (mounted) {
          setOrders(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || "Unable to load orders");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();
    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const totalOrders = orders.length;
    const totalQty = orders.reduce((acc, order) => acc + Number(order.qty || 0), 0);
    const totalValue = orders.reduce(
      (acc, order) => acc + Number(order.qty || 0) * Number(order.price || 0),
      0
    );
    return { totalOrders, totalQty, totalValue };
  }, [orders]);

  if (loading) {
    return (
      <div className="orders-page">
        <h3 className="title">Orders</h3>
        <div className="orders-state">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <h3 className="title">Orders</h3>
        <div className="orders-state error">{error}</div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="orders-page">
        <h3 className="title">Orders</h3>
        <div className="orders-empty-card">
          <p>You have no buy orders yet.</p>
          <Link to={"/dashboard"} className="btn btn-blue">
            Start buying
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h3 className="title">Orders</h3>

      <div className="orders-summary-grid">
        <div className="orders-summary-card">
          <span>Total Orders</span>
          <h4>{summary.totalOrders}</h4>
        </div>
        <div className="orders-summary-card">
          <span>Total Quantity</span>
          <h4>{summary.totalQty}</h4>
        </div>
        <div className="orders-summary-card">
          <span>Total Value</span>
          <h4>{formatMoney(summary.totalValue)}</h4>
        </div>
      </div>

      <div className="orders-table-wrap">
        <table className="orders-modern-table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Mode</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const value = Number(order.qty || 0) * Number(order.price || 0);
              return (
                <tr key={order._id}>
                  <td className="stock-name">{order.name}</td>
                  <td>
                    <span className="order-badge">{order.mode}</span>
                  </td>
                  <td>{order.qty}</td>
                  <td>{formatMoney(order.price)}</td>
                  <td>{formatMoney(value)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
