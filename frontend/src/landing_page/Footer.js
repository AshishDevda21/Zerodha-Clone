import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div
          className="mt-5"
          style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1fr 1fr", columnGap: "24px" }}
        >
          <div className="col footer-brand">
            <img src="media/images/logo.svg" style={{ width: "50%" }} />
            <p className="mt-3 text-muted small ">
              &copy; 2010 - 2026, Not Zerodha Broking Ltd. All rights reserved.
            </p>
            <div className="mt-3 icon">
              {/* First Line */}
              <div className="d-flex gap-4 mb-3 footer-social-row">
                <i className="fa-brands fa-x-twitter"></i>
                <i className="fa-brands fa-facebook hover"></i>
                <i className="fa-brands fa-instagram hover"></i>
                <i className="fa-brands fa-linkedin-in hover"></i>
              </div>

              {/* Second Line */}
              <div className="d-flex gap-4 mt-5 footer-social-row">
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-whatsapp"></i>
                <i className="fa-brands fa-telegram hover"></i>
              </div>
            </div>
          </div>

          <div className="col fs-6 footer-links">
            <p className="fs-5" style={{fontWeight: "700", opacity: "1"}}>Company</p>
            <a href="">About</a>
            <br />
            <a href="">Products</a>
            <br />
            <a href="">Pricing</a>
            <br />
            <a href="">Referral programme</a>
            <br />
            <a href="">Careers</a>
            <br />
            <a href="">Zerodha.tech</a>
            <br />
            <a href="">Press & media</a>
            <br />
            <a href="">Zerodha cares (CSR)</a>
            <br />
          </div>

          <div className="col fs-6 footer-links">
            <p className="fs-5" style={{fontWeight: "700", opacity: "1"}}>Support</p>
            <a href="">Contact</a>
            <br />
            <a href="">Support portal</a>
            <br />
            <a href="">Z-Connect blog</a>
            <br />
            <a href="">List of charges</a>
            <br />
            <a href="">Downloads & resources</a>
            <br />
          </div>

          <div className="col fs-6 footer-links">
            <p className="fs-5" style={{fontWeight: "900", opacity: "1"}}>Account</p>
            <a href="">Open an account</a>
            <br />
            <a href="">Fund transfer</a>
            <br />
            <a href="">60 day challenge</a>
            <br />
          </div>
        </div>

        <div
          className="mt-5 text-muted small text"
          style={{ fontSize: "12px", opacity: "0.7" }}
        >
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.:
            INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. –
            SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking
            Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            <a href=""> complaints@zerodha.com</a>, for DP related to
            <a href=""> dp@zerodha.com</a>. Please ensure you carefully read the Risk
            Disclosure Document as prescribed by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on <a href="">SEBI SCORES</a>: Register on
            SCORES portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication,
            Speedy redressal of the grievances
          </p>

          <p>
            <a href="">Smart Online Dispute Resolution</a> |{" "}
            <a href="">Grievances Redressal Mechanism</a>
          </p>

          <p>
            Investments in securities market are subject to market risks; read all the
            related documents carefully before investing.
          </p>

          <p>
            Attention investors: 1) Stock brokers can accept securities as margins from
            clients only by way of pledge in the depository system w.e.f September 01,
            2020. 2) Update your e-mail and phone number with your stock broker /
            depository participant and receive OTP directly from depository on your
            e-mail and/or mobile number to create pledge. 3) Check your securities /
            MF / bonds in the consolidated account statement issued by NSDL/CDSL every
            month.
          </p>

          <p>
            India's largest broker based on networth as per NSE.{" "}
            <a href="">NSE broker factsheet</a>
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your mobile
            numbers/email IDs with your stock brokers. Receive information of your
            transactions directly from Exchange on your mobile/email at the end of the
            day. Issued in the interest of investors. KYC is one time exercise while
            dealing in securities markets - once KYC is done through a SEBI registered
            intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear Investor, if
            you are subscribing to an IPO, there is no need to issue a cheque. Please
            write the Bank account number and sign the IPO application form to
            authorize your bank to make payment in case of allotment. In case of non
            allotment the funds will remain in your bank account. As a business we
            don't give stock tips, and have not authorized anyone to trade on behalf of
            others. If you find anyone claiming to be part of Zerodha and offering such
            services, please <a href="">create a ticket here</a>.
          </p>

          <p>
            *Customers availing insurance advisory services offered by Ditto
            (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent
            (Composite) License No CA0738) will not have access to the exchange
            investor grievance redressal forum, SEBI SCORES/ODR, or arbitration
            mechanism for such products.
          </p>
        </div>

        <p
          className="mt-3 last  mb-3 d-flex flex-wrap justify-content-center gap-3"
          style={{ fontSize: "14px" }}
        >
          <a href="">NSE</a>
          <a href="">BSE</a>
          <a href="">MCX</a>
          <a href="">Terms & conditions</a>
          <a href="">Policies & procedures</a>
          <a href="">Privacy policy</a>
          <a href="">Disclosure</a>
          <a href="">For investor's attention</a>
          <a href="">Investor charter</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;




// import React from "react";

