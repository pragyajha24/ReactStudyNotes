


export default function FriendList({Button , friends}){
  return (
    <ul className="list"> 
    
     {friends.map(function(friend){
      return <List friend={friend} Button={Button} key={friend.id} />
     }) }

    </ul>
  )
}

function List({friend,Button}){
  return (
    <li> 
      <img src={friend.image} />
    
    <div> 
      <p> {friend.name} </p>
 
      {friend.balance > 0 && <p className="green"> {friend.name} owes you {Math.abs(friend.balance)} </p>}

      {friend.balance < 0 && <p className="red"> You owe {friend.name} {Math.abs(friend.balance)} </p>}

      {friend.balance === 0 && <p> You and {friend.name} are even. </p>}
   </div>
     
      <Button>Select</Button>
    </li>
  )
}