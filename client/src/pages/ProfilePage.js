import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { globaluserId } from './Signup';

const ProfilePage = () => {
  const navigate = useNavigate(); // Create history object
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [otheruser, setOtherUser] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false); // Add formSubmitted state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/" + globaluserId);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error('Error:', data);
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newBeef = {
        title: title,
        description: description,
        votesForUser1: 0, 
        votesForUser2: 0, 
        user1: globaluserId, 
        user2: otheruser, 
      };

      const createBeefResponse = await fetch("/api/beef", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBeef),
      });

      if (createBeefResponse.ok) {
        const createdBeef = await createBeefResponse.json();
        console.log("Beef created:", createdBeef);
        setFormSubmitted(true); // Update formSubmitted state
        // Handle any further actions after creating the beef
      } else {
        console.log("Failed to create beef");
      }
    } catch (error) {
      console.error("Error creating beef:", error);
    }
  }

  // Render different content based on formSubmitted state
  useEffect(() => {
    if (formSubmitted) {
      navigate("/profile"); // Replace with your profile page route
    }
  }, [formSubmitted, navigate]);

  return (
    <div>
      {user ? (
        <div className='user-info'>
          <h1>Username: {user.usrname}</h1>
          <h2>Friend List:</h2>
          <ul>
            {user.friendlist.map((friend) => (
              <li key={friend}>{friend}</li>
            ))}
          </ul>
          <h2>Block List:</h2>
          <ul>
            {user.blocklist.map((blockedUser) => (
              <li key={blockedUser}>{blockedUser}</li>
            ))}
          </ul>
          <h2>My Beefs:</h2>
          <ul>
            {user.mybeefs.map((beef) => (
              <li key={beef}>{beef}</li>
            ))}
          </ul>
          
          <form className="beef-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter the beef title"
              id="title"
              name="title"
            />
            <label htmlFor="description">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter the beef description"
              id="description"
              name="description"
            />
            <label htmlFor="description">Who are you beefing with?</label>
            <input
              value={otheruser}
              onChange={(e) => setOtherUser(e.target.value)}
              type="text"
              placeholder="Enter the username"
              id="user2"
              name="user2"
            />
            <button type="submit">Create Beef</button>
          </form>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
