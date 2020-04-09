import React from "react";
import * as firebase from "firebase";
import Users from "./Admin/Users";
import Questions from "./Admin/Questions";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      game: this.props.game,
      users: [],
      questions: [],
      teams: [],
    };
  }

  componentDidMount() {
    this.snapshotGame();
    this.snapshotGameUsers();
    this.snapshotGameQuestions();
    this.snapshotGameTeams();
  }

  snapshotGame() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .onSnapshot((game) => {
        this.setState({ game });
      });
  }

  snapshotGameUsers() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("users")
      .where("role", "==", "user")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const user = change.doc;
          if (change.type === "added") {
            this.setState({ users: [...this.state.users, user] });
          }
          if (change.type === "modified") {
            let users = this.state.users;
            const index = this.state.users.findIndex(
              (element) => element.id === user.id
            );
            users[index] = user;
            this.setState({ users });
          }
          if (change.type === "removed") {
          }
        });
      });
  }

  snapshotGameQuestions() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("questions")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const question = change.doc;
          if (change.type === "added") {
            this.setState({ questions: [question, ...this.state.questions] });
          }
          if (change.type === "modified") {
            let questions = this.state.questions;
            const index = this.state.questions.findIndex(
              (element) => element.id === question.id
            );
            questions[index] = question;
            this.setState({ questions });
          }
          if (change.type === "removed") {
          }
        });
      });
  }

  snapshotGameTeams() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("teams")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const team = change.doc;
          if (change.type === "added") {
            this.setState({ teams: [team, ...this.state.teams] });
          }
          if (change.type === "modified") {
            let teams = this.state.teams;
            const index = this.state.teams.findIndex(
              (element) => element.id === team.id
            );
            teams[index] = team;
            this.setState({ teams });
          }
          if (change.type === "removed") {
          }
        });
      });
  }

  nextQuestion() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("questions")
      .add({
        buzz: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((question) => {
        firebase
          .firestore()
          .collection("games")
          .doc(this.state.game.id)
          .update({ currentQuestion: question.id })
          .then(() => {
            firebase
              .firestore()
              .collection("games")
              .doc(this.state.game.id)
              .collection("users")
              .get()
              .then((users) => {
                users.forEach((user) => {
                  user.ref.update({
                    buzzed: false,
                  });
                });
              });
          });
      });
  }

  resetBuzzers() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("users")
      .get()
      .then((users) => {
        users.forEach((user) => {
          user.ref.update({
            buzzed: false,
          });
        });
      });

    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("questions")
      .doc(this.state.game.data().currentQuestion)
      .update({
        buzz: firebase.firestore.FieldValue.arrayUnion({
          name: "delimiter",
          createdAt: new Date(),
        }),
      });
  }

  render() {
    return (
      <div>
        <h2>{this.state.user.data().name}</h2>
        <h2>ID de la partie : {this.state.game.id}</h2>
        <p>Indiquer cet ID aux participants.</p>

        <Users users={this.state.users} teams={this.state.teams} />

        <button onClick={() => this.nextQuestion()}>Question suivante</button>
        <button onClick={() => this.resetBuzzers()}>Reset Buzzers</button>

        <Questions questions={this.state.questions} />
      </div>
    );
  }
}

export default Admin;
