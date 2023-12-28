import "./landing.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { addNewUser } from "../features/users/userSlice";
import { useDispatch , useSelector} from "react-redux";

import { postUser } from "../features/users/userSlice";
export default function SignUp() {
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.users.status)

  console.log('Inside signUp page: ', postStatus)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");


  function handleChange(event) {
    setPasswordMessage("");

    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }


  const handleSignupForm = async() => {

    try {
      const canSave = formData.email !== "" && formData.password !== "" && formData.confirmPassword !== "";
      if (canSave){
        if (formData.password !== formData.confirmPassword){
          setPasswordMessage("!Incorrect password")
          return;
        }
        const newUser = {
          email: formData.email,
          password: formData.password
        }
        dispatch(addNewUser(newUser));
        // console.log('this data is comming from server: ' ,data);
        formData.email = "";
        formData.password = "";
        formData.confirmPassword = "";
      }
    
    }
    catch(error){
      console.log(error);
    }
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
          <button
            className="sumbit-btn"
            onClick = {() => handleSignupForm()}
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
