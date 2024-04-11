// const Results = (props) => {
//   async function getAllCorrectAnswers(){
//     const correctAnswers = {};

//     props.questionArray.forEach((question) => {
//       // Assuming correct answers are stored in the correct_answers object
//       for (const key in question.correct_answers) {
//         if (question.correct_answers[key] === "true") {
//           correctAnswers[question.id] = key.replace("_correct", "");
//           break; // Assuming only one correct answer per question
//         }
//       }

//       console.log(correctAnswers);
//     });
//   };

//   getAllCorrectAnswers();

// };

// export default Results;

// const Results = (props) => {
//   async function getAllCorrectAnswers() {
//     const correctAnswers = {};

//     props.questionArray.forEach((question) => {
//       // Assuming correct answers are stored in the correct_answers object
//       for (const key in question.correct_answers) {
//         if (question.correct_answers[key] === "true") {
//           correctAnswers[question.id] = key.replace("_correct", "");
//           break; // Assuming only one correct answer per question
//         }
//       }
//     });

//     // Log correctAnswers outside the loop
//     console.log(correctAnswers);
//   }

//   getAllCorrectAnswers();
// };

// export default Results;
import React, { useEffect, useState } from "react";



const Results = (props) => {
  const { questionArray, userSelectedAnswers, whenToCompare, actualScore } = props;
  

  useEffect(() => {
    async function compareAnswers() {
      const correctAnswers = {};

      questionArray.forEach((question) => {
        for (const key in question.correct_answers) {
          if (question.correct_answers[key] === "true") {
            correctAnswers[question.id] = key.replace("_correct", "");
            break; // Assuming only one correct answer per question
          }
        }
      });

      // Log correctAnswers for verification
      console.log("Correct Answers:", correctAnswers);

      // Compare correctAnswers with userSelectedAnswers
      if (whenToCompare) {
        const results = questionArray.map((question) => {
          const isCorrect =
            userSelectedAnswers[question.id] === correctAnswers[question.id];
          return {
            questionId: question.id,
            isCorrect,
          };
        });

        //Log the results
        let score = 0
        console.log("Results:", results);
        results.map((item) => {
          
          if (item.isCorrect === true) {
            score++
          }
          
        });
        console.log(`original : ${score}`);
        actualScore(score)
      }
    }

    compareAnswers();
  }, [questionArray, whenToCompare]);

  return ;
};

export default Results;
