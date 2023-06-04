import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const authorize = async () => {
      const response = await fetch("/api/user/");
      const users = await response.json();

      let userFound = false;
      for (const user of users) {
        if (user.usrname === email) {
          userFound = true;
          break;
        }
      }

      if (userFound) {
        console.log("user found")
      } else {
        // User not found
        // Redirect to signup page
        console.log("User not found in the database");
      }

      if (!response.ok) {
        // more checks to see if it was a transmission error or if the
        // user does not exist
        console.log("could not find user in database");
      } else {
        // Other actions after successful authorization
      }
    };

    authorize();
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
