import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, stockPrice) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, stockPrice) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  // BUY STATE
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);

  // SELL STATE
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedSellUID, setSelectedSellUID] = useState("");
  const [selectedSellPrice, setSelectedSellPrice] = useState(0);

  // BUY FUNCTIONS
  const handleOpenBuyWindow = (uid, stockPrice) => {
    console.log("Buy UID:", uid);
    console.log("Buy Price:", stockPrice);

    setSelectedStockUID(uid);
    setSelectedStockPrice(stockPrice);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
  };

  // SELL FUNCTIONS
  const handleOpenSellWindow = (uid, stockPrice) => {
    console.log("Sell UID:", uid);
    console.log("Sell Price:", stockPrice);

    setSelectedSellUID(uid);
    setSelectedSellPrice(stockPrice);
    setIsSellWindowOpen(true);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}

      {/* BUY WINDOW */}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          stockPrice={selectedStockPrice}
        />
      )}

      {/* SELL WINDOW */}
      {isSellWindowOpen && (
        <SellActionWindow
          uid={selectedSellUID}
          stockPrice={selectedSellPrice}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;





// import React, { useState } from "react";

// import BuyActionWindow from "./BuyActionWindow";

// const GeneralContext = React.createContext({
//   openBuyWindow: (uid,stockPrice) => {},
//   closeBuyWindow: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
//   const [selectedStockUID, setSelectedStockUID] = useState("");
//   const [selectedStockPrice, setSelectedStockPrice] = useState(0);


//   const handleOpenBuyWindow = (uid, stockPrice) => {
//     console.log("Selected UID:", uid);
//     console.log("Selected Price:", stockPrice);
  
//     setIsBuyWindowOpen(true);
//     setSelectedStockUID(uid);
//     setSelectedStockPrice(stockPrice);
//   };
  

//   // const handleOpenBuyWindow = (uid, stockPrice) => {
//   //   setIsBuyWindowOpen(true);
//   //   setSelectedStockUID(uid);
//   //   setSelectedStockPrice(stockPrice);

//   // };

//   const handleCloseBuyWindow = () => {
//     setIsBuyWindowOpen(false);
//     setSelectedStockUID("");
//     setSelectedStockPrice(0);
//   };

//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         closeBuyWindow: handleCloseBuyWindow,
//       }}
//     >
//       {props.children}
//       {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} stockPrice={selectedStockPrice} />}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContext;
