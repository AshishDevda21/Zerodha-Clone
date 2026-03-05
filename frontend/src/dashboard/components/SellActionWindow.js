
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import API from "./api"; 
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";


const SellActionWindow = ({ uid, stockPrice }) => {
  const context = useContext(GeneralContext);
//   context.openSellWindow(stock._id, stock.price);


  const [stockQuantity, setStockQuantity] = useState(1);

  const [stockPriceState, setStockPriceState] = useState(stockPrice);

 
  useEffect(() => {
    setStockPriceState(stockPrice);
  }, [stockPrice]);

  const handleSellClick = async () => {
    if (stockQuantity <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid quantity",
        text: "Enter a valid quantity",
      });
      return;
    }
  
    try {
      const res = await API.post("/sellOrder", {
        name: uid,
        qty: Number(stockQuantity),
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
        title: "Sell order placed",
        text: res.data.message || "Stock sold successfully",
        timer: 1400,
        showConfirmButton: false,
      });
      context.closeSellWindow();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sell failed",
        text: err.response?.data?.message || "Sell failed",
      });
      console.error(err);
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
    context.closeSellWindow();
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
          <button className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;




