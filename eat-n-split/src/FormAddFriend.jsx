import { useState } from "react";

export default function FormAddFriend({ Button}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");


  function handleSubmit(e){
    e.preventDefault();

    //guard clause , if nothing in input don't submit form
    if(!name || !image) return;

   const id = crypto.randomUUID();
    //created a new Friend object to add in our array
    const newFriend = {
       id,
       name,
       image : `${image}?=${id}`,
       balance: 0,    
    };
    console.log(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="add-friend-form" onSubmit={handleSubmit} >
      <label>👫Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button> Add </Button>
    </form>
  );
}

