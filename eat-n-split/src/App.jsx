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
  //state for adding and updating new object in the list
  const [friends, setFriends] = useState(initialFriends);

  // state for displaying the Form add friend component
  const [showAddFriend, setShowAddFriend] = useState(false);

  // state for friend object
  const [selectedFriend, setSelectedFriend] = useState(null);

  //event handler function to display the show add friend form
  //toggle the current state
  function handleShowAddFriend() {
    setShowAddFriend(function (show) {
      return !show;
    });
  }

  // to add new friends
  //friend - new friend that we created
  function handleAddFriend(friend) {
    //take the current friends - then we create  a new array
    //spread current friends and add new friend
    setFriends(function (friends) {
      return [...friends, friend];
    });

    //to close the add friend form after submiting it
    setShowAddFriend(false);
  }

  // function to control the selectedFriend state
  function handleSelection(friend) {
    ////currently selected friend
    // setSelectedFriend(friend);

    setSelectedFriend(function (cur) {
      return cur?.id === friend.id ? null : friend;
    });

    // to close formaddfriend when formsplitbill opens,
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    // console.log(value);

    //updating  friends state
    //new array that we written here will be based on current friends array
    setFriends(function (friends) {
      return friends.map(function (friend) {
        return friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend;
      });
    });

    //setting the state back to initial after submitting the split bill and close the form
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          Button={Button}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {/* conditionally rendering the component */}
        {showAddFriend && (
          <FormAddFriend onAddFriend={handleAddFriend} Button={Button} />
        )}

        {/* change text from Add friend to Close depending on state value */}
        <Button onClick={handleShowAddFriend}>
          {" "}
          {showAddFriend ? "Close" : "Add Friend"}{" "}
        </Button>
      </div>

      {/* if no friend is selected, don't want to show FormSplitBill component */}
      {/* so, conditionally rendering it */}
      {selectedFriend && (
        <FormSplitBill
          Button={Button}
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

// reusable component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}{" "}
    </button>
  );
}
