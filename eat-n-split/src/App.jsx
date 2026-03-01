import AddFriend from "./AddFriend";
import BillForm from "./BillForm";
import Friends from "./Friends";

export default function App() {
  return (
    <div className="app">
      <div className="left">
        <Friends />
        <AddFriend />
      </div>

      <div className="right">
        <BillForm />
      </div>
    </div>
  );
}
