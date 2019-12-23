import React, { Component, Fragment } from "react";
import axios from "axios";

export default class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      surveyMedia: [],
      modalTitle: "",
      modalContent: "",
      modalIndex: null,
      striveBG: "undefined",
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
      .then(res => {
        let surveymedia = this.state.surveys.map((survey, item) => {
          let surveyType = survey.acf.survey_type.value.split(" ");
          if (surveyType[0].toLowerCase() === "strive") {
            return survey.acf.strive_media;
          }
          if (surveyType[0].toLowerCase() === "quarterly") {
            return survey.acf.strive_media;
          }
        });
        if (surveymedia.length > 0) {
          this.setState({
            surveyMedia: surveymedia
          });
        }
      })
      .catch(err => console.log("Error:", err));
  }
  renderSurveys = () => {
    return this.state.surveys.map((survey, i) => {
      return (
        <div
          onClick={e => this.activateModal(e)}
          id={`div-${i}`}
          className="survey"
          key={i}
        ><p>test</p>
          <h5>{survey.acf.survey_type.value}</h5>
        </div>
      );
    });
  };
  activateModal = e => {
    let index = "";
    console.log(e.target.nodeName);
    console.log(e.target.id.slice(4));

    if (e.target.nodeName === "P") {
      console.log("target is P");
      index = Number(e.target.parentNode.parentNode.id.slice(4));
    } else if (e.target.nodeName === "H5") {
      console.log("target is H5");
      index = Number(e.target.parentNode.id.slice(4));
    } else {
      index = Number(e.target.id.slice(4));
    }

    console.log(index);
  let surveyCopy = [... this.state.surveys]
  let typeOf = ''
   surveyCopy.forEach((survey, i) => {
      if (
        i === index 
      ) {
       typeOf = survey.acf.survey_type.value
      }
     
    });
   console.log(typeOf.split(" ")[0])
   if(typeOf.split(" ")[0].toLowerCase() === "quarterly"){
     console.log(true)
    document.getElementById("survey-modal").classList.add("is-active");
     
   }else if(typeOf.split(" ")[0].toLowerCase() === "strive"){
   this.setState({striveBG: this.state.surveys[index].acf.background_color})
   document.getElementById("strive-modal").classList.add("is-active");
    
  }
    this.setState({
      modalTitle: this.state.surveys[index].title.rendered,
      modalContent: this.state.surveys[index].content.rendered,
      modalIndex: index
    });
  };
  modalHide = () => {
    document.getElementById("survey-modal").classList.remove("is-active");
    document.getElementById("strive-modal").classList.remove("is-active");
  };
  render() {
    // console.log(this.state.surveyMedia, this.state.modalIndex)
    // this.state.surveyMedia[this.state.modalIndex]
    if (this.state.isLoaded /*&& this.state.surveyMedia.length > 0 */) {
      return (
        <Fragment>
          <h1>Recent Surveys</h1>
          <div>{this.renderSurveys()}</div>

          <div id="survey-modal" className="modal">
            <div className="modal-background">
              <div id="modal-content" className="survey-modal-content">
                <div
                  style={{ background: "#00245b" }}
                  className="survey-modal-nav container-fluid"
                >
                  <div className="row">
                    <div className="col-6">
                      <h1>Responses</h1>
                      <h3>are confidential</h3>
                    </div>
                    <div className="col-6">hello</div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${
                      this.state.surveyMedia[this.state.modalIndex]
                    })`
                  }}
                  className="survey-modal-header"
                ></div>
                <div
                  style={{
                    backgroundImage: `url(http://localhost:8000/wp-content/uploads/2019/12/bg-scaled.png)`
                  }}
                  className="survey-modal-title"
                >
                  <h1 className="survey-title">{this.state.modalTitle}</h1>
                </div>
                <div className="content">{this.state.modalContent}</div>
              </div>
              <button
                onClick={this.modalHide}
                className="modal-close is-large"
                aria-label="close"
              ></button>
            </div>
          </div>
          <div id="strive-modal" className="modal">
            <div className="modal-background">
              <div id="modal-content" className="survey-modal-content">
                <div
                  style={{ background: this.state.striveBG }}
                  className="survey-modal-nav container-fluid"
                >
                  <div className="row">
                    <div className="col-6">
                      <h1>STRIVE</h1>
                      <h3>are confidential</h3>
                    </div>
                    <div className="col-6">hello</div>
                  </div>
                </div>
              </div>
              <button
                onClick={this.modalHide}
                className="modal-close is-large"
                aria-label="close"
              ></button>
            </div>
          </div>
        </Fragment>
      );
    }
    return (
      <React.Fragment>
         <div className="spinner-grow text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
<div className="spinner-grow text-secondary" role="status">
  <span className="sr-only">Loading...</span>
</div>
<div className="spinner-grow text-success" role="status">
  <span className="sr-only">Loading...</span>
</div>
      </React.Fragment>
    );
  }
}
