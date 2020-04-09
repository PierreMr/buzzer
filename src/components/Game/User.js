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
      buzzed: false,
    };
  }

  componentDidMount() {
    this.snapshotGame();
    this.snapshotGameUsers();
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

  render() {
    return (
      <div>
        <h2>{this.state.user.data().name}</h2>
        <Buzzer press={() => this.pressBuzzer()} buzzed={this.state.buzzed} />
        <Teams teams={this.state.game.data().teams} />
      </div>
    );
  }
}

export default User;
