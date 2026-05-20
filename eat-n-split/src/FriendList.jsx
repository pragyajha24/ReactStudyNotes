const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function FriendList({Button}){
  return (
    <ul className="list"> 
    
     {initialFriends.map(function(friend){
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
 
      {friend.balance > 0 && <p className="red"> {friend.name} owes you {Math.abs(friend.balance)} </p>}

      {friend.balance < 0 && <p className="red"> You own {friend.name} {Math.abs(friend.balance)} </p>}

      {friend.balance === 0 && <p className="green"> You and {friend.name} are even. </p>}
   </div>
     
      <Button>Select</Button>
    </li>
  )
}