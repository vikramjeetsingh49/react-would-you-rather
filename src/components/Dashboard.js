import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import Questions from "./Questions";

class Dashboard extends Component {
  state = {
    showAnsweredQuestions: false,
  };

  handleChangeEvent = (value) => {
    this.setState(() => ({
      showAnsweredQuestions: value,
    }));
  };

  render() {
    const { showAnsweredQuestions } = this.state;
    const { authedUser, users, questions } = this.props;

    const answeredQuestions = Object.keys(users[authedUser].answers).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    const unansweredQuestions = Object.keys(questions)
      .filter((question) => !answeredQuestions.includes(question))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return (
      <div>
        <Container className="p-3">
          <Row className="dashboard-header">
            <ButtonGroup aria-label="Basic example">
              <Col>
                <Button
                  size="sm"
                  className={!showAnsweredQuestions ? "question-active" : ""}
                  variant="secondary"
                  onClick={(event) => this.handleChangeEvent(false)}
                >
                  Unanswered Questions
                </Button>
              </Col>
              <Col>
                <Button
                  size="sm"
                  className={showAnsweredQuestions ? "question-active" : ""}
                  variant="secondary"
                  onClick={(event) => this.handleChangeEvent(true)}
                >
                  Answered Questions
                </Button>
              </Col>
            </ButtonGroup>
          </Row>
          <Row>
            {!showAnsweredQuestions
              ? unansweredQuestions.map((id) => (
                  <Col xs={6} md={6} key={id}>
                    <Questions id={id} />
                  </Col>
                ))
              : answeredQuestions.map((id) => (
                  <Col xs={6} md={6} key={id}>
                    <Questions id={id} />
                  </Col>
                ))}
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard);
