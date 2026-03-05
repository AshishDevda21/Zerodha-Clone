import React from "react";
import Hero from "./Hero";
import Brokerage from "./Brokerage";
import OpenAccount from "../OpenAccount";
import { useEffect } from "react";

function PricingPage() {

    useEffect(() => {
       
        const previousTitle = document.title;
      
       
        const favicon = document.querySelector("link[rel='icon']");
        const previousFavicon = favicon?.href;
      
        
        document.title = "Zerodha brokerage charges, fees & taxes on trading and investing";
      
     
        if (favicon) {
          favicon.href = "/logo-icon.svg"; 
        }
      
      
        return () => {
          document.title = previousTitle;
          if (favicon) {
            favicon.href = previousFavicon;
          }
        };
      }, []);


  return (
    <>
      <Hero />
      <OpenAccount />
      <Brokerage />
    </>
  );
}

export default PricingPage;