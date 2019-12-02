import React, { Component } from "react";
import axios from "axios";

export default class Faq extends Component {
  state = {
    faqs: [],
    isLoaded: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/faq")
      .then(res => {
        this.setState({
          faqs: res.data,
          isLoaded: true
        });
      })
      .catch(err => console.log(err));
  }
  displayFAQ = () => {
    let sortedFaqs = this.state.faqs.sort((a, b) => {
      return a - b;
    });
    return sortedFaqs.map((post, i) => {
      return (
        <div key={i}>
          <li onClick={this.logThis} className="question">
            <p className="question-tag">{post.title.rendered}</p>
          </li>
          <p
            id={`faq-${i}`}
            className="answer deactive"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      );
    });
  };
  logThis = e => {
    
    if (e.target.parentNode.parentNode.childNodes[1].classList[1] === "deactive") {
      return e.target.parentNode.parentNode.childNodes[1].setAttribute(
        "class",
        "answer active"
      );
    } else if ((e.target.parentNode.parentNode.childNodes[1].classList[1] === "active")) {
     
      return e.target.parentNode.parentNode.childNodes[1].setAttribute(
        "class",
        "answer  deactive"
      );
    }
  };
  render() {
    if (this.state.isLoaded) {
      return (
        <div className="container">
          <div className="news-parent-container">{this.displayFAQ()}</div>
        </div>
      );
    }
    return null;
  }
}