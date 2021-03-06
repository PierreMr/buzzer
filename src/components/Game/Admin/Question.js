import React from "react";
import moment from "moment";

const Question = ({ question, iQuestion }) => (
  <div key={question.id} className="mt-3">
    <h4>Question {iQuestion === 0 ? " en cours" : ""} </h4>
    <ul className={"list-group list-group-flush mb-5 row"}>
      {question
        .data()
        .buzz.sort((a, b) => a.createdAt - b.createdAt)
        .map((buzz, iBuzz) => {
          if (buzz.name === "delimiter") {
            return <hr key={iBuzz} />;
          } else {
            let liClassName = "";
            if (buzz.dataUser.team) {
              if (buzz.dataUser.team.name === "Ketchup") {
                liClassName += " list-group-item-danger";
              } else if (buzz.dataUser.team.name === "Mayo") {
                liClassName += " list-group-item-warning";
              }
            }

            return (
              <li
                key={iBuzz}
                className={"list-group-item" + liClassName + " col-6 m-auto"}
              >
                {buzz.dataUser.name}
                {/* <span className="float-right">
                {iBuzz !== 0
                  ? moment(buzz.createdAt.toDate()).diff(
                      question.data().buzz[0].createdAt.toDate(),
                      "milliseconds"
                    ) /
                      1000 +
                    "s"
                  : ""}
              </span> */}
              </li>
            );
          }
        })}
    </ul>
  </div>
);

export default Question;
