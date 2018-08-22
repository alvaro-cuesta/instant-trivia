import React from "react";

import Question from "../presentational/Question.jsx";
import ScrollLayout from "../presentational/ScrollLayout.jsx";

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
            correct={
              i < answers.length ? question.answerOrder.indexOf(0) : undefined
            }
            selected={i < answers.length ? answers[i] : undefined}
            onAnswer={this.makeHandleAnswer(i)}
          />
        ))}

        <div>
          <h1>End game stats</h1>

          <p>TODO</p>

          <button onClick={onFinish}>Finish</button>
        </div>
      </ScrollLayout>
    );
  }
}

export default Round;
