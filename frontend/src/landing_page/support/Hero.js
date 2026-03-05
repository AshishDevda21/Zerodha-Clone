import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5 " id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-5 m-3 align-items-start">
        <div className="col-6 p-3">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input placeholder="Eg. how do I activate F&O" />
          <br />
          <div className="m-3 text">
          <a href="">Track account opening</a>
          <a className="m-2"href="">Track segment activation</a>
          <a className="m-2"href="">Intraday margins</a>
          <a className="m-2"href="">Kite user manual</a>
          </div>
         
        </div>
        <div className="col-6 p-3 text ">
          <h1 className="fs-3">Featured</h1>
          <ol>
            <li>
              <a href="">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>

         <Link to="/signup" className="d-block text-center">
        <button 
          className="p-2 btn btn-primary fs-5 mb-5 abtn btns "
          style={{ width: "20%", margin: "0 auto" }}
        >
          My tickets
        </button> 
        </Link>
      </div>
    </section>
  );
}

export default Hero;
