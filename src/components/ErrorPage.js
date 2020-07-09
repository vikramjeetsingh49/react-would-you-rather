import React from "react";

import { Container, Jumbotron } from "react-bootstrap";

const ErrorPage = () => (
  <div>
    <Container conatiner="p-3">
      <Jumbotron className="center">
        <h2>Error / 404</h2>
        <p>The page you're looking for can't be found</p>
      </Jumbotron>
    </Container>
  </div>
);

export default ErrorPage;
