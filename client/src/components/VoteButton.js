import React from 'react'
const VoteButton = ({ beef, user, count, handleClick }) => {


  const handleVoteClick = async () => {
    try {
      // Send PATCH request to update the vote count on the backend for a specific beef
      const response = await fetch(`/api/updateVoteCount/${beef._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user, // Include any necessary data for authentication or identification
          count: count + 1 // Include the current vote count
        })
      });

      if (response.ok) {
        // Vote count updated successfully, refetch the updated data
        handleClick(); // Call the provided handleClick function to trigger data refetch
      } else {
        // Handle error if the vote count update failed
        // You can display an error message or handle it in a way that makes sense for your application
      }
    } catch (error) {
      // Handle network or other request errors
      // You can display an error message or handle it in a way that makes sense for your application
    }
  };

  return (
    <button className="vote-button" onClick={handleVoteClick}>
        {count}
    </button>
  )
}

export default VoteButton