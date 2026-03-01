import { useState } from "react";
import AddFriend from "./AddFriend";
import BillForm from "./BillForm";
import Friends from "./Friends";

export default function App() {
  // state for input elements in  add friends component
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  // state for input elements in bill form component
  const [bill, setBill] = useState();

  return (
    <div className="app">
      <div className="left">
        <Friends />
        <AddFriend
          name={name}
          onSetName={setName}
          url={url}
          onSetUrl={setUrl}
        />
      </div>

      <div className="right">
        <BillForm />
      </div>
    </div>
  );
}
