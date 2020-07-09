import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Navigation from "./NavBar";
import QuestionPage from "./QuestionPage";
import ErrorPage from "./ErrorPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Navigation />
          {this.props.signIn === true ? (
            <SignIn />
          ) : (
            <div>
              <Route path="/" exact component={Dashboard} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/question/:id" component={QuestionPage} />
              <Route path="/leaderboard" exact component={Leaderboard} />
              <Route path="/error" exact component={ErrorPage} />
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    signIn: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
