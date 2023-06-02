import React, { useState } from 'react';
import VoteButton from './VoteButton';

const BeefDetails = ({ beef }) => {
  const { title, description, user1, user2, votesForUser1, votesForUser2, createdAt } = beef;

  const handleClick = () => {
    // Handle data refetching here 
    console.log("vote button clicked")
  }
  return (
    <div className="beef-details">
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="vote-buttons">
        <VoteButton beef={beef} user={user1} count={votesForUser1} handleClick={handleClick}  />
        <VoteButton beef={beef} user={user2} count={votesForUser2} handleClick={handleClick} />
      </div>
      <p>{createdAt}</p>
    </div>
  );
};

export default BeefDetails;