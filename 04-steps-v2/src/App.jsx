import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // const step = 1;

  function handlePrevious() {
    if (step > 1)
      setStep(function (s) {
        return s - 1;
      });
  }

  function handleNext() {
    if (step < 3)
      setStep(function (s) {
        return s + 1;
      });
  }

  return (
    <div>
      <button
        className="close"
        onClick={() =>
          setIsOpen(function (is) {
            return !is;
          })
        }
      >
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step} : {messages[step - 1]}
          </p>

          <div className="buttons">
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handlePrevious}
              // text="Previous"
              // emoji="👈"
            >
              <span>👈</span>Previous
            </Button>

            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handleNext}
              // text="Next"
              // emoji="👉"
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
