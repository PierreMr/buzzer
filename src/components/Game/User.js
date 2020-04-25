import React from "react";
import * as firebase from "firebase";
import Buzzer from "./User/Buzzer";
import Teams from "./User/Teams";
import Question from "./Admin/Question";
import Users from "./User/Users";
import { SketchPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { ColorLuminance } from "../../utils";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      game: this.props.game,
      users: [],
      teams: [],
      buzzed: false,
      currentQuestion: this.props.currentQuestion,
      buzzerColor: "#ec2138",
      buzzerShadowColor: ColorLuminance("#ec2138", -0.2),
      showColorPicker: false,
    };

    this.joinTeam = this.joinTeam.bind(this);
  }

  componentDidMount() {
    this.snapshotGame();
    this.snapshotGameUser();
    this.snapshotGameUsers();
    this.snapshotGameTeams();
    this.snapshotGameQuestions();
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

  snapshotGameUser() {
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

  snapshotGameQuestions() {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("questions")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const question = change.doc;
          if (change.type === "added") {
            this.setState({ currentQuestion: question });
          }
          if (change.type === "modified") {
            this.setState({ currentQuestion: question });
          }
          if (change.type === "removed") {
          }
        });
      });
  }

  pressBuzzer() {
    const audio = new Audio(`${process.env.PUBLIC_URL}/aie.mp3`);
    audio.play();
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
          dataUser: this.state.user.data(),
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

        firebase
          .firestore()
          .collection("games")
          .doc(this.state.game.id)
          .collection("users")
          .get()
          .then((users) => {
            users.forEach((user) => {
              user.ref.update({ buzzed: true });
            });
          });
      });
  }

  joinTeam(team) {
    firebase
      .firestore()
      .collection("games")
      .doc(this.state.game.id)
      .collection("users")
      .doc(this.state.user.id)
      .update({ team: team.data(), idTeam: team.id });
  }

  changeBuzzerColor = (color) => {
    this.setState({ buzzerColor: color.hex });
    this.setState({ buzzerShadowColor: ColorLuminance(color.hex, -0.2) });
  };

  toggleColorPicker = () => {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  };

  render() {
    if (this.state.user.data().disabled) {
      return (
        <div>
          <h2>{this.state.user.data().name}</h2>
          <h3 className="m-5 text-danger">
            Le Grand Miam ne vous autorise pas à jouer.
          </h3>
          <h3 className="m-5 text-danger">Ciao.</h3>
        </div>
      );
    }

    return (
      <div>
        <h2>{this.state.user.data().name}</h2>
        <div className="row">
          <div className="col-6 m-auto">
            <Buzzer
              press={() => this.pressBuzzer()}
              buzzed={this.state.buzzed}
              buzzerColor={this.state.buzzerColor}
              buzzerShadowColor={this.state.buzzerShadowColor}
            />
            <button
              className={`btn btn-sm ${
                this.state.showColorPicker
                  ? "btn-outline-primary"
                  : "btn-primary"
              } mt-3`}
              onClick={() => this.toggleColorPicker()}
              style={{ marginLeft: "11rem" }}
            >
              <FontAwesomeIcon icon={faPalette} />
            </button>
            {this.state.showColorPicker ? (
              <div className="d-flex justify-content-center mt-3">
                <SketchPicker
                  color={this.state.buzzerColor}
                  onChangeComplete={this.changeBuzzerColor}
                />
              </div>
            ) : null}
          </div>
        </div>
        <Teams
          teams={this.state.teams}
          user={this.state.user}
          joinTeam={this.joinTeam}
        />
        <Question question={this.state.currentQuestion} iQuestion={0} />
        <Users
          users={this.state.users}
          teams={this.state.teams}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default User;
