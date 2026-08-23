export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      {/* progress bar */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      {/* question number */}
      <p>
        Question <strong> {index + 1} </strong> / {numQuestions}
      </p>

      {/* points with max points */}
      <p>
        {" "}
        <strong> {points} </strong> /{maxPossiblePoints}
      </p>
    </header>
  );
}
