import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Question from "./presentational/Question";

class App extends React.Component {
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
    const { questions } = this.props;
    const { answers, current } = this.state;

    return (
      <div className="app">
        <div
          className="scroll-wrapper"
          style={{ transform: `translateY(-${100 * current / questions.length}%)` }}
        >
          {questions.map((question, i) => {
            return (
              <Question
                key={i}
                question={question.question}
                answers={[
                  question.correct_answer,
                  ...question.incorrect_answers
                ]}
                answerOrder={question.answerOrder}
                correct={
                  i < answers.length
                    ? question.answerOrder.indexOf(0)
                    : undefined
                }
                selected={i < answers.length ? answers[i] : undefined}
                onAnswer={this.makeHandleAnswer(i)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function generateAnswerOrder(question) {
  const answerCount = question.incorrect_answers.length + 1;
  const positions = Array(answerCount)
    .fill()
    .map((_, i) => i);

  return shuffleArray(positions);
}

fetch("https://opentdb.com/api.php?amount=10&encode=url3986")
  .then(res => res.json())
  .then(({ response_code, results }) => {
    for (let result of results) {
      result.question = decodeURIComponent(result.question);
      result.correct_answer = decodeURIComponent(result.correct_answer);
      result.incorrect_answers = result.incorrect_answers.map(answer =>
        decodeURIComponent(answer)
      );
      result.answerOrder = generateAnswerOrder(result);
    }

    console.log(results);

    ReactDOM.render(
      <App questions={results} />,
      document.getElementById("app")
    );
  });
