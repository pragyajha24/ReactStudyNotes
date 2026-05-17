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
      </div>
      {/*////// pass the first item from the content array into the component */}
      {/* <TabContent content={content[0]} /> */}

      {/* //////show content of active tab */}
      {/* <TabContent content={content[activeTab]} /> */}

      {activeTab <= 2 ? (
        <TabContent
          itemContent={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
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
  //state to show tab content detals and to hide it
  const [showDetails, setShowDetails] = useState(true);

  //state to update , set likes
  const [likes, setLikes] = useState(0);

  //each time component gets re-renders and so then each time
  // this console.log will log render to the console.
  //each time we click on component which creates some change ,
  // component re-renders and this gets log
  console.log("COMPONENT IS RENDER");

  function handleLikesInc() {
    // setLikes(likes + 1);

    //always use a callback function
    setLikes(function (likes) {
      return likes + 1;
    });
  }

  // lecture-136 state update batching in practice - I
  // undo button handler
  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
    //to show state updating in asynchronous
    //it keeps the current state like value instead of 0
    console.log("state updating is ASYNCHRONOUS");
    //here we still gets old likes state, because its only updated
    //after re-rendering, not immediately after we call the function
    console.log(likes);
  }

  /////this works ,but we are understanding batching so not doing this way
  // function handleTripleInc() {
  //   setLikes(likes + 3);
  // }

  function handleTripleInc() {
    // setLikes(likes + 1);
    // console.log(likes);
    // setLikes(likes + 1);
    // setLikes(likes + 1);

    // callback function to update state based on current state value
    //initally likes was 0 , then it became 1
    setLikes(function (likes) {
      return likes + 1;
    });
    //here, 1+1 , became 2
    setLikes(function (likes) {
      return likes + 1;
    });
    //here , 2+1 , became 3
    setLikes(function (likes) {
      return likes + 1;
    });
  }

  /* 
  lecture-136 - II
  when we click on the triple+ btn we don't get increase by 3 but only 1,why?
  1. in handleTripleInc function, at first likes is 0 so ,
     setLikes(likes+1) is 0+1 which is 0 great.
  2. the values of likes in next line is still 0.That's because the
     state update is asynchronous.So, we do not get access to the
     new state value after the first setLikes code.
     Here the state is now stale.

  3.How could we make this work ,if we really wanted to update the
    state three times?in another way of likes+3

 4.All the time we were updating state based on the current state,
   we would use a callback function instead of just a value.

  so each time, we set state based on current state or previous
  state, always use a callback function 

  */

  ////learng automatic batching,
  // here handleUndo is not a event handler function,intead
  //it's simply a function that gets call at later time
  function handleUndoLater() {
    setTimeout(handleUndo, 2000);
  }
  /*
  after 2 seconds, state was updated and our component was only
    rendered once
  it proves, in REACT 18 batching happens not only inside 
  event handlers but inside a set timeout.
  */

  return (
    <div className="tab-content">
      <h4>{itemContent.summary}</h4>

      {showDetails && <p>{itemContent.details}</p>}

      <div className="tab-actions">
        {/* When clicked reverse the value of showDetails , every click toggles the value */}
        {/* h -> current value of showDetails */}
        <button onClick={() => setShowDetails((h) => !h)}>
          {/* ternary operator , hide details if true otherwise show */}
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleLikesInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
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

/* 
Lecture - 132
1. so in all the tabbed component , component state is preserved during re-renders as long as the component type remains the same.
2. When I go from TAB 1 to TAB 2 , the component state does not change, because both are rendered in TABCONTENT component. 
3. The state changes when component type is change,when clicked on TAB 4 the component type is differentconent component.
4. Component type is same, so state persists across re-renders. And stays at exact same place in component tree.
5. It only reset when changed to different component type.
6. Then , our state got lost, so tab 1 to tab 3 state remains same, tab 4 it changes because of different component type.

7. basically, when we go to tab 4 the old actions like number of likes in tabs is removed, state is reset.
8. Now, adding key prop to Tabcontent component, after this the key will change between renders.
9. meaning,that now  increasing tab 1 number of likes ,going to tab 2 will rest tab 1 number of likes to back to 0 . key changes across render that will reset the state in all tabs.
10. the change does not stay is gets destroyed as we move to different tab component and react knows it by different key prop they received.
11. component state is reset. react sees all tabs as different now.
*/

/*  
To maintain separate states for each tab, you would need to manage the state externally,
 perhaps using an array of objects to track the likes and visibility status for each tab individually. 
 This way, switching between tabs wouldn't reset the state because you will be storing and retrieving the individual states based on
  the selected tab.
*/
