import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Question from "./presentational/Question.jsx";
import ScrollLayout from "./presentational/ScrollLayout.jsx";
import Round from "./smart/Round.jsx";

import fetchQuestions from "./fetchQuestions";

class App extends React.Component {
  static PHASE_TO_CURRENT = {
    LANDING: 0,
    CUSTOM: 1,
    LOADING: 2,
    ERROR: 3,
    ROUND: 4
  };

  state = {
    fromPhase: null,
    phase: "LANDING",
    customLength: 10,
    questions: null
  };

  handleQuickGame = () => {
    this.setState({ fromPhase: "LANDING", phase: "LOADING" });

    fetchQuestions({ amount: 10 })
      .then(({ response, questions }) => {
        console.log(response, questions);

        if (response !== "OK") {
          this.transition('ERROR', { error: `Unhandled response ${response}` })
          return
        }

        this.transition('ROUND', { questions })
      })
      .catch(error => {
        console.error(error)
        this.transition('ERROR', { error: error.message })
      });
  };

  handleStartCustom = () => {
    const { customLength } = this.state;

    this.transition('LOADING')

    fetchQuestions({ amount: customLength })
      .then(({ response, questions }) => {
        console.log(response, questions);

        if (response !== "OK") {
          this.transition('ERROR', { error: `Unhandled response ${response}` })
          return
        }

        this.transition('ROUND', { questions })
      })
      .catch(error => {
        console.error(error)
        this.transition('ERROR', { error: error.message })
      });
  };

  handleCustomLength = ({ target: { value } }) => {
    this.setState({ customLength: parseInt(value, 10) });
  };

  transition = (phase, extraState) => {
    this.setState(state => ({
      fromPhase: state.phase, phase,
      ...extraState
    }));
  };

  handleTransitionEnd = e => {
    const { fromPhase } = this.state;

    this.setState({ fromPhase: null });

    if (fromPhase === "ROUND") {
      this.setState({ questions: null });
    }
  };

  render() {
    const { fromPhase, phase, questions, error, customLength } = this.state;

    return (
      <ScrollLayout
        current={App.PHASE_TO_CURRENT[phase]}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {(fromPhase === "LANDING" || phase === "LANDING") && (
          <div>
            <h1>Instant Trivia</h1>
            <button onClick={this.handleQuickGame}>Quick Game</button>
            <button onClick={() => this.transition('CUSTOM')}>Custom</button>
          </div>
        )}

        {(fromPhase === "CUSTOM" || phase === "CUSTOM") && (
          <div>
            <h1>Custom Game</h1>
            <label>
              Questions:
              <input
                type="number"
                value={customLength}
                onChange={this.handleCustomLength}
              />
            </label>
            <button onClick={this.handleStartCustom}>Start</button>
            <button onClick={() => this.transition('LANDING')}>Back</button>
          </div>
        )}

        {(fromPhase === "LOADING" || phase === "LOADING") && (
          <h1>Loading...</h1>
        )}

        {(fromPhase === "ERROR" || phase === "ERROR") && (
          <div>
            <h1>Internal Error</h1>
            <p>{error}</p>
            <button onClick={() => this.transition('LANDING')}>Back</button>
          </div>
        )}

        {(fromPhase === "ROUND" || phase === "ROUND") && (
          <Round questions={questions} onFinish={() => this.transition('LANDING')} />
        )}
      </ScrollLayout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
