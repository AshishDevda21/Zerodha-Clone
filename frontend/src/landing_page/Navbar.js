
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom  fixed-top"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "navbar-brand active-link" : "navbar-brand"
          }
        >
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0 ms-auto">
            <li className="nav-item">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Signup
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Pricing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Support
              </NavLink>
            </li>

            <li className="nav-item dropdown ms-3">
              <a
                className="nav-link d-flex align-items-center p-0"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list fs-3"></i>
              </a>

              <div
                className="dropdown-menu dropdown-menu-end p-4 shadow"
                style={{ width: "600px" }}
              >
                <div className="row">
                  <div className="col-3 text-center">
                    <img src="media/images/kite-logo.svg" width="40" />
                    <p className="mt-2">
                      Kite
                      <br />
                      <small>Trading</small>
                    </p>
                  </div>

                  <div className="col-3 text-center">
                    <img src="media/images/console.svg" width="40" />
                    <p className="mt-2">
                      Console
                      <br />
                      <small>Backoffice</small>
                    </p>
                  </div>

                  <div className="col-3 text-center">
                    <img src="media/images/kite-connect1.svg" width="40" />
                    <p className="mt-2">
                      Kite Connect
                      <br />
                      <small>APIs</small>
                    </p>
                  </div>

                  <div className="col-3 text-center">
                    <img src="media/images/coin.svg" width="40" />
                    <p className="mt-2">
                      Coin
                      <br />
                      <small>Mutual funds</small>
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-4">
                    <h6>Utilities</h6>
                    <p className="mb-1">Brokerage calculator</p>
                    <p className="mb-1">Margin calculator</p>
                  </div>

                  <div className="col-4">
                    <h6>Updates</h6>
                    <p className="mb-1">IPO</p>
                    <p className="mb-1">Markets</p>
                  </div>

                  <div className="col-4">
                    <h6>Education</h6>
                    <p className="mb-1">Varsity</p>
                    <p className="mb-1">Trading Q&A</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
