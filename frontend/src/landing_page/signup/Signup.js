import React from "react";
import Hero from "./Hero";
import OpenAccount from "../OpenAccount";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { useEffect } from "react";

function Signup() {

    useEffect(() => {
       
        const previousTitle = document.title;
      
       
        const favicon = document.querySelector("link[rel='icon']");
        const previousFavicon = favicon?.href;
      
        
        document.title = "Open a free demat and trading account online at Zerodha";
      
     
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
      <LeftSection/>
      <RightSection/>
      <OpenAccount />
    </>
  );
}

export default Signup;