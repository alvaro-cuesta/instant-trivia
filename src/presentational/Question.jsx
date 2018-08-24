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
}) => (
  <div className={styles.card}>
    <div className={styles.question}>{question}</div>

    <div className={styles.answers}>
      {answerOrder.map(i => (
        <button
          key={i}
          className={cx(styles.answer, {
            [styles.selected]: selected === i,
            [styles.correct]: selected !== undefined && i === 0,
            [styles.incorrect]: selected !== undefined && i !== 0
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
