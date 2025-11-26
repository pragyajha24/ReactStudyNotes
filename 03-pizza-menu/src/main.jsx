//  This is from lectures =>
//  rendering the root component and strict mode  -> Props and Receiving Props

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

///////////////////////////////

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {
    color: "red",
    fontSize: "2.2rem",
    textTransform: "uppercase",
  };

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {/* passing and receiving pros - manually 
      rendered with list - better way in main-finale file */}
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese "
        //files in the  public directory are served at the root part
        photoName="pizzas/spinaci.jpg"
        price={10}
      />

      <Pizza
        name="Focaccia"
        ingredients="Bread with italian olive oil and rosemary"
        photoName="../public/pizzas/focaccia.jpg"
        price={6}
      />
    </main>
  );
}

function Pizza(props) {
  console.log(props);

  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name}></img>
      <div>
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>{props.price + 3}</span>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  //   if (hour >= openHour && hour <= closeHour) {
  //     alert("We're currently open!");
  //   } else alert("Sorry we are closed");

  console.log(hour);

  return (
    <footer className="footer order">
      <p> {new Date().toLocaleTimeString()} We're currently Open!</p>
      <button className="btn">Order Now</button>
    </footer>
  );
}

// render root in react version 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
