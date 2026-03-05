import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-5"
        />
        <h1 className="mt-5 mb-3"  style={{ fontSize: "30px", opacity: "0.8"}}>Invest in everything</h1>
        <p className="mb-5" style={{ fontSize: "22px" }}>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <Link to="/signup">
        <button
          className="p-2 btn btn-primary fs-5 mb-5  abtn"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
