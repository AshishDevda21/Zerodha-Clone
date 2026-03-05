import React from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import { useEffect } from "react";

import OpenAccount from "../OpenAccount";
import Navbar from "../Navbar";
import Footer from "../Footer";

function HomePage() {

    useEffect(() => {
       
        const previousTitle = document.title;
      
       
        const favicon = document.querySelector("link[rel='icon']");
        const previousFavicon = favicon?.href;
      
        
        document.title = "Zerodha: Online brokerage platform for stock trading & investing";
      
     
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
      {/* <Navbar /> */}
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;