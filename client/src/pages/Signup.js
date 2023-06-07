import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

let loginUserId = ''

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorize = async () => {
      const response = await fetch("/api/user/");
      const users = await response.json();

      let userFound = false;
      for (const user of users) {
        if (user.usrname === email || user.pswd === password) {
          userFound = true;
          break;
        }
      }

      if (userFound) {
        console.log("User already exists");
        // Redirect to signup page and show message
        navigate("/create-account");
      } else {
        console.log("User not found");
        try {
          const newUser = {
            usrname: email,
            pswd: password,
            friendlist: [],
            blocklist: [],
            mybeefs: [],
            s_requests: [],
            r_requests: [],
          };

          const createUserResponse = await fetch("/api/user/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });

          if (createUserResponse.ok) {
            const createdUser = await createUserResponse.json()
            loginUserId = createdUser._id
            navigate("/profile", { state: { loginUserId } });
          } else {
            console.log("Failed to create user");
          }
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    };

    await authorize();
  };

  return (
    <div className="auth-form-container">
      <h2>Enter Your Email And Password To Sign Up</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="username"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
