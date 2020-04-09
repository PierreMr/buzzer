import React from "react";

const Question = ({ question }) => (
  <div key={question.id}>
    <h4>Question {question.id}</h4>
    <ul className={"list-group list-group-flush mb-5"}>
      {question.data().buzz.map((buzz, iBuzz) => {
        if (buzz.name === "delimiter") {
          return <hr key={iBuzz} />;
        } else {
          return (
            <li key={iBuzz} className={"list-group-item"}>
              {buzz.name}
            </li>
          );
        }
      })}
    </ul>
  </div>
);

export default Question;
