import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  ProgressBar,
} from "react-bootstrap";
import ErrorPage from "./ErrorPage";

class Questions extends Component {
  state = {
    selected: "",
  };

  handleOptionChange = (value) => {
    this.setState(() => ({
      selected: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { selected } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestionAnswer(id, selected));
  };

  render() {
    const { selected } = this.state;
    const { question, authedUser, users, author, id, questionSelected } = this.props;

    if (!question) return <ErrorPage />;

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionOnePercentage = +((question.optionOne.votes.length / totalVotes) * 100 ).toFixed(2);
    const optionTwoPercentage = +((question.optionTwo.votes.length / totalVotes) * 100 ).toFixed(2);

    return (
      <Container className="question-container">
        <Card className="dashboard-card">
          <Card.Header> {author.name} asks</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={4} md={4}>
                <img
                  src={author.avatarURL}
                  alt="avatar"
                  className="dashboard-avatar"
                />
              </Col>
              {questionSelected ? (
                users[authedUser].answers[id] ? (
                  <Col xs={8} md={8}>
                    <Card.Title className="center">Results: </Card.Title>
                    <div
                      className={
                        users[authedUser].answers[id] === "optionOne"
                          ? "question-box-filled"
                          : "question-box"
                      }
                    >
                      Would you rather {question.optionOne.text}
                      <ProgressBar
                        variant="danger"
                        now={optionOnePercentage}
                        label={`${optionOnePercentage}%`}
                      />
                      <p className="center">
                        <strong>
                          {question.optionOne.votes.length} out of {totalVotes} Votes
                        </strong>
                      </p>
                    </div>
                    <div
                      className={
                        users[authedUser].answers[id] === "optionTwo"
                          ? "question-box-filled"
                          : "question-box"
                      }
                    >
                      Would you rather {question.optionTwo.text}
                      <ProgressBar
                        variant="danger"
                        now={optionTwoPercentage}
                        label={`${optionTwoPercentage}%`}
                      />
                      <p className="center">
                        <strong>
                          {question.optionTwo.votes.length} out of {totalVotes} Votes
                        </strong>
                      </p>
                    </div>
                  </Col>
                ) : (
                  <Col xs={8} md={8}>
                    <Card.Title>Would you rather ... </Card.Title>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Check
                        type="radio"
                        id="radio"
                        label={question.optionOne.text}
                        checked={selected === "optionOne"}
                        onChange={(event) =>
                          this.handleOptionChange("optionOne")
                        }
                      />
                      <Form.Check
                        type="radio"
                        id="radio"
                        label={question.optionTwo.text}
                        checked={selected === "optionTwo"}
                        onChange={(event) =>
                          this.handleOptionChange("optionTwo")
                        }
                      />
                      <Button size="sm" variant="secondary" block type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Col>
                )
              ) : (
                <Col xs={8} md={8}>
                  <Card.Title>Would you rather ... </Card.Title>
                  <div className="center" style={{ fontWeight: "bold" }}>
                    {question.optionOne.text}
                  </div>
                  <p className="center"> Or </p>
                  <div className="center" style={{ fontWeight: "bold" }}>
                    {question.optionTwo.text}
                  </div>
                  <Link to={`/question/${id}`}>
                    <Button size="sm" variant="secondary" block>
                      View Poll
                    </Button>
                  </Link>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = question ? users[question.author] : "";

  return {
    authedUser,
    users,
    questions,
    question,
    author,
  };
}

export default withRouter(connect(mapStateToProps)(Questions));
