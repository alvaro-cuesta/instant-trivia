import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./Question.cssm";

const Question = ({
  question,
  answers,
  answerOrder,
  selected,
  onAnswer,
  isViewing,
}) => (
  <div className={styles.card}>
    <div className={styles.question}>{question}</div>

    <div className={styles.answers}>
      {answerOrder.map((answerIndex, buttonIndex) => (
        <button
          key={buttonIndex}
          className={cx(styles.answer, {
            [styles.selected]: selected === answerIndex,
            [styles.correct]: selected !== undefined && answerIndex === 0,
            [styles.incorrect]: selected !== undefined && answerIndex !== 0
          })}
          onClick={() => onAnswer(answerIndex)}
          tabindex={isViewing ? buttonIndex + 1 : -1}
        >
          {answers[answerIndex]}
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
  isViewing: PropTypes.bool,
};

export default Question;
