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
  // state to display different tab data - store the currently selected tab index
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {/* set the tab clicked as active tab */}
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />

        {/*////// pass the first item from the content array into the component */}
        {/* <TabContent content={content[0]} /> */}

        {/* //////show content of active tab */}
        {/* <TabContent content={content[activeTab]} /> */}

        {activeTab <= 2 ? (
          <TabContent itemContent={content.at(activeTab)} />
        ) : (
          <DifferentContent />
        )}
      </div>
    </div>
  );
}

function Tab({ num, onClick, activeTab }) {
  return (
    // It this tab is active tab, use "tab active" classname otherwise 'tab'.
    //for tab you click , becomes the active tab .
    //but this line runs for every tab, ot just clicked tab.
    //because react re-renders Tabbed and inside tabbe you render all tabs.

    //the information about which tab is active lives in the parent.
    //so passed activeTab as prop

    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab{num + 1}
    </button>
  );
}

function TabContent({ itemContent }) {
  return (
    <div className="tab-content">
      <h4>{itemContent.summary}</h4>
      <p>{itemContent.details}</p>

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

// When i click on Tab button , the tab button num gets selected and that puts thst clicked tab as active tab.
//Click happens later -> React runs the function -> onClick(num) -> setActiveTab(num)

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
