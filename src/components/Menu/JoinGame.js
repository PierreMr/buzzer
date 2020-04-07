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
      <label>
        ID Game :
        <input type="text" ref={(node) => (inputGameId = node)} />
      </label>
      <label>
        Nom :
        <input type="text" ref={(node) => (inputUserName = node)} />
      </label>
      <input type="submit" value="Rejoindre" />
    </form>
  );
};

export default JoinGame;
