import VoteButton from './VoteButton';

const BeefDetails = ({ beef }) => {
  const { title, description, user1, user2, votesForUser1, votesForUser2, createdAt } = beef;

  return (
    <div className="beef-details">
      <h1>{title}</h1>
      <p>{description}</p>
      <h2>{user1} VS {user2}</h2>
      <div className="vote-buttons">
        <VoteButton beef={beef} user={user1} count={votesForUser1} flag={1} />
        <VoteButton beef={beef} user={user2} count={votesForUser2} flag={2} />
      </div>
      <p>Beef started on {new Date(createdAt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</p>
    </div>
  )
}

export default BeefDetails;