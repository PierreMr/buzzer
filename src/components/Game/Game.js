import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as firebase from "firebase";
import Admin from "./Admin";
import User from "./User";
import loadingStyle from "./Game.css";

const Game = () => {
  let { gameId, userId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

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

          game.ref
            .collection("questions")
            .orderBy("createdAt", "desc")
            .limit(1)
            .get()
            .then((question) => {
              if (!question.empty) {
                setCurrentQuestion(question.docs[0]);
              }
            });
        } else {
          console.log("Game ID n'existe pas.");
        }
      });
  }

  if (!loaded || !user || !currentQuestion) {
    return renderLoading();
  } else {
    if (user.data().admin) {
      return renderAdmin(game, user);
    } else {
      return renderUser(game, user, currentQuestion);
    }
  }
};

function renderLoading() {
  return (
    <div className="text-center m-5">
      <div className="loadingio-spinner-ball-ufhu0o4vrnd">
        <div className="ldio-vlx5gq8g56r">
          <div></div>
        </div>
      </div>
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

function renderUser(game, user, currentQuestion) {
  return (
    <div className="text-center m-5">
      <User game={game} user={user} currentQuestion={currentQuestion} />
    </div>
  );
}

export default Game;
