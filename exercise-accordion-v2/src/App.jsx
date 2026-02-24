import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {faqs.map(function (faq, i) {
        return (
          <AccordionItem
            faq={faq}
            curOpen={curOpen}
            onOpen={setCurOpen}
            key={faq.title}
            index={i}
          />
        );
      })}
    </div>
  );
}

function AccordionItem({ faq, index, curOpen, onOpen }) {
  const isOpen = index === curOpen;

  function handleToggle() {
    onOpen(index);
  }

  return (
    <div className={`item ${isOpen ? "open" : " "}`} onClick={handleToggle}>
      <p className="number">{index < 9 ? `0${index + 1}` : index + 1} </p>
      <p className="title">{faq.title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>

      {isOpen && <div className="content-box">{faq.text} </div>}
    </div>
  );
}
