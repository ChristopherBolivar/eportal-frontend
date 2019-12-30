import React, { Component } from "react";
import axios from "axios";

export default class Faq extends Component {
  state = {
    faqs: [],
    isLoaded: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/faq?per_page=100")
      .then(res => {
       
        this.setState({
          faqs: res.data,
          isLoaded: true
        });
      })
      .catch(err => console.log(err));
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
    // console.log(e.target.parentNode.parentNode.parentNode.children)
    // e.target.parentNode.parentNode.parentNode.children.map((item,i)=>{
    //   console.log(item)
    // })
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
    if (this.state.isLoaded) {
      return (
        <div className="container-fluid faqs">
          <div className="row faq-row">
          <div className="container da-faqs col-12 col-sm-6">
            <h3 className="headline">Frequently Asked Questions</h3>
            {this.displayFAQ()}
            </div>
          <div className="col-12 col-sm-6 faq-right-div">&nbsp;</div>
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