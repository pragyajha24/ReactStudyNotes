import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor is reprehenderit in volupate velit esse cillum dolore eu fugit nulla pariatur.Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },

  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },

  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  return (
    <div>
      <div className="tabs">
        <Tab num={0} />
        <Tab num={1} />
        <Tab num={2} />
        <Tab num={3} />

        {/* pass the first item from the content array into the component */}
        <TabContent content={content[0]} />
      </div>
    </div>
  );
}

function Tab({ num }) {
  return <button> Tab{num + 1} </button>;
}

function TabContent({ content }) {
  return (
    <div className="tab-content">
      <h4>{content.summary}</h4>
      <p>{content.details}</p>

      <div className="hearts-counter">
        <span>0 ❤️</span>
        <button>+</button>
        <button>+++</button>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}
