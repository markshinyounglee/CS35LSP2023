import React, { useState } from "react";

let globaluserId = '' 

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const authorize = async () => {
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
            const createdUser = await createUserResponse.json();
            globaluserId = createdUser._id; 
            console.log("success " + globaluserId);
        } else {
            console.log("Failed to create user");
        }
        } catch (error) {
        console.error("Error creating user:", error);
        }
    };

    authorize();
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
    </div>
  );
};

export { globaluserId }

export default Signup;
