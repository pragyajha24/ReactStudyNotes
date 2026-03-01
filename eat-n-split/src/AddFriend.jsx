export default function AddFriend({ name, onSetName, url, onSetUrl }) {
  return (
    <div className="addfriendform">
      <div className="formfriend">
        <label>Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onSetName(e.target.value)}
        />
      </div>

      <div className="formfriend">
        <label>Image URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => onSetUrl(e.target.value)}
        />
      </div>

      <button>Add</button>
    </div>
  );
}
