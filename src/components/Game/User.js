import React from "react";
import * as firebase from "firebase";
import Buzzer from "./User/Buzzer";
import Teams from "./User/Teams";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      game: this.props.game,
      teams: [],
      buzzed: false,
    };

    this.joinTeam = this.joinTeam.bind(this);
  }

  componentDidMount() {
    this.snapshotGame();
    this.snapshotGameUsers();
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
      .doc(this.state.user.id)
      .onSnapshot((user) => {
        this.setState({ user });
        if (!user.data().buzzed) this.setState({ buzzed: false });
        else this.setState({ buzzed: true });
      });
  }

  snapshotGameTeams() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("teams")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const team = change.doc;
          if (change.type === "added") {
            this.setState({ teams: [...this.state.teams, team] });
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

  pressBuzzer() {
    this.setState({ buzzed: true });
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("questions")
      .doc(this.state.game.data().currentQuestion)
      .update({
        buzz: firebase.firestore.FieldValue.arrayUnion({
          idUser: this.state.user.id,
          name: this.state.user.data().name,
          createdAt: new Date(),
        }),
      })
      .then(() => {
        firebase
          .firestore()
          .collection("games")
          .doc(this.state.game.id)
          .collection("users")
          .doc(this.state.user.id)
          .update({ buzzed: true });
      });
  }

  joinTeam(team) {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("users")
      .doc(this.state.user.id)
      .update({ team: team.data() });
  }

  render() {
    return (
      <div>
        <h2>{this.state.user.data().name}</h2>
        <Buzzer press={() => this.pressBuzzer()} buzzed={this.state.buzzed} />
        <Teams teams={this.state.teams} user={this.state.user} joinTeam={this.joinTeam} />
      </div>
    );
  }
}

export default User;
