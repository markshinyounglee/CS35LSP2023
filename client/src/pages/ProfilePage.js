import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Configuration, OpenAIApi } from "openai"
import { getMessage } from "../chatai"

import BeefDetails from '../components/BeefDetails';

import socket from '../WebSocket';

  const ProfilePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [friendUsernames, setFriendUsernames] = useState([]);
    const [blockedUsernames, setBlockedUsernames] = useState([]);
    const [beefs, setBeefs] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [otheruser, setOtherUser] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [aiBeefOutput, setAIBeefOutput] = useState('');
    const [friendUsernameInput, setFriendUsernameInput] = useState('');
    const [username, setUsername] = useState('');

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
 
    const handleAccept = async (sendingUsername) => {
      const sendingUser = await fetch(`/api/user/${sendingUsername}/getUserByName`)
      const sendingUserData = await sendingUser.json()

      console.log(sendingUserData)
      
      const patchInfo = {
        r_requests: sendingUserData._id
      };
      await fetch(`/api/user/${location.state.loginUserId}/acceptUserRequest`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchInfo),
      });

      navigate("/profile", { state: location.state })
    };
  
    const handleReject = async ( {recievingUserId, sendingUsername} ) => {
      /*
      const sendingUser = await fetch(`/api/user/${sendingUsername}/getUserByName`)
      const sendingUserData = await sendingUser.json()

      const patchInfo = {
        s_requests: recievingUserId
      }

      await fetch(`/api/user/${sendingUser._id}/unsendUserRequest`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchInfo)
      })
      
      console.log('Reject button clicked');
      */
    };

    useEffect(() => {
      socket.on('connect', () => {
        console.log('Connected to the server');
      });
      socket.on('friendRequest', ({recievingUserId, sendingUsername}) => {
        console.log('Friend request recieved');
        if (location.state.loginUserId === recievingUserId) {
          toast.info(
            <div>
              Friend request recieved from {sendingUsername}
              <button onClick={() => handleAccept(sendingUsername)}>Accept</button>
              <button onClick={handleReject(recievingUserId, sendingUsername)}>Reject</button>
            </div>,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: false,
              closeOnClick: false,
              draggable: false,
              // other custom options...
            }
          );
          toast.success('Friend request recieved from' + ' ' + sendingUsername);
        }
      })

      socket.on('userUpdated', ( {userId} ) => {
        //const response = await fetch()
        if (userId === location.state.loginUserId) {
          fetchUserBeefs()
          console.log(`Client recieved event that user ${userId} updated their beef array`)
        }
        // Handle event here
      })


      socket.on('beefCreated', ( {beef} ) => {
        if (beef.user1 === location.state.loginUsername || beef.user2 === location.state.loginUsername) {
          toast.success(`Beef created between ${beef.user1} and ${beef.user2}`)
        }
      })


      socket.on('disconnect', () => {
        console.log('Disconnected from the server');
      });


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
            // Fetch friend usernames
              const friendPromises = data.friendlist.map((friendId) =>
              fetch("/api/user/" + friendId).then((response) => response.json())
            );
            const friendData = await Promise.all(friendPromises);
            const friendUsernames = friendData.map((friend) => friend.usrname);
            setFriendUsernames(friendUsernames);


            // Fetch blocked usernames
              const blockedPromises = data.blocklist.map((blockedUserId) =>
              fetch("/api/user/" + blockedUserId).then((response) => response.json())
            );
            const blockedData = await Promise.all(blockedPromises);
            const blockedUsernames = blockedData.map((blockedUser) => blockedUser.usrname);
            setBlockedUsernames(blockedUsernames);
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


      return () => {
        socket.off('connect');
        socket.off('userUpdated');
        socket.off('disconnect');
        socket.off('friendRequest')
        socket.off('beefCreated') // this fixes multiple notification feature
      }


    }, [location]);


    const generateAIBeef = async (event) => {
      event.preventDefault();
      const aiBeefOutput = await getMessage();
    
      const newBeef = {
        title: "ChatGPT-generated Beef",
        description: aiBeefOutput,
        votesForUser1: 0,
        votesForUser2: 0,
        user1: location.state.loginUsername,
        user2: username,
        usersThatVotedForUser1: [],
        usersThatVotedForUser2: [],
      };
    
      // update the general page to include the new ChatGPT-generated beef
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
          if (user.usrname === username || user._id === location.state.loginUserId) {
            const updatedUser = {
              mybeefs: createdBeef._id,
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
      } else {
        console.log("Failed to create beef");
      }
    
      navigate('/profile', { state: location.state });
    };
    



    const sendFriendRequest = async (e) => {
        e.preventDefault();
        console.log(friendUsernameInput)
        
        const friend = await fetch(`/api/user/${friendUsernameInput}/getUserByName`)
        const friendData = await friend.json()

        const json = {
          s_requests: friendData._id
        }

        const makeUserRequest = await fetch(`/api/user/${location.state.loginUserId}/makeUserRequest`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json", 
          }, 
          body: JSON.stringify(json)
        })

        if (makeUserRequest.ok) {
          toast.success(`Friend request sent to ${friendUsernameInput}`)
          navigate("/profile", { state: location.state })
        }
       
    }


    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {
        const newBeef = {
          title: title,
          description: description,
          votesForUser1: 0,
          votesForUser2: 0,
          user1: userInfo.usrname,
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
              const updatedUser = {
                mybeefs: createdBeef._id,
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
          toast.success("Beef created successfully")
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
      <div className="profile-page">
        {isLoggedIn ? (
          <div className='profile-components'>
            {userInfo ? (
              <div className='profile-info'>
                <div className='user-info'>
                <h1>Welcome, {userInfo.usrname}!</h1>
                  <h2>Friend List:</h2>
                  <ul>
                    {friendUsernames.map((friendUsername) => (
                      <li key={friendUsername}>{friendUsername}</li>
                    ))}
                  </ul>
                </div>
                <div className='beef-form'>
                <h1>Start A Beef Here</h1>
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
                      placeholder="Enter the description"
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
              <div className={"ai-beef-form"}>
              <h1>AI Generated Beef</h1>
                <form className={"ai-beef-form"} onSubmit={generateAIBeef}>
                  <label htmlFor="user2">Who do you want ChatGPT to beef with?</label>
                  <input
                    type="text"
                    placeholder='Enter the username'
                    id="user2"
                    name="user2"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <button type="submit">Generate Beef</button> {/* AI Generated Beef Button */}
                </form>
              </div>
              <div className="send-friend-request-form">
              <h2>Find A Friend</h2>
              <form onSubmit={sendFriendRequest}>
                <label htmlFor="friendUsername"></label>
                <input
                  type="text"
                  placeholder="Enter the username"
                  id="friendUsername"
                  name="friendUsername"
                  value={friendUsernameInput}
                  onChange={(e) => setFriendUsernameInput(e.target.value)}
                />
                <button type="submit">Send Request</button>
              </form>
            </div>
            </div>
            ) : (
              <h1>Loading user information...</h1>
            )}
            {beefs ? (
              <div className="beefs">
                <h1>My Beefs</h1>
                {beefs.map((beef) => (
                  <BeefDetails key={beef._id} beef={beef} />
                ))}
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
export default ProfilePage;
