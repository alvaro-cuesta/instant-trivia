import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

import "./index.css";

import ScrollLayout from "./presentational/ScrollLayout.jsx";
import InternalError from "./presentational/InternalError.jsx";
import Loading from "./presentational/Loading.jsx";
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
    customDifficulty: undefined,
    customType: undefined,
    questions: null,
    error: null
  };

  handleQuickGame = () => {
    this.transition("LOADING");

    fetchQuestions({ amount: 10 })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  handleStartCustom = () => {
    const { customLength, customDifficulty, customType } = this.state;

    this.transition("LOADING");

    fetchQuestions({
      amount: customLength,
      difficulty: customDifficulty,
      type: customType
    })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  handleCustomLength = ({ target: { value } }) => {
    this.setState({ customLength: parseInt(value, 10) });
  };

  handleCustomDifficulty = ({ target: { value } }) => {
    this.setState({ customDifficulty: value !== "" ? value : undefined });
  };

  handleCustomType = ({ target: { value } }) => {
    this.setState({ customType: value !== "" ? value : undefined });
  };

  handleResponse = ({ response, questions }) => {
    console.log(response, questions);

    if (response !== "OK") {
      this.transition("ERROR", { error: `Unhandled response ${response}` });
      return;
    }

    this.transition("ROUND", { questions });
  };

  handleError = error => {
    console.error(error);
    this.transition("ERROR", { error: error.message });
  };

  transition = (phase, extraState) => {
    this.setState(state => ({
      fromPhase: state.phase,
      phase,
      ...extraState
    }));
  };

  handleTransitionEnd = e => {
    const { fromPhase } = this.state;

    this.setState({ fromPhase: null });

    switch (fromPhase) {
      case "ROUND": {
        this.setState({ questions: null });
      }

      case "ERROR": {
        this.setState({ error: null });
      }

      default:
    }
  };

  render() {
    const {
      fromPhase,
      phase,
      questions,
      error,
      customLength,
      customDifficulty,
      customType
    } = this.state;

    return (
      <ScrollLayout
        current={App.PHASE_TO_CURRENT[phase]}
        horizontal={true}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {(fromPhase === "LANDING" || phase === "LANDING") && (
          <div>
            <h1>Instant Trivia</h1>
            <button onClick={this.handleQuickGame}>Quick Game</button>
            <button onClick={() => this.transition("CUSTOM")}>Custom</button>
          </div>
        )}

        {(fromPhase === "CUSTOM" || phase === "CUSTOM") && (
          <div>
            <h1>Custom Game</h1>

            <div>
              <label>
                Questions:
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={customLength}
                  onChange={this.handleCustomLength}
                />
              </label>
            </div>

            <div>
              <label>
                Difficulty:
                <select
                  value={customDifficulty}
                  onChange={this.handleCustomDifficulty}
                >
                  <option value="">Any</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
            </div>

            <div>
              <label>
                Type:
                <select value={customType} onChange={this.handleCustomType}>
                  <option value="">Any</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / Fasle</option>
                </select>
              </label>
            </div>

            <div>
              <button onClick={this.handleStartCustom}>Start</button>
              <button onClick={() => this.transition("LANDING")}>Back</button>
            </div>
          </div>
        )}

        {(fromPhase === "LOADING" || phase === "LOADING") && <Loading />}

        {(fromPhase === "ERROR" || phase === "ERROR") && (
          <InternalError
            error={error}
            onBack={() => this.transition("LANDING")}
          />
        )}

        {(fromPhase === "ROUND" || phase === "ROUND") && (
          <Round
            questions={questions}
            onFinish={() => this.transition("LANDING")}
          />
        )}
      </ScrollLayout>
    );
  }
}

const HotApp = hot(module)(App);

ReactDOM.render(<HotApp />, document.getElementById("container"));
