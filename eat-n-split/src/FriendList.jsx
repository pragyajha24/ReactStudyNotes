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


export default function FriendList(){
  return (
    <ul className="list"> 
    
     {initialFriends.map(function(friend){
      return <List friend={friend} key={friend.id} />
     }) }

     <button className="button"> Add Friend </button>
    </ul>
  )
}

function List({friend}){
  return (
    <li> 
    <img src={friend.image} />
    
    <div> 
    <p> {friend.name} </p>
 
 {friend.balance > 0 && <p> {friend.name} owes you {Math.abs(friend.balance)} </p>}

 {friend.balance < 0 && <p> You own {friend.name} {Math.abs(friend.balance)} </p>}

 {friend.balance === 0 && <p> You and {friend.name} are even. </p>}

</div>
     
     <button className="button">Select</button>
    </li>
  )
}