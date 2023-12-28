import "./landing.css";
import { React, useRef, useState} from "react";
import { Link} from "react-router-dom";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/users/userSlice";

export default function LoginPage() {
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const dispatch  = useDispatch();
  const emailRefElement = useRef();
  const passwordRefElement = useRef();
  const checkboxRefElement = useRef();

  const handleForm = () => {
    if (emailRefElement !== "" && passwordRefElement !== ""){
      // create a new user 
      const USER = {
        email:  emailRefElement.current.value,
        password: passwordRefElement.current.value,
      }
      dispatch(userLogin(USER))
      emailRefElement.current.value = "";
      passwordRefElement.current.value = "";
    }
  }

  return (
    <>
      <Header/>
      <main className="login-up-page">
        <h1>Please Login</h1>
        <div id="form">
          <label id="e-label" htmlFor="email">
            <span>{emailMessage && "*"}</span> {emailMessage}
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            ref = {emailRefElement}
          />
          <label id="p-label" htmlFor="password">
            <span>{passwordMessage && "*"}</span> {passwordMessage}
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref = {passwordRefElement}
          />

          <div id="checkbox-inptus">
            <input
              id="checkbox"
              type="checkbox"
              name="isChecked"
              ref = {checkboxRefElement}
            />
            <label htmlFor="checkbox">all terms & conditions</label>
          </div>
          <button
            className="sumbit-btn"             
            onClick = {() => handleForm()}

          >
            LogIn
          </button>
          <div className="signin-page-link">
            <span>Don't have an account? </span>
            <Link to="/signup">Create</Link>
          </div>
        </div>
      </main>
    </>
  );
}
