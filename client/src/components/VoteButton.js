import React, { useState, } from 'react';
const VoteButton = ({ beef, count, flag }) => {

  const [updatedCount, setUpdatedCount] = useState(count); 
  
  const handleVoteClick = async () => {
    
    if (flag === 1) {
      try {
        // Send PATCH request to update the vote count on the backend for a specific beef
        const response = await fetch(`/api/beef/${beef._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            votesForUser1: updatedCount + 1 // Include the current vote count
          })
        })
          
        if (response.ok) {
          setUpdatedCount(updatedCount + 1) 
        } else {
  
        }
      } catch (error) {
  
      }
    }
    if (flag === 2) {
      try {
        // Send PATCH request to update the vote count on the backend for a specific beef
        const response = await fetch(`/api/beef/${beef._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            votesForUser2: updatedCount + 1 // Include the current vote count
          })
        })
          
        if (response.ok) {
          setUpdatedCount(updatedCount + 1) 
        } else {
  
        }
      } catch (error) {
  
      }
    }
  }
  
  return (
    <button className="vote-button" onClick={handleVoteClick}>
      {updatedCount}
    </button>
  )
}

export default VoteButton