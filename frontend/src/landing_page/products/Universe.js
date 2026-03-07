
import React from "react";
import { Link } from "react-router-dom";

function Universe() {

  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 className="mb-4" style={{ fontSize: "25px", opacity: "0.8"}}>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="row text-center">

<div className="col-md-4 mt-5 d-flex flex-column align-items-center">
  <img src="media/images/zerodhaFundhouse.png" className="product-logo" />
  <p className="text-muted mt-3 small">
  Our asset management venture that is creating simple and transparent index funds to help you save for your goals.
  </p>
</div>

<div className="col-md-4 mt-5 d-flex flex-column align-items-center">
  <img src="media/images/sensibullLogo.svg" className="product-logo" />
  <p className="text-muted mt-3 small">
  Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.
  </p>
</div>

<div className="col-md-4 mt-5 d-flex flex-column align-items-center">
  <img src="media/images/tijori.svg" className="product-logo" />
  <p className="text-muted mt-3 small">
  Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.
  </p>
</div>

<div className="col-md-4 mt-5 d-flex flex-column align-items-center">
  <img src="media/images/streakLogo.png" className="product-logo" />
  <p className="text-muted mt-3 small">
  Systematic trading platform that allows you to create and backtest strategies without coding.
  </p>
</div>

<div className="col-md-4 mt-5 d-flex flex-column align-items-center">
  <img src="media/images/smallcaseLogo.png" className="product-logo" />
  <p className="text-muted mt-3 small">
  Thematic investing platform that helps you invest in diversified baskets of stocks or ETFs.
  </p>
</div>

<div className="col-md-4 mt-5 d-flex flex-column align-items-center">
  <img src="media/images/dittoLogo.png" className="product-logo" />
  <p className="text-muted mt-3 small">
  Personalized advice on life and health insurance. No spam and no mis-selling.
  </p>
</div>

</div>
    <Link to="/signup">
        <button
          className="p-2 btn btn-primary fs-5 mb-5 abtn mt-5 responsive-cta"
        >
          Signup Now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Universe;
