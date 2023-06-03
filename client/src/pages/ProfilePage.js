import React, { useEffect, useState } from 'react';
import { globaluserId } from './Signup';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState(''); // Add the state for 'title'
  const [description, setDescription] = useState(''); // Add the state for 'description'

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission and process the 'title' and 'description' values here
    console.log(title, description);
  }

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
          <button type="submit">Create Beef</button>
          
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
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
