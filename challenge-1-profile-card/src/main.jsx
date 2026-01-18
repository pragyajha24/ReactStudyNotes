import React from 'react';
import ReactDOM from 'react-dom/client';

import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>
)


function App(){
  return (
   <div className="card">
      <Avatar/>
      <div className="data">
        <Intro />
        <SkillList />
      </div>
  </div>
  )
}

function Avatar(){
  return <img className="avatar" src="image/womancoding-unsplash.jpg" alt = "person image" />
}

function Intro(){
  return <>
  <h1>Pragya Jha</h1>
  <p> Frontend web developer and currently looking for job. When not coding I like to read literary fiction or binge watch a tv series.</p>
  </>
}

// function SkillList(){
//   return (
//   <div className="skill-list">
//   <p className="skill">HTML+CSS 💪</p>
//   <p className="skill">JavaScript 💪</p>
//   <p className="skill">Web Design 💪</p>
//   <p className="skill">Git and Github 👍</p>
//   <p className="skill">React 👍 </p>
//   </div>
//   )
// }

function SkillList(){
  return (
    <div className="skill-list">
    <Skill skill="HTML+CSS" emoji ="💪" color="orangered" />
    <Skill skill="JavaScript" emoji ="💪" color="violet" />
    <Skill skill="Web Design" emoji ="💪" color="grey"/>
    <Skill skill="Git and Github" emoji ="👍" color="pink" />
    <Skill skill="React" emoji ="👍" color="blue" />
    <Skill skill="Python" emoji ="👶" color="yellow" />
    

    </div>
  )
}

function Skill(props){
return (
  <div className="skill" style={{backgroundColor:props.color}}>
    <span>{props.skill}</span>
    <span>{props.emoji}</span>
  </div>
);
}