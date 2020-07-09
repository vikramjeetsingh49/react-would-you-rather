import React, { Component, Fragment } from "react";
import logo from "../icons/logo.png";
import person from "../icons/person.png";
import { connect } from "react-redux";
import { Button, Navbar, Nav, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Navigation extends Component {
  logout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };
  render() {
    const { authedUser, users } = this.props;

    return (
      <Navbar bg="dark" variant="dark">
        {authedUser !== null ? (
          <Fragment>
            <Navbar.Brand>
              <img src={logo} className="nav-logo" alt="logo" />
            </Navbar.Brand>
            <Nav className="mr-auto">
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/add" activeClassName="active">
                New Question
              </NavLink>
              <NavLink to="/leaderboard" activeClassName="active">
                LeaderBoard
              </NavLink>
            </Nav>
            <Form inline>
              <h5 className="nav-user">
                Hello, {authedUser ? users[authedUser].name : ""}
              </h5>
              <img
                src={authedUser ? users[authedUser].avatarURL : person}
                alt="avatar"
                className="nav-avatar"
              />
              <NavLink to="/">
                <Button
                  size="sm"
                  onClick={this.logout}
                  variant="outline-danger"
                >
                  Logout
                </Button>
              </NavLink>
            </Form>
          </Fragment>
        ) : (
          ""
        )}
      </Navbar>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Navigation);
