import React from "react";
import "./style/App.sass";
import firebaseConf from "./config/firestoreConfig";
import * as firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Game from "./components/Game/Game";
import Header from "./components/Header";

function App() {
  // Initialize Firebase
  firebase.initializeApp(firebaseConf);

  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/game/:gameId/:userId">
            <Game />
          </Route>
          <Route path="/">
            <Menu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
