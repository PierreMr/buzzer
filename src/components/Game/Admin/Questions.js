import React from "react";
import Question from "./Question";

const Questions = ({ questions }) => (
  <div className="mt-3">
    {questions.map((question, iQuestion) => (
      <Question key={question.id} question={question} iQuestion={iQuestion} />
    ))}
  </div>
);

export default Questions;
