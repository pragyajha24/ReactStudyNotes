import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        balance: 500,
      };
  }
}

export default function App() {
  const [{ balance, loan }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <Header />
      <Account dispatch={dispatch} balance={balance} />
    </div>
  );
}

function Header() {
  return <h1>useReducer Bank Account</h1>;
}

function Account({ dispatch, balance }) {
  return (
    <div>
      <p className="balance">Balance : {balance}</p>
      <p className="loan">Loan : 0</p>

      <button onClick={() => dispatch({ type: "openAccount" })}>
        Open account
      </button>
    </div>
  );
}
