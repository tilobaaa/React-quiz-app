import classes from "./QuizApp.module.css";
import { useEffect, useState } from "react";
import Choices from "./Choices";
import Results from "./Results";
import DisplayResults from "./DisplayResults";

const QuizApi = () => {
  const [questionArray, setQuestionArray] = useState([]);
  const [runNow, setRunNow] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkNow, setCheckNow] = useState(false)
  const [selectedLimit, setSelectedLimit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [displayScore, setDisplayScore] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const onStartClickHandler = () => {
    setRunNow(true);
    let numbersArray = [];
    for (let i = 1; i <=selectedLimit; i++){
      numbersArray.push(i)
    }
  };

  const difficultyFunction = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const limitFunction = (limit) => {
    setSelectedLimit(limit);
  };

  const categoryFunction = (category) => {
    setSelectedCategory(category);
  };

  const runWhen =
    selectedLimit !== "" &&
    selectedCategory !== "" &&
    selectedDifficulty !== "";

  const onAnswerSelectHandler = (questionId, selectedAnswer) => {
    setSelectedAnswers((prevSelected) => ({
      ...prevSelected,
      [questionId]: selectedAnswer,
    }));
  };
  useEffect(() => {
    if (runNow) {
      const url = "https://quizapi.io/api/v1/questions";
      const API_KEY = "NetuhGy50Bh4it9G4Dw12FUjKNh1JipmH1N2VfdU";
      const limit = selectedLimit;
      const category = selectedCategory;
      const difficulty = selectedDifficulty;

      async function fetchQuestions() {
        try {
          const response = await fetch(
            `${url}?apiKey=${API_KEY}&limit=${limit}&category=${category}&difficulty=${difficulty}`
          );
          if (!response.ok) {
            throw new Error("sorry guy, e no work");
          }
          const data = await response.json();
          setQuestionArray(data);
        } catch (error) {
          console.log(error.message);
        }
      }

      fetchQuestions();
    }
  }, [runNow, selectedCategory,selectedDifficulty, selectedLimit]);

  const onHomeClickHandler = () => {
    setRunNow(false);
    setCheckNow(false)
    setQuestionArray([]);
    setSelectedCategory("");
    setSelectedDifficulty("");
    setSelectedLimit("");
  };

  const compareResults=()=>{
    setCheckNow(prevValue=> !prevValue)
    setDisplayScore(true)
    
  }

  const closeResults = ()=>{
    onHomeClickHandler()
    setDisplayScore(false)

  }

  const actaulScoreHandler = (score)=>{
   console.log(`Final score: ${score}`);
   setFinalScore(score)
  }
  

  const beforeStart = (
    <div className={classes.before}>
      <p>Are you ready for the quiz?</p>
      <Choices
        selectedLimit={selectedLimit}
        selectedDifficulty={selectedDifficulty}
        selectedCategory={selectedCategory}
        onDifficultyChange={difficultyFunction}
        onCategoryChange={categoryFunction}
        onLimitChange={limitFunction}
      />
      <button disabled={!runWhen} onClick={onStartClickHandler}>
        Click here to start
      </button>
    </div>
  );



  const afterStart = (
    <div>
      {displayScore && <DisplayResults score={finalScore} onClose={closeResults} limit={selectedLimit}/>}
      <ul>
        {questionArray.map((item) => (
          <li key={item.id}>
            <p>{item.question}</p>
            <form>
              <label>
                <input
                  type="radio"
                  name={`question_${item.id}`}
                  value="answer_a"
                  checked={selectedAnswers[item.id] === "answer_a"}
                  onChange={() => onAnswerSelectHandler(item.id, "answer_a")}
                />
                A) {item.answers.answer_a}
              </label>
              <label>
                <input
                  type="radio"
                  name={`question_${item.id}`}
                  value="answer_b"
                  checked={selectedAnswers[item.id] === "answer_b"}
                  onChange={() => onAnswerSelectHandler(item.id, "answer_b")}
                />
                B) {item.answers.answer_b}
              </label>
              <label>
                <input
                  type="radio"
                  name={`question_${item.id}`}
                  value="answer_c"
                  checked={selectedAnswers[item.id] === "answer_c"}
                  onChange={() => onAnswerSelectHandler(item.id, "answer_c")}
                />
                C) {item.answers.answer_c}
              </label>
              <label>
                <input
                  type="radio"
                  name={`question_${item.id}`}
                  value="answer_d"
                  checked={selectedAnswers[item.id] === "answer_d"}
                  onChange={() => onAnswerSelectHandler(item.id, "answer_d")}
                />
                D) {item.answers.answer_d}
              </label>
            </form>
          </li>
        ))}
      </ul>
      <div>
        <button className={classes.homebtn}onClick={onHomeClickHandler}>Go back Home</button>
        <button className={classes.submitbtn} onClick={compareResults}>Submit</button>
      </div>
    </div>
  );
  return (
    <>
     
      {runNow ? afterStart : beforeStart}
      {runNow && <Results actualScore ={actaulScoreHandler} questionArray={questionArray} userSelectedAnswers={selectedAnswers} whenToCompare={checkNow}/>}
    </>
  );
};

export default QuizApi;

// onst apiUrl = 'https://quizapi.io/api/v1/questions';
// const apiKey = 'YOUR_API_KEY';
// const limit = 10;
// const category = 'Linux';
// const difficulty = 'easy';

// const queryString = `?apiKey=${apiKey}&limit=${limit}&category=${category}&difficulty=${difficulty}`;
// const urlWithParams = `${apiUrl}${queryString}`;

// questionArray.map(item=> item.answers.correctanswer)
