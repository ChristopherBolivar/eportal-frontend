import React, { Component } from "react";

import PonderingPeople from '../img/people-pondering.png';

export default class Faq extends Component {
  state = {
    faqs: [],
    isLoaded: false
  };
  componentDidMount() {
    console.log(this.props.faqs)
    this.setState({
      faqs: this.props.faqs,
      isLoaded: true
    });
  }
  displayFAQ = () => {
    let sortedFaqs = [...this.state.faqs]
    return sortedFaqs.map((post, i) => {
      return (
          <div className="faq-div" key={i}>
          <li onClick={this.logThis} className="question">
      <p className="question-tag">{post.acf.question}</p>
          </li>
          <p
            id={`faq-${i}`}
            className="answer deactive"
          >{post.acf.answer}
            </p>
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
     
      return (e.target.parentNode.parentNode.childNodes[1].setAttribute(
        "class",
        "answer  deactive"
      )
      )
    }
  };
  render() {
    if (this.state.faqs) {
      return (
        <div className="container-fluid faqs">
          <div className="row faq-row">
          <div className="container da-faqs col-12 col-sm-6">
            <h3 className="headline">Frequently Asked Questions</h3>
            {this.displayFAQ()}
            </div>
          <div className="col-12 col-sm-6 faq-right-div p-1">
            <img id="pondering-people"  src={PonderingPeople} />
            
          </div>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
     <div className="container">
     <div className="spinner-grow text-primary" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-grow text-secondary" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-grow text-success" role="status">
<span className="sr-only">Loading...</span>
</div>
     </div>
   </React.Fragment>
    );
  }
}