// function Footer() {
//   return (
//     <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
//       <div className="container border-top mt-5">
//         <div
//           className="mt-5"
//           style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1fr 1fr", columnGap: "24px" }}
//         >
//           <div className="col footer-brand">
//             <img src="media/images/logo.svg" style={{ width: "50%" }} />
//             <p className="mt-3 text-muted small ">
//               &copy; 2010 - 2026, Not Zerodha Broking Ltd. All rights reserved.
//             </p>
//             <div className="mt-3 icon">
//               {/* First Line */}
//               <div className="d-flex gap-4 mb-3 footer-social-row">
//                 <i className="fa-brands fa-x-twitter"></i>
//                 <i className="fa-brands fa-facebook hover"></i>
//                 <i className="fa-brands fa-instagram hover"></i>
//                 <i className="fa-brands fa-linkedin-in hover"></i>
//               </div>

//               {/* Second Line */}
//               <div className="d-flex gap-4 mt-5 footer-social-row">
//                 <i className="fa-brands fa-youtube"></i>
//                 <i className="fa-brands fa-whatsapp"></i>
//                 <i className="fa-brands fa-telegram hover"></i>
//               </div>
//             </div>
//           </div>

//           <div className="col fs-6 footer-links">
//             <p className="fw-bold fs-5">Company</p>
//             <a href="">About</a>
//             <br />
//             <a href="">Products</a>
//             <br />
//             <a href="">Pricing</a>
//             <br />
//             <a href="">Referral programme</a>
//             <br />
//             <a href="">Careers</a>
//             <br />
//             <a href="">Zerodha.tech</a>
//             <br />
//             <a href="">Press & media</a>
//             <br />
//             <a href="">Zerodha cares (CSR)</a>
//             <br />
//           </div>

//           <div className="col fs-6 footer-links">
//             <p className="fw-bold fs-5">Support</p>
//             <a href="">Contact</a>
//             <br />
//             <a href="">Support portal</a>
//             <br />
//             <a href="">Z-Connect blog</a>
//             <br />
//             <a href="">List of charges</a>
//             <br />
//             <a href="">Downloads & resources</a>
//             <br />
//           </div>

//           <div className="col fs-6 footer-links">
//             <p className="fw-bold fs-5">Account</p>
//             <a href="">Open an account</a>
//             <br />
//             <a href="">Fund transfer</a>
//             <br />
//             <a href="">60 day challenge</a>
//             <br />
//           </div>
//         </div>

//         <div
//           className="mt-5 text-muted small text"
//           style={{ fontSize: "12px", opacity: "0.7" }}
//         >
//           <p>
//             Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.:
//             INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. –
//             SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking
//             Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
//             J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
//             complaints pertaining to securities broking please write to
//             <a href=""> complaints@zerodha.com</a>, for DP related to
//             <a href=""> dp@zerodha.com</a>. Please ensure you carefully read the Risk
//             Disclosure Document as prescribed by SEBI | ICF
//           </p>

//           <p>
//             Procedure to file a complaint on <a href="">SEBI SCORES</a>: Register on
//             SCORES portal. Mandatory details for filing complaints on SCORES: Name,
//             PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication,
//             Speedy redressal of the grievances
//           </p>

//           <p>
//             <a href="">Smart Online Dispute Resolution</a> |{" "}
//             <a href="">Grievances Redressal Mechanism</a>
//           </p>

//           <p>
//             Investments in securities market are subject to market risks; read all the
//             related documents carefully before investing.
//           </p>

//           <p>
//             Attention investors: 1) Stock brokers can accept securities as margins from
//             clients only by way of pledge in the depository system w.e.f September 01,
//             2020. 2) Update your e-mail and phone number with your stock broker /
//             depository participant and receive OTP directly from depository on your
//             e-mail and/or mobile number to create pledge. 3) Check your securities /
//             MF / bonds in the consolidated account statement issued by NSDL/CDSL every
//             month.
//           </p>

//           <p>
//             India's largest broker based on networth as per NSE.{" "}
//             <a href="">NSE broker factsheet</a>
//           </p>

//           <p>
//             "Prevent unauthorised transactions in your account. Update your mobile
//             numbers/email IDs with your stock brokers. Receive information of your
//             transactions directly from Exchange on your mobile/email at the end of the
//             day. Issued in the interest of investors. KYC is one time exercise while
//             dealing in securities markets - once KYC is done through a SEBI registered
//             intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same
//             process again when you approach another intermediary." Dear Investor, if
//             you are subscribing to an IPO, there is no need to issue a cheque. Please
//             write the Bank account number and sign the IPO application form to
//             authorize your bank to make payment in case of allotment. In case of non
//             allotment the funds will remain in your bank account. As a business we
//             don't give stock tips, and have not authorized anyone to trade on behalf of
//             others. If you find anyone claiming to be part of Zerodha and offering such
//             services, please <a href="">create a ticket here</a>.
//           </p>

//           <p>
//             *Customers availing insurance advisory services offered by Ditto
//             (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent
//             (Composite) License No CA0738) will not have access to the exchange
//             investor grievance redressal forum, SEBI SCORES/ODR, or arbitration
//             mechanism for such products.
//           </p>
//         </div>

//         <p
//           className="mt-3 last  mb-3 d-flex flex-wrap justify-content-center gap-3"
//           style={{ fontSize: "14px" }}
//         >
//           <a href="">NSE</a>
//           <a href="">BSE</a>
//           <a href="">MCX</a>
//           <a href="">Terms & conditions</a>
//           <a href="">Policies & procedures</a>
//           <a href="">Privacy policy</a>
//           <a href="">Disclosure</a>
//           <a href="">For investor's attention</a>
//           <a href="">Investor charter</a>
//         </p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
