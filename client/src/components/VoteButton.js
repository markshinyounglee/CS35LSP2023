import React, { useState, } from 'react';
import { useLocation } from 'react-router-dom'


const VoteButton = ({ beef, count, flag }) => {
 const [updatedCount, setUpdatedCount] = useState(count);
 const location = useLocation()

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
           votesForUser1: updatedCount + 1, // Include the current vote count
           usersThatVotedForUser1: [...beef.usersThatVotedForUser1, location.state.loginUserId] // Include the updated users array
         })
       })
        
       if (response.ok) {
         const responseData = await response.json()
         if (!responseData.usersThatVotedForUser1.includes(location.state.loginUserId) && 
          !responseData.usersThatVotedForUser2.includes(location.state.loginUserId)) {

          setUpdatedCount(updatedCount + 1)
          responseData.usersThatVotedForUser1.push(location.state.loginUserId) // push not happening here
          console.log('we can vote again')
         }
         else {
           console.log('we voted for this already')
         }
       } else {
       }
     } catch (error) {
       console.error('Error occurred while updating the vote count:', error);
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
           votesForUser2: updatedCount + 1, // Include the current vote count
           usersThatVotedForUser2: [...beef.usersThatVotedForUser2, location.state.loginUserId] // Include the updated users array
         })
       })
        
       if (response.ok) {


         const responseData = await response.json()
         if (!responseData.usersThatVotedForUser2.includes(location.state.loginUserId)  && 
          !responseData.usersThatVotedForUser1.includes(location.state.loginUserId)) {

           setUpdatedCount(updatedCount + 1)
           responseData.usersThatVotedForUser2.push(location.state.loginUserId)
           console.log('we can vote again')
         }
       
         else {
           console.log('we voted for this already')
         }
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