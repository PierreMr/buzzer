import React from "react";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

const NewGame = () => {
  const db = firebase.firestore();
  const history = useHistory();

  const teams = [
    {
      name: "Ketchup",
      color: "#9A382D",
    },
    {
      name: "Mayo",
      color: "#FFDF00",
    },
  ];

  function createGame() {
    db.collection("games")
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((game) => {
        addGameAdmin(game);
        addGameFirstQuestion(game);
        addGameTeams(game, teams);
      });
  }

  function addGameAdmin(game) {
    game
      .collection("users")
      .add({
        name: "Grand Miam",
        role: "admin",
        admin: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((user) => {
        history.push("/game/" + game.id + "/" + user.id);
      });
  }

  function addGameFirstQuestion(game) {
    game
      .collection("questions")
      .add({
        buzz: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((question) => {
        game.update({
          currentQuestion: question.id,
        });
      });
  }

  function addGameTeams(game, teams) {
    teams.forEach((team) => {
      game
        .collection("teams")
        .add({
          name: team.name,
          color: team.color,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((newTeam) => {
          game.update({
            teams: firebase.firestore.FieldValue.arrayUnion({
              id: newTeam.id,
              name: team.name,
              color: team.color,
              createdAt: new Date(),
            }),
          });
        });
    });
  }

  return (
    <button onClick={() => createGame()} className={"btn btn-primary"}>
      Créer une partie
    </button>
  );
};

export default NewGame;
