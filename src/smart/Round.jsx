import React from "react";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import arrowLeftIcon from "!raw-loader!icons/arrow-left.svg";

import Question from "presentational/Question";
import ScrollLayout from "presentational/ScrollLayout";

import styles from "../App.cssm";

class Round extends React.Component {
  state = {
    answers: [],
    current: 0
  };

  makeHandleAnswer = question => answer => {
    const { questions } = this.props;
    const { answers } = this.state;

    if (answers[question] !== undefined) {
      return;
    }

    this.setState(
      ({ answers }) => {
        answers[question] = answer;
        return { answers };
      },
      () => {
        setTimeout(() => {
          this.setState({ current: question + 1 });
        }, 2000);
      }
    );
  };

  handleFinish = (e) => {
    e.preventDefault();

    if (this.props.onFinish) {
      this.props.onFinish();
    }
  }

  render() {
    const { questions, onFinish } = this.props;
    const { answers, current } = this.state;

    return (
      <ScrollLayout current={current}>
        {questions.map((question, i) => (
          <Question
            key={i}
            question={question.question}
            answers={[question.correct_answer, ...question.incorrect_answers]}
            answerOrder={question.answerOrder}
            selected={answers[i]}
            onAnswer={this.makeHandleAnswer(i)}
          />
        ))}

        <div className={styles.offCenter}>
          <h1>End game stats</h1>

          <p>TODO</p>

          <div className={styles.backArrowContainer}>
            <a
              className={styles.backArrow}
              href="#"
              onClick={this.handleFinish}
            >
              <SVGInline svg={arrowLeftIcon} />
              Finish
            </a>
          </div>
        </div>
      </ScrollLayout>
    );
  }
}

Round.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    answerOrder: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  onFinish: PropTypes.func,
};

export default Round;
