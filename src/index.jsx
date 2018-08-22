import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Question from "./presentational/Question.jsx";
import ScrollLayout from "./presentational/ScrollLayout.jsx";
import Round from "./smart/Round.jsx";

class App extends React.Component {
  static PHASE_TO_CURRENT = {
    LANDING: 0,
    LOADING: 1,
    ROUND: 2,
    FINISH: 0,
  };

  state = {
    phase: "LANDING",
    questions: null
  };

  handleNewGame = () => {
    this.setState({ phase: "LOADING" });

    fetch("https://opentdb.com/api.php?amount=10&encode=url3986")
      .then(res => res.json())
      .then(({ response_code, results }) => {
        const questions = results.map(sanitizeQuestion);
        console.log(questions);
        this.setState({ phase: "ROUND", questions });
      });
  };

  handleFinish = () => {
    this.setState({ phase: "FINISH" });
  };

  handleTransitionEnd = e => {
    const { phase } = this.state;

    if (phase === "FINISH") {
      this.setState({ phase: "LANDING", questions: null });
    }
  };

  render() {
    const { phase, questions } = this.state;

    return (
      <ScrollLayout
        current={App.PHASE_TO_CURRENT[phase]}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <div>
          <h1>Instant Trivia</h1>
          <button onClick={this.handleNewGame}>New Game</button>
        </div>

        {(phase === "LOADING" || phase === "ROUND") && <div>Loading...</div>}

        {(phase === "ROUND" || phase === "FINISH") && (
          <Round questions={questions} onFinish={this.handleFinish} />
        )}
      </ScrollLayout>
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

function sanitizeQuestion(question) {
  return {
    ...question,
    question: decodeURIComponent(question.question),
    correct_answer: decodeURIComponent(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map(answer =>
      decodeURIComponent(answer)
    ),
    answerOrder: generateAnswerOrder(question)
  };
}

ReactDOM.render(<App />, document.getElementById("app"));