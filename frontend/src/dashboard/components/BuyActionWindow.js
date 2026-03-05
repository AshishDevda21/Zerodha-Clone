
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import API from "./api"; 
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";




const BuyActionWindow = ({ uid, stockPrice }) => {
  const context = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);

  const [stockPriceState, setStockPriceState] = useState(stockPrice);

 
  useEffect(() => {
    setStockPriceState(stockPrice);
  }, [stockPrice]);


  const handleBuyClick = async () => {
    if (stockQuantity <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid quantity",
        text: "Enter a valid quantity",
      });
      return;
    }

    try {
      const res = await API.post("/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPriceState),
        mode: "BUY",
      });

      window.dispatchEvent(
        new CustomEvent("funds-updated", {
          detail: {
            totalFunds: res.data?.totalFunds,
            latestTransaction: res.data?.latestTransaction,
          },
        })
      );

      Swal.fire({
        icon: "success",
        title: "Order placed",
        text: res.data?.message || "Buy order placed successfully.",
        timer: 1400,
        showConfirmButton: false,
      });
      context.closeBuyWindow();
    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Order failed",
        text: err.response?.data?.message || "Order failed",
      });
    }
  };

// const BuyActionWindow = ({ uid, stockPrice }) => {
//   const context = useContext(GeneralContext);

//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPriceState, setStockPrice] = useState(stockPrice);

//   useEffect(() => {
//     setStockPrice(stockPrice);
//   }, [stockPrice]);

//   const handleBuyClick = () => {
//     axios.post("http://localhost:3002/newOrder", {
//       name: uid,
//       qty: stockQuantity,
//       price: stockPriceState,
//       mode: "BUY",
//     });

//     context.closeBuyWindow();
//   };

  const handleCancelClick = () => {
    context.closeBuyWindow();
  };

  return (
    <div className="action-window" id="buy-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPriceState}
              onChange={(e) => setStockPriceState(Number(e.target.value))}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;




