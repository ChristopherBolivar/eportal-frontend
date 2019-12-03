import React, { Component, Fragment } from "react";
import axios from "axios";

export default class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/surveys")
      .then(res => {
        this.setState({
          surveys: res.data,
          isLoaded: true
        });
      })
      .catch(err => console.log("Error:", err));
  }
  renderSurveys = () => {
    return this.state.surveys.map((survey, i) => {
      return (
        <div className="survey" key={i}>
          <p dangerouslySetInnerHTML={{ __html: survey.content.rendered }} />
          <h5>{survey.title.rendered}</h5>
        </div>
      );
    });
  };
  render() {
    if (this.state.isLoaded) {
      return (
        <Fragment>
          <h1>Recent Surveys</h1>
          <div>{this.renderSurveys()}</div>
        </Fragment>
      );
    }
    return null;
  }
}
