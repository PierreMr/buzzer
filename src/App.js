import React from "react";
import "./App.css";
import firebaseConf from "./config/firestoreConfig";
import * as firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Game from "./components/Game/Game";

function App() {
  // Initialize Firebase
  firebase.initializeApp(firebaseConf);

  return (
    <Router>
      <Switch>
        <Route path="/game/:gameId/:userId">
          <Game />
        </Route>
        <Route path="/">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
