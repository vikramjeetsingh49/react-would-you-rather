import React, { Component } from "react";
import logo from "../icons/logo.png";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Card, Row, Col, Dropdown, Button } from "react-bootstrap";
import { setAuthedUser } from "../actions/authedUser";

class SignIn extends Component {
  state = {
    selectedUser: null,
    toHome: false,
  };

  handleDropdownChange = (userId) => {
    this.setState({
      selectedUser: userId,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { selectedUser } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(selectedUser));

    this.setState(() => ({
      selectedUser: null,
      toHome: true,
    }));
  };

  render() {
    const { users } = this.props;
    const { selectedUser, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Container className="app-container">
          <img src={logo} className="app-logo" alt="logo" />
          <Card className="card-container">
            <Card.Header className="center">
              Choose a user to continue
            </Card.Header>
            <Card.Body variant="success">
              <Card.Title className="center card-title"> Sign In </Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
            <Row>
              <Col xs={6} md={3}></Col>
              <Col xs={6} md={3}>
                <Dropdown onSelect={this.handleDropdownChange}>
                  <Dropdown.Toggle id="dropdown-secondary" variant="secondary">
                    {selectedUser !== null ? selectedUser : "Select User"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {Object.keys(users).map(function (index) {
                      return (
                        <Dropdown.Item key={index} eventKey={users[index].id}>
                          <img
                            src={users[index].avatarURL}
                            alt="avatar"
                            className="avatar"
                          />
                          {users[index].name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Card.Footer>
              <Button
                className="footer-btn"
                size="sm"
                disabled={selectedUser === null}
                onClick={(e) => this.handleLogin(e)}
                block
              >
                Login
              </Button>
            </Card.Footer>
          </Card>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(SignIn));
