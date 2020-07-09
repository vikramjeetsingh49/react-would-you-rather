import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import {
  Container,
  Card,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleChange = (event, option) => {
    event.preventDefault();
    const text = event.target.value;

    this.setState({
      [option]: text,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState({
      optionOne: "",
      optionTwo: "",
      toHome: true,
    });
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Container className="p-3 card-container">
          <Card>
            <Card.Header className="center"> Create New Question</Card.Header>

            <Card.Body>
              <p>Complete the question: </p>
              <Card.Title>Would you rather...</Card.Title>
              <InputGroup
                className=""
                onChange={(event) => this.handleChange(event, "optionOne")}
              >
                <FormControl
                  placeholder="Option 1"
                  aria-label="Optin 1"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <p className="center" style={{ padding: 10 }}>
                OR
              </p>
              <InputGroup
                className="mb-3"
                onChange={(event) => this.handleChange(event, "optionTwo")}
              >
                <FormControl
                  placeholder="Option 2"
                  aria-label="Optin 2"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <Button
                className="footer-btn"
                size="sm"
                disabled={!optionOne || !optionTwo}
                onClick={(event) => this.handleSubmit(event)}
                block
              >
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default connect()(NewQuestion);
