import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


let loginUserId = '';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    const authorize = async () => {
      const response = await fetch("/api/user/");
      const users = await response.json();

      let userFound = false;
      if (response.ok) {
        for (const user of users) {
          if (user.usrname === email && user.pswd === password) {
            userFound = true;
            loginUserId = user._id;
            break;
          }
        }
      }


      if (userFound) {
        console.log("User found");
        toast.success("Login Successful")
        navigate("/profile", { state: { loginUserId } });
      } else {
        console.log("User not found in the database");
      }
    };


    await authorize();
  };


  return (
    <div className="auth-form-container">
      <h2>Enter Your Email And Password To Sign In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <Link to="/create-account">
        <h1>Click here to create an account</h1>
      </Link>
    </div>
  );
};

export default Login;