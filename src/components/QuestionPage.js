import React from "react";
import { connect } from "react-redux";
import Questions from "./Questions";

const QuestionPage = (props) => {
  return <Questions id={props.match.params.id} questionSelected />;
};

export default connect()(QuestionPage);
