import React from "react";

const buzzer = {
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  margin: "auto",
  border: "5px solid #b50b0b",
  background: "red",
  color: "white"
};


const Buzzer = ({ press, buzzed }) => (
  <button
    onClick={press}
    disabled={buzzed}
    className={"d-block m-auto"}
    style={buzzer}
  >
    {buzzed ? "Locked" : "Buzzer"}
  </button>
);

export default Buzzer;
