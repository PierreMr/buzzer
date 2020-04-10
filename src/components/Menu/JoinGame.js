import React from "react";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

const JoinGame = () => {
  const db = firebase.firestore();
  const history = useHistory();
  let inputGameId = "";
  let inputUserName = "";

  function joinGame(joinForm) {
    db.collection("games")
      .doc(joinForm.gameId)
      .get()
      .then((game) => {
        if (game.exists) {
          game.ref
            .collection("users")
            .add({
              name: joinForm.userName,
              role: "user",
              buzzed: false,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((user) => {
              history.push("/game/" + game.id + "/" + user.id);
            });
        } else {
          console.log("L'ID n'existe pas.");
        }
      });
  }

  return (
    <form
      className="mt-5 pt-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputGameId.value.trim() || !inputUserName.value.trim()) {
          console.log("Remplir tous les champs.");
          return;
        }
        joinGame({
          gameId: inputGameId.value,
          userName: inputUserName.value,
        });
      }}
    >
      <div className="form-group row">
        <input
          type="text"
          className="form-control col-6 m-auto"
          ref={(node) => (inputGameId = node)}
          placeholder="ID Game"
        />
      </div>
      <div className="form-group row">
        <input
          type="text"
          className="form-control col-6 m-auto"
          ref={(node) => (inputUserName = node)}
          placeholder="Nom"
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Rejoindre" />
    </form>
  );
};

export default JoinGame;
