import { useState } from "react";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import FriendList from "./FriendList";

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList Button={Button}/>
      
        <FormAddFriend Button={Button} />
      </div>

      {/* <FormSplitBill /> */}
    </div>
  );
}

 function Button({children}){
  return (
    <button className="button">{children} </button>
  )
}