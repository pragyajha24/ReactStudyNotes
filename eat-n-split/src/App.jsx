import { useState } from "react";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import FriendList from "./FriendList";

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

export default function App() {
  // state for displaying the Form add friend component
  const [showAddFriend,setShowAddFriend] = useState(false);

  //event handler function to display the show add friend form
  //toggle the current state
  function handleShowAddFriend(){
   setShowAddFriend(function(show){
    return !show;
   })
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList Button={Button}  initialFriends={initialFriends} />

          {/* conditionally rendering the component */}
     { showAddFriend && <FormAddFriend Button={Button}   /> }

           {/* change text from Add friend to Close depending on state value */}
        <Button onClick={handleShowAddFriend} > {showAddFriend ? 'Close' : 'Add Friend'} </Button>
      </div>

      <FormSplitBill Button={Button}  />
    </div>
  );
}

// reusable component
 function Button({children, onClick}){
  return (
    <button className="button" onClick={onClick}>{children} </button>
  )
}