import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import classNames from "./Question.cssm";

const Question = ({
  question,
  answers,
  answerOrder,
  selected,
  onAnswer,
}) => (
  <div className={classNames.card}>
    <div className={classNames.question}>{question}</div>

    <div className={classNames.answers}>
      {answerOrder.map(i => (
        <button
          key={i}
          className={cx(classNames.answer, {
            [classNames.selected]: selected === i,
            [classNames.correct]: selected !== undefined && i === 0,
            [classNames.incorrect]: selected !== undefined && i !== 0
          })}
          onClick={() => onAnswer(i)}
        >
          {answers[i]}
        </button>
      ))}
    </div>
  </div>
);

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  answerOrder: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected: PropTypes.number,
  onAnswer: PropTypes.func.isRequired,
};

export default Question;
