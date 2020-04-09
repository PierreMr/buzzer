import React from "react";
import * as firebase from "firebase";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            game: this.props.game,
            users: [],
            questions: [],
        };
    }

    componentDidMount() {
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
                        console.log("New user: ", change.doc.data());
                        this.setState({users: [...this.state.users, user]});
                    }
                    if (change.type === "modified") {
                        console.log("Modified user: ", change.doc.data());
                        let users = this.state.users;
                        const index = this.state.users.findIndex(
                            (element) => element.id === user.id
                        );
                        users[index] = user;
                        this.setState({users});
                    }
                    if (change.type === "removed") {
                        console.log("Removed user: ", change.doc.data());
                    }
                });
            });

        firebase
            .firestore()
            .collection("games")
            .doc(this.state.game.id)
            .collection("questions")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const question = change.doc;
                    if (change.type === "added") {
                        console.log("New question: ", change.doc.data());
                        this.setState({questions: [question, ...this.state.questions]});
                    }
                    if (change.type === "modified") {
                        console.log("Modified question: ", change.doc.data());
                        let questions = this.state.questions;
                        const index = this.state.questions.findIndex(
                            (element) => element.id === question.id
                        );
                        questions[index] = question;
                        this.setState({questions});
                    }
                    if (change.type === "removed") {
                        console.log("Removed question: ", change.doc.data());
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
                    .update({currentQuestion: question.id})
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
                    id: `delimiter_${[...Array(10)].map(() => Math.random().toString(36)[2]).join('')}`,
                    name: "delimiter",
                    createdAt: new Date(),
                }),
            })
            .then((res) => { console.log(res) });
    }

    render() {
        return (
            <div>
                <h2>{this.state.user.data().name}</h2>
                <h2>ID de la partie : {this.state.game.id}</h2>
                <p>Indiquer le aux participants.</p>
                <ul>
                    {this.state.users.map((user) => {
                        return <li key={user.id}>{user.data().name}</li>;
                    })}
                </ul>
                <button onClick={() => this.nextQuestion()}>Question suivante</button>
                <button onClick={() => this.resetBuzzers()}>Reset Buzzers</button>
                <div>
                    {this.state.questions.map((question) => {
                        return (
                            <div key={question.id}>
                                <h4>Question {question.id}</h4>
                                <ul className={"list-group list-group-flush mb-5"}>
                                    {
                                        question.data().buzz.map((buzz) => {
                                            if(buzz.name === "delimiter") {
                                                return <hr />;
                                            } else {
                                                return <li key={buzz.id} className={"list-group-item"}>{buzz.name}</li>;
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Admin;
