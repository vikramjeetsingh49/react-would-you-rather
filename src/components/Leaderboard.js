import React from "react";
import { connect } from "react-redux";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

const Leaderboard = (props) => {
  return (
    <Container>
      {props.sortedUsers.map((user) => (
        <Card key={user.id} className="leaderboard-card">
          <Card.Body>
            <Row>
              <Col>
                <img
                  src={user.avatarURL}
                  alt="thumbnail.jpg"
                  className="leaderboard-avatar"
                />
              </Col>
              <Col xs={6} className="leaderboard-middle">
                <Card.Title>{user.name}</Card.Title>
                <p>
                  Answered Questions:{" "}
                  <span style={{ marginLeft: "80px" }}>
                    {Object.keys(user.answers).length}
                  </span>
                </p>
                <p
                  style={{
                    borderTop: "2px  solid #dedede8c",
                    paddingTop: " 10px",
                  }}
                >
                  Created Questions:{" "}
                  <span style={{ marginLeft: "95px" }}>
                    {user.questions.length}
                  </span>
                </p>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="center">Score</Card.Header>
                  <Card.Body>
                    <h2 className="center">
                      <Badge pill variant="dark">
                        {Object.keys(user.answers).length +
                          user.questions.length}
                      </Badge>
                    </h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

function mapStateToProps({ users }) {
  // Users sorted in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked
  const sortedUsers = Object.values(users).sort((a, b) => {
    return (
      Object.keys(b.answers).length +
      b.questions.length -
      Object.keys(a.answers).length +
      a.questions.length
    );
  });
  return {
    sortedUsers,
  };
}

export default connect(mapStateToProps)(Leaderboard);
