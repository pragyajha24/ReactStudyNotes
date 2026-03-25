import { useState } from "react";

export default function FormAddFriend() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  return (
    <form className="add-friend-form">
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => onSetName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => onSetUrl(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}
