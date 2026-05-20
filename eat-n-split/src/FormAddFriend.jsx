import { useState } from "react";


export default function FormAddFriend({ Button}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  return (
    <form className="add-friend-form" >
      <label>👫Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button> Add </Button>
    </form>


    
  );
}

