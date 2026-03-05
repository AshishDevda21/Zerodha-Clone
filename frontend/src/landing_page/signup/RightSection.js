import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function RightSection() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
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
        const res = await axios.post("http://localhost:3002/login", formData);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user?.username || "USERID");
        // window.location.href = "/dashboard";

        // alert("Login successful");
        Swal.fire({
          icon: "success",
          title: "Login Successful 🎉",
          text: "Click OK to continue",
          confirmButtonText: "Go to Dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard";
          }
        });

        console.log(res.data);
      } catch (err) {
        const message =
          err.response?.data?.msg || "Something went wrong";
        // setErrorMsg(message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
        });
      }
    }

    setValidated(true);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5 pt-0">
          <h1 className="mb-3" style={{ fontSize: "30px", opacity: "0.9" }}>
            Login
          </h1>

          <form
            className={`needs-validation ${validated ? "was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
          >
            {/* email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email
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
                Please enter a valid email.
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
              />
              <div className="invalid-feedback">
                Please enter your password.
              </div>
            </div>

            <button className="btn btn-success abtn" type="submit">
              Login
            </button>
          </form>
        </div>

        <div className="col-6 ">
          <img src="media/images/steps-acop.svg" alt="steps" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
