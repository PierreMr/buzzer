import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as firebase from "firebase";
import Admin from "./Admin";
import User from "./User";

const Game = () => {
  let { gameId, userId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    firebase
      .firestore()
      .collection("games")
      .doc(gameId)
      .get()
      .then((game) => {
        if (game.exists) {
          setGame(game);
          game.ref
            .collection("users")
            .doc(userId)
            .get()
            .then((user) => {
              if (user.exists) {
                setUser(user);
                setLoaded(true);
              } else {
                console.log("User ID n'existe pas.");
              }
            });
        } else {
          console.log("Game ID n'existe pas.");
        }
      });
  }

  if (!loaded && !user) {
    return renderLoading();
  } else {
    if (user.data().admin) {
      return renderAdmin(game, user);
    } else {
      return renderUser(game, user);
    }
  }
};

function renderLoading() {
  return (
    <div className="text-center m-5">
      <h2>Loading...</h2>
    </div>
  );
}

function renderAdmin(game, user) {
  return (
    <div className="text-center m-5">
      <Admin game={game} user={user} />
    </div>
  );
}

function renderUser(game, user) {
  return (
    <div className="text-center m-5">
      <User game={game} user={user} />
    </div>
  );
}

export default Game;
