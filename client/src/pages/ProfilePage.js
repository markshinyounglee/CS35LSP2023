import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API or any other data source
    // Set the retrieved user data to the state variable
    // Example: Fetch user data using axios library
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user/' + user._id); // Adjust the API endpoint accordingly
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
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
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
