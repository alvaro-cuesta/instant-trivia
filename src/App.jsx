import React from 'react';
import { hot } from "react-hot-loader";
import SVGInline from "react-svg-inline";
import arrowLeftIcon from "!raw-loader!icons/arrow-left.svg";
import arrowRightIcon from "!raw-loader!icons/arrow-right.svg";
import githubIcon from "!raw-loader!icons/github.svg";

import "./index.css";

import ScrollLayout from "presentational/ScrollLayout";
import InternalError from "presentational/InternalError";
import Loading from "presentational/Loading";
import Round from "smart/Round";

import fetchQuestions from "./fetchQuestions";

import styles from "./App.cssm";

class App extends React.Component {
  static PHASE_TO_CURRENT = {
    LANDING: 0,
    CUSTOM: 1,
    LOADING: 2,
    ERROR: 3,
    ROUND: 4
  };

  constructor(props) {
    super(props)

    this.state = {
      fromPhase: null,
      phase: "LANDING",
      customLength: 10,
      customDifficulty: undefined,
      customType: undefined,
      questions: null,
      error: null
    };

    this.lengthInputId = Math.random().toString();
    this.difficultyInputId = Math.random().toString();
    this.typeInputId = Math.random().toString();
  }

  handleQuickGame = (e) => {
    e.preventDefault();

    this.transition("LOADING");

    fetchQuestions({ amount: 10 })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  handleGoToCustom = (e) => {
    e.preventDefault();

    this.transition("CUSTOM");
  };

  handleStartCustom = (e) => {
    e.preventDefault();

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

  handleBackFromCustom = (e) => {
    e.preventDefault();

    this.transition("LANDING");
  }

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
    console.debug(response, questions);

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

  handleBackFromRound = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.transition("LANDING");
  }

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

  shouldShowPhase = (phase) => {
    const { fromPhase, phase: currentPhase } = this.state

    return fromPhase === phase || currentPhase === phase
  }

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
      <React.Fragment>
        <ScrollLayout
          current={App.PHASE_TO_CURRENT[phase]}
          horizontal={true}
          onTransitionEnd={this.handleTransitionEnd}
        >
          {this.shouldShowPhase("LANDING") && (
            <div className={styles.offCenter}>
              <h1>
                Instant Trivia
                <a href="#" onClick={this.handleQuickGame}>
                  <SVGInline svg={arrowRightIcon} />
                </a>
              </h1>

              <a href="#" onClick={this.handleGoToCustom}>
                (custom game...)
              </a>
            </div>
          )}

          {this.shouldShowPhase("CUSTOM") && (
            <div className={styles.offCenter}>
              <h1 className={styles.backArrowContainer}>
                <a
                  className={styles.backArrow}
                  href="#"
                  onClick={this.handleBackFromCustom}
                >
                  <SVGInline svg={arrowLeftIcon} />
                </a>

                Custom Game
              </h1>

              <div className={styles.formFields}>
                <label htmlFor={this.lengthInputId}>Questions</label>

                <input
                  id={this.lengthInputId}
                  type="number"
                  min={0}
                  step={1}
                  value={customLength}
                  onChange={this.handleCustomLength}
                />

                <label htmlFor={this.difficultyInputId}>Difficulty</label>

                <select
                  id={this.difficultyInputId}
                  value={customDifficulty}
                  onChange={this.handleCustomDifficulty}
                >
                  <option value="">Any</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <label htmlFor={this.typeInputId}>Type</label>

                <select
                  id={this.typeInputId}
                  value={customType}
                  onChange={this.handleCustomType}
                >
                  <option value="">Any</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </select>

                <div />

                <div>
                  <a href="#" onClick={this.handleStartCustom}>
                    Start
                    <SVGInline svg={arrowRightIcon} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {this.shouldShowPhase("LOADING") && <Loading />}

          {this.shouldShowPhase("ERROR") && (
            <div className={styles.offCenter}>
              <InternalError
                error={error}
                onBack={() => this.transition("LANDING")}
              />
            </div>
          )}

          {this.shouldShowPhase("ROUND") && (
            <Round
              questions={questions}
              onFinish={this.handleBackFromRound}
            />
          )}
        </ScrollLayout>

        <div className={styles.overlay}>
          {
            phase !== "LANDING" && phase !== "CUSTOM"
            ? (
                <a href="#" onClick={this.handleBackFromRound}>
                  <SVGInline className={styles.overlayButton} svg={arrowLeftIcon} />
                </a>
              )
            : <div />
          }

          <div />

          <div />

          <a href={"https://www.github.com/alvaro-cuesta/instant-trivia/"}>
            <SVGInline className={styles.overlayButton} svg={githubIcon} />
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
