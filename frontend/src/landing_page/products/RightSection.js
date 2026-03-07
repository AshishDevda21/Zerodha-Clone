import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-lg-6 p-5 mt-lg-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div className="text">
            <a href={learnMore}>Learn More</a>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <img src={imageURL} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
