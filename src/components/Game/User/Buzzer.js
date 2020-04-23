import React from "react";

const Buzzer = ({ press, buzzed, buzzerColor }) => {
  const buzzer = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    border: "none",
    background: `${buzzerColor}`,
    color: "white",
    boxShadow: "0px 0px 22px 11px grey",
    margin: "auto",
    marginTop: "1rem",
  };

  return (
    <button
      onClick={press}
      disabled={buzzed}
      className={"d-block"}
      style={buzzer}
    >
      <b>{buzzed ? "Locked" : "Buzzer"}</b>
    </button>
  );
};

export default Buzzer;
