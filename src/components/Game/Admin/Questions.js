import React from "react";
import Question from "./Question";

const Questions = ({ questions }) => (
  <div className="mt-3">
    {questions.map((question) => (
      <Question key={question.id} question={question} />
    ))}
  </div>
);

export default Questions;
