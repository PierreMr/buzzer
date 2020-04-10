import React from "react";

const buzzer = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  margin: "auto",
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
