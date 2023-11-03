import "./landing.css";
import {React, useState} from "react";
import { Link, json } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isChecked: false,
  });


  const [passwordMessage, setPasswordMessage] = useState("") 
  const [emailMessage, setEmailMessage] = useState("") 

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
    <main className="login-up-page">
      <h1>Please Login</h1>
      <div id="form">
        <label id="e-label" htmlFor="email"><span>{emailMessage && "*"}</span> {emailMessage }</label>
        <input
          id = "email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <label id = "p-label" htmlFor="password"><span>{passwordMessage && "*"}</span> {passwordMessage}</label>
        <input
          id = "password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
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

            const USER = {
              email: formData.email,
              password: formData.password,
            };
            console.log(USER);
            try {
              const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(USER),
              });

              const data = await response.json();
              if (data.message === "Incorrect! password"){
                setPasswordMessage(data.message)
              }
              if (data.message === "Email not found"){
                setEmailMessage(data.message)
              }
              if (response.status === 200) {
                // store the json token insdie the localstorage
                localStorage.setItem("token", data.token);

                // Redirect to '/todoPage'
                window.location.href = "/todoPage";
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          LogIn
        </button>
        <div className="signin-page-link">
          <span>Don't have an account? </span>
          <Link to="/signup">Create</Link>
        </div>
      </div>
    </main>
  );
}
