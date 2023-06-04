import React, { useState } from 'react'

const CreateBeef = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    let userFound = false;
      for (const user of users) {
        if (user.usrname === email) {
          userFound = true;
          break;
        }
      }

    return (
        <div className="start-beef">
          <h2>Start A Beef Here</h2>
          <form className="beef-form" onSubmit={handleSubmit}>
            <label htmlFor="text">Title</label>
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
              type="text"
              placeholder="********"
              id="password"
              name="password"
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      );
}

export default CreateBeef