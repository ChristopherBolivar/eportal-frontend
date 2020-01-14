import React, {Component, Fragment } from "react";

export default class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      surveyMedia: [],
      modalTitle: "",
      modalContent: "",
      modalIndex: null,
      script: '',
      striveBG: "undefined",
      isLoaded: false
    };
  }

  componentDidMount() {
   this.setState({
     surveys: this.props.surveys,
     isLoaded: true
   })
  }
  renderSurveys = () => {
    return this.state.surveys.map((survey, i) => {

      return (
       
            <div key={i}   className="survey-divtwo">
               <a rel="noopener noreferrer" className="survey-link" target="_blank" href={`${survey.acf.survey_link}`}>
          <div className="survey-triangle"></div>
        <div
          // onClick={e => this.activateModal(e)}
          id={`div-${i}`}
          className="survey"
      ><p>{survey.acf.call_to_action}</p>
    <h5>{survey.acf.quarter}&nbsp;{survey.acf.survey_type.value}</h5>
        </div>

        </a>
          </div>
         
      );
    });
  };
  // activateModal = e => {
  //   let index = "";
  //   console.log(e.target.nodeName);
  //   console.log(e.target.id.slice(4));

  //   if (e.target.nodeName === "P") {
  //     console.log("target is P");
  //     index = Number(e.target.parentNode.parentNode.id.slice(4));
  //   } else if (e.target.nodeName === "H5") {
  //     console.log("target is H5");
  //     index = Number(e.target.parentNode.id.slice(4));
  //   } else {
  //     index = Number(e.target.id.slice(4));
  //   }

  //   console.log(index);
  // let surveyCopy = [...this.state.surveys]
  // let typeOf = ''
  //  surveyCopy.forEach((survey, i) => {
  //     if (
  //       i === index 
  //     ) {
  //      typeOf = survey.acf.survey_type.value
  //     }
     
  //   });
  //  console.log(typeOf.split(" ")[0])
  //  if(typeOf.split(" ")[0].toLowerCase() === "quarterly"){
  //    console.log(true)
  //   document.getElementById("survey-modal").classList.add("is-active");
     
  //  }else if(typeOf.split(" ")[0].toLowerCase() === "strive"){
  //  this.setState({striveBG: this.state.surveys[index].acf.background_color})
  //  document.getElementById("strive-modal").classList.add("is-active");
    
  // }
  //   this.setState({
  //     modalTitle: `${this.state.surveys[index].acf.quarter}  ${this.state.surveys[index].acf.survey_type.value}`,
  //     modalContent: this.state.surveys[index].acf.description,
  //     script: this.state.surveys[index].acf.survey_script,
  //     modalIndex: index
  //   });
  // };
  modalHide = () => {
    document.getElementById("survey-modal").classList.remove("is-active");
    document.getElementById("strive-modal").classList.remove("is-active");
  };
  render() {
    if (this.state.isLoaded /*&& this.state.surveyMedia.length > 0 */) {
      return (
        <Fragment>
          <h3 className="headline">Employee Surveys</h3>
          <div className="surveys-rendered" >{this.renderSurveys()}</div>

          <div id="survey-modal" className="modal">
          <div className="modal-background">
            <div id="modal-content" className="modal-content">
            <div style={{backgroundImage:`radial-gradient(circle, rgba(0,36,91,.7) 0%, rgba(0,24,60,.7) 61%), url(${
                  this.state.modalBG
                }) `}} className="modal-header">
              <h1>{this.state.modalTitle}</h1>
            </div>
            <div className="modal-text container">
            {this.state.modalContent}
            <div dangerouslySetInnerHTML={{__html: this.state.script}} />;
            
            </div>
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
