import React, { useState } from "react";
import Swal from "sweetalert2";
import API from "../../dashboard/components/api";

function LeftSection() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const res = await API.post("/signup", formData);

        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }
        localStorage.setItem("userId", formData.username);

        // alert("Signup successful");

                Swal.fire({
                  icon: "success",
                  title: "Account Created 🎉",
                  text: "Your account has been successfully created.",
                  confirmButtonText: "Go to login",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/signup";
                  }
                });
        
        // window.location.href = "/dashboard";
        console.log(res.data);
      } catch (err) {
        const message =
          err.response?.data?.msg || "Something went wrong";
          
  Swal.fire({
    icon: "error",
    title: "Signup Failed",
    text: message,
  });
      }
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <img src="media/images/account_open.svg" alt="account" />
        </div>

        <div className="col-6 p-5 pt-0">
          <h1 className="mb-3" style={{ fontSize: "30px", opacity: "0.9" }}>
            Signup now
          </h1>

          <div className="text-muted small">
            <p>Or track your existing application</p>

            <form
              className={`needs-validation ${
                validated ? "was-validated" : ""
              }`}
              noValidate
              onSubmit={handleSubmit}
            >
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="form-control"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
                <div className="invalid-feedback">
                  Please enter your username.
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  minLength="6"
                />
                <div className="invalid-feedback">
                  Password must be at least 6 characters.
                </div>
              </div>

              <button className="btn btn-success abtn" type="submit">
                SignUp
              </button>
            </form>

            <p className="mt-4">
              By proceeding, you agree to the Zerodha <a href="#">terms</a> &{" "}
              <a href="#">privacy policy</a>
            </p>

            <p className="mt-4">
              Looking to open NRI account? <a href="#">Click here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
