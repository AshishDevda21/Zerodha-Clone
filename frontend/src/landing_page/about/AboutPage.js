import React from "react";
import { useEffect } from "react";

import Hero from "./Hero";
import Team from "./Team";

function PricingPage() {

  useEffect(() => {
     
      const previousTitle = document.title;
    
     
      const favicon = document.querySelector("link[rel='icon']");
      const previousFavicon = favicon?.href;
    
      
      document.title = "Our company, history, and the people behind it";
    
   
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
      <Team />
    </>
  );
}

export default PricingPage;