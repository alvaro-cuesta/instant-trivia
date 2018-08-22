import React from "react";
import cx from "classnames";

import "./Question.css";

const Question = ({
  question,
  answers,
  answerOrder,
  selected,
  onAnswer
}) => (
  <div className="question-card">
    <div className="question">{question}</div>

    <div className="answers">
      {answerOrder.map(i => (
        <button
          key={i}
          className={cx("answer", {
            selected: selected === i,
            correct: selected !== undefined && i === 0,
            incorrect: selected !== undefined && i !== 0
          })}
          onClick={() => onAnswer(i)}
        >
          {answers[i]}
        </button>
      ))}
    </div>
  </div>
);

export default Question;
