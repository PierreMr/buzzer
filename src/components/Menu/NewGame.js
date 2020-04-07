import React from "react";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

const NewGame = () => {
  const db = firebase.firestore();
  const history = useHistory();

  function createGame() {
    db.collection("games")
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((game) => {
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
      });
  }

  return <button onClick={() => createGame()}>Créer une partie</button>;
};

export default NewGame;
