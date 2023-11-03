import "./landing.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function LandingPage() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  });

  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,

        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <>
    <Header/>
      <main className="sign-up-page">
        <h1>Please Sign Up</h1>
        <div id="form">
          <label id="e-label" htmlFor="email">
            <span>{emailMessage && "*"}</span> {emailMessage}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <label id="p-label" htmlFor="password">
            <span>{passwordMessage && "*"}</span> {passwordMessage}
          </label>
          <input
            id="password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <div id="checkbox-inptus">
            <input
              id="checkbox"
              type="checkbox"
              name="isChecked"
              checked={formData.isChecked}
              onChange={handleChange}
            />
            <label htmlFor="checkbox">all terms & conditions</label>
          </div>
          <button
            className="sumbit-btn"
            onClick={async () => {
              alert("you clicked the button");
              const USER = {
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
              };
              try {
                const response = await fetch("http://localhost:8000/signup", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(USER),
                });
                const data = await response.json();
                if (data.message === "Incorrect password") {
                  setPasswordMessage(data.message);
                }
                if (data.message === "Email already exist") {
                  setEmailMessage(data.message);
                }
                if (response.status === 201) {
                  // Redirect to '/login'
                  window.location.href = "/login";
                }
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Sign up
          </button>
          <div className="signin-page-link">
            <span>Already have an account? </span>
            <Link to="/login">SignIn</Link>
          </div>
        </div>
      </main>
    </>
  );
}
