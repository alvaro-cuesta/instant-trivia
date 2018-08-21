import React from "react";
import cx from "classnames";

import "./Question.css";

const Question = ({
  question,
  answers,
  answerOrder,
  correct,
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
            correct: correct !== undefined && correct === i,
            incorrect: correct !== undefined && correct !== i
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
