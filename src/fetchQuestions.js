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

export default function fetchQuestions({ amount, category, difficulty, type }) {
  const queryParams = {
    encode: "url3986"
  };

  if (amount !== undefined) {
    amount = parseInt(amount, 10)

    if (isNaN(amount) || amount <= 0) {
      throw new Error(`Invalid amount ${amount}`);
    }

    queryParams.amount = amount;
  }

  if (category !== undefined) {
    queryParams.category = category;
  }

  if (difficulty !== undefined) {
    if (
      difficulty !== "easy" &&
      difficulty !== "medium" &&
      difficulty !== "hard"
    ) {
      throw new Error(`Difficulty ${difficulty} unknown`);
    }

    queryParams.difficulty = difficulty;
  }

  if (type !== undefined) {
    if (type !== "multiple" && type !== "boolean") {
      throw new Error(`Type ${type} unknown`);
    }

    queryParams.type = type;
  }

  const queryParamsString = Object.entries(queryParams)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  return fetch(`https://opentdb.com/api.php?${queryParamsString}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Network error: ${response.statusTex} (${response.status})`
        );
      }

      return res.json();
    })
    .then(({ response_code, results }) => {
      switch (response_code) {
        case 0: {
          return { response: "OK", questions: results.map(sanitizeQuestion) };
        }

        case 1: {
          return { response: "NO_RESULTS" };
        }

        case 2: {
          throw new Error("Invalid parameter");
        }

        case 1: {
          return { response: "TOKEN_NOT_FOUND" };
        }

        case 1: {
          return { response: "TOKEN_EXHAUSTED" };
        }

        default: {
          throw new Error(`Unknown response code ${response_code}`);
        }
      }
    });
}
