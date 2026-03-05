import React from "react";

import Hero from "./Hero";
import CreateTicket from "./CreateTicket";
import { useEffect } from "react";


// import Navbar from "../Navbar";
// import Footer from "../Footer";

function PricingPage() {

    useEffect(() => {
       
        const previousTitle = document.title;
      
       
        const favicon = document.querySelector("link[rel='icon']");
        const previousFavicon = favicon?.href;
      
        
        document.title = "Zerodha Support Portal: Find answers to all your queries";
      
     
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
      <CreateTicket />
    </>
  );
}

export default PricingPage;