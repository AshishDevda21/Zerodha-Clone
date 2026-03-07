import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-lg-6">
          <img src={imageURL} className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6 p-5 mt-lg-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div className="product-links">
            <a href={tryDemo}>Try Demo</a>
            <a href={learnMore} className="product-link-spacer">
              Learn More
            </a>
          </div>
          <div className="mt-3 product-store-links">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" className="img-fluid" />
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                className="img-fluid product-link-spacer"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
