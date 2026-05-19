import  "./style.css" ;
// version-2

const skills =[
    {
        skill:"HTML+CSS",
        level:"advanced",
        color:"#2662EA"
    },
    {
        skill:"Javascript",
        level:"intermediate",
        color:"#EFD81D"
    },
    {
        skill:"Git and Gthub",
        level:"intermediate",
        color:"#E84F33"
    },
    {
        skill:"Web Design",
        level:"advanced",
        color:"#C3DCAF",
    },
    {
        skill:"React",
        level:"intermediate",
        color:"#60DAFB"
    },
    {
        skill:"Python",
        level:"beginner",
        color:"#EE3800"
    }

]

export default function App(){
    return(
    <div className="card"> 
        <Avatar />
        <div className="data">
          <Intro />
          <SkillList />
        </div>
    </div>
    )
}


function Avatar(){
    return (
        <img className="avatar" src="image/womancoding-unsplash.jpg" />
    )
}

function Intro(){
return (
    <div>
    <h1> Pragya Jha </h1>
    <p>Frontend web developer and currently looking for job. When not coding I like to read literary fiction or binge watch a tv series. </p>
     </div>
)    
}

function SkillList(){
    return (
     <ul className="skill-list">
      { skills.map(function(skill){
        return <Skill skill={skill} key={skills.skill} />
     }) }
     </ul>
    )
}

function Skill({skill}){
    return (
       <li className="skill" style={{backgroundColor:skill.color}} >
       <span> {skill.skill} </span>
       <span> {skill.level === "advanced" && '💪'  } </span>
       <span> {skill.level === "intermediate" && '👍'  } </span>
       <span> {skill.level === "beginner" && '👶'  } </span>
        </li>
    )
}