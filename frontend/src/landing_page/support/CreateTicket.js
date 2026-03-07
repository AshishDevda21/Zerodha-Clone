

import React from "react";

function CreateTicket() {
  const columnStyle = { minWidth: 0 };

  return (
    <div className="container text">
      <div className="p-1 mt-5 mb-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1>

        <div
          className="mt-2 mb-2 support-ticket-grid"
        >
          <div className="p-5" style={columnStyle}>
            <h4>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp; Account Opening
            </h4>
            <ul>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Online Account Opening</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Offline Account Opening</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Company, Partnership and HUF Account</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Opening</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>NRI Account Opening</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Charges at Zerodha</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Zerodha IDFC FIRST Bank 3-in-1 Account</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Getting Started</li>
              </a>
            </ul>
          </div>

          <div className="p-5" style={columnStyle}>
            <h4>
              <i className="fa-solid fa-user"></i>&nbsp; Your Zerodha Account
            </h4>
            <ul>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Your Profile</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Account modification</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Client Master Report (CMR) and Depository participant</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Nomination</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Transfer and conversion of securities</li>
              </a>
            </ul>
          </div>

          <div className="p-5" style={columnStyle}>
            <h4>
              <i className="fa-brands fa-square-xing"></i>&nbsp; Kite
            </h4>
            <ul>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>IPO</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Trading FAQs</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Margin Trading Facility (MTF) and Margins</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Charts and orders</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>General</li>
              </a>
            </ul>
          </div>
        </div>

        <div
          className="mt-2 mb-2 support-ticket-grid"
        >
          <div className="p-5" style={columnStyle}>
            <h4>
              <i className="fa-solid fa-indian-rupee-sign"></i>&nbsp; Funds
            </h4>
            <ul>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Add money</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Withdraw money</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Add bank accounts</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>eMandates</li>
              </a>
            </ul>
          </div>

          <div className="p-5" style={columnStyle}>
            <h4>
              <i className="fa-regular fa-life-ring"></i>&nbsp; Console
            </h4>
            <ul>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Portfolio</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Corporate actions</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Funds statement</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Reports</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Profile</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Segment</li>
              </a>
            </ul>
          </div>

          <div className="p-5" style={columnStyle}>
            <h4>
              <i className="fa-solid fa-cent-sign"></i>&nbsp; Coin
            </h4>
            <ul>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Mutual funds</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>National Pension Scheme (NPS)</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Fixed Deposit (FD)</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Features on Coin</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>Payment and Orders</li>
              </a>
              <a href="" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                <li>General</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
