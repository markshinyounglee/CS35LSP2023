import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


import BeefDetails from '../components/BeefDetails';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [beefs, setBeefs] = useState(null)
  const location = useLocation();

  useEffect(() => {
    const fetchBeefs = async () => {
      const response = await fetch("/api/beef")
      const data = await response.json()
      if (response.ok) {
        setBeefs(data)
      }
      else {
        console.error("Error:", data)
      }
    }


    if (location.state && location.state.loginUserId) {
      setIsLoggedIn(true)
      fetchBeefs()
    }
    else {
      setIsLoggedIn(false)
    }
  }, [location])


  return (
    <div className='home'>
      <div className='beefs'>
        {beefs && beefs.map((beef) => (
          <BeefDetails key={beef._id} beef={beef}/>
        ))}
      </div>
    </div>
  )
}

export default Home;