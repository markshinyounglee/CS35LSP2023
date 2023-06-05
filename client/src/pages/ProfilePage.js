import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// components
import BeefDetails from '../components/BeefDetails';


  const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [beefs, setBeefs] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [otheruser, setOtherUser] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
 
    useEffect(() => {
      const fetchUserBeefs = async () => {
        try {
          const response = await fetch("/api/user/" + location.state.loginUserId);
          const data = await response.json();
 
          if (response.ok) {
            setUserInfo(data);
            const activeBeefs = data.mybeefs || [];
            const beefPromises = activeBeefs.map((beef) =>
              fetch("/api/beef/" + beef).then((response) => response.json())
            );
            const activeBeefObjects = await Promise.all(beefPromises);
            setBeefs(activeBeefObjects);
          } else {
            console.error("Error:", data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
 
      if (location.state && location.state.loginUserId) {
        setIsLoggedIn(true);
        fetchUserBeefs();
      } else {
        setIsLoggedIn(false);
      }
    }, [location]);


    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {
        const newBeef = {
          title: title,
          description: description,
          votesForUser1: 0,
          votesForUser2: 0,
          user1: location.state.loginUserId,
          user2: otheruser,
          usersThatVotedForUser1: [], 
          usersThatVotedForUser2: []
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
          const users = await fetch('/api/user');
          const usersData = await users.json(); 
          for (const user of usersData) { 
            if (user.usrname === otheruser || user._id === location.state.loginUserId) {
              console.log(user.usrname)
              const updatedUser = {
                mybeefs: createdBeef._id, // Append createdBeef._id to the mybeefs array
              };
              await fetch(`/api/user/${user._id}/patchUser`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
              });
            }
          }


          const user1 = await fetch('/api/user/' + location.state.loginUserId)
          const user1Data = await user1.json()
          user1Data.mybeefs.push(createdBeef._id)
        }
         else {
          console.log("Failed to create beef");
        }
      } catch (error) {
        console.error("Error creating beef:", error);
      }
      navigate('/profile', { state: location.state });
    }


    return (
      <div className="home">
        {isLoggedIn ? (
          <div>
            {userInfo ? (
              <div className='user-info'>
                <h1>Welcome, {userInfo.usrname}!</h1>
                <h2>Friend List:</h2>
                <ul>
                  {userInfo.friendlist.map((friend) => (
                    <li key={friend}>{friend}</li>
                  ))}
                </ul>
                <h2>Block List:</h2>
                <ul>
                  {userInfo.blocklist.map((blockedUser) => (
                    <li key={blockedUser}>{blockedUser}</li>
                  ))}
                </ul>
                <h2>My Beefs:</h2>
              </div>
            ) : (
              <h1>Loading user information...</h1>
            )}
            {beefs ? (
              <div className="beefs">
                {beefs.map((beef) => (
                  <BeefDetails key={beef._id} beef={beef} />
                ))}
                <form className="beef-form" onSubmit={handleSubmit}>
                  <h1>Start A Beef Here</h1>
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
              <h1>Loading beefs...</h1>
            )}
          </div>
        ) : (
          <h1>Please log in to view the content.</h1>
        )}
      </div>
    );
  }
export default Home;