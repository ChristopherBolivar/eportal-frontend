import React, { Component, Fragment } from "react";
import axios from "axios";

export default class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      surveyMedia: [],
      modalTitle: '',
      modalContent: '',
      modalIndex: null,
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
        })
       
      }).then(res=>{
        let surveymedia = this.state.surveys.map((survey,item)=>{
          return survey.acf.media.url
        })
        if(surveymedia.length > 0){
          this.setState({
            surveyMedia: surveymedia
          })

        }
      
      })
      .catch(err => console.log("Error:", err));
  }
  renderSurveys = () => {
    return this.state.surveys.map((survey, i) => {
      return (
        <div onClick={e=>this.activateModal(e)} id={`div-${i}`} className="survey" key={i}>
          <p  dangerouslySetInnerHTML={{ __html: survey.content.rendered }} />
          <h5>{survey.title.rendered}</h5>
        </div>
      );
    });
  };
  activateModal = e => {
    e.target.classList.add("active");
    let index = '';
    console.log(e.target.nodeName)
    console.log(e.target.id.slice(4))

    if(e.target.nodeName === "P"){
      console.log('target is P')
      index = Number(e.target.parentNode.parentNode.id.slice(4))
    }else if(e.target.nodeName === "H5"){
      console.log('target is H5')
      index = Number(e.target.parentNode.id.slice(4))
    }else {
      index = Number(e.target.id.slice(4))
    }

    console.log(index)
  
    document.getElementById('survey-modal').classList.add('is-active')
    this.setState(
      {
        modalTitle: this.state.surveys[index].title.rendered,
        modalContent: this.state.surveys[index].content.rendered,
        modalIndex: index
      }

      )
      
    
  };
  modalHide = () =>{

    document.getElementById('survey-modal').classList.remove('is-active')
  }
  render() {
    console.log(this.state.surveyMedia, this.state.modalIndex)
    // this.state.surveyMedia[this.state.modalIndex]
    if (this.state.isLoaded && this.state.surveyMedia.length > 0) {
      return (
        <Fragment>
          <h1>Recent Surveys</h1>
          <div>{this.renderSurveys()}</div>




          <div id="survey-modal" className="modal">
          <div className="modal-background">
            <div id="modal-content" className="survey-modal-content">
              <div style={{background: '#00245b'}} className="survey-modal-nav container-fluid">
                <div className="row">
                  <div className="col-6">
                    <h1>Responses</h1>
                    <h3>are confidential</h3>
                  </div>
                  <div className="col-6">hello</div>
                </div>
              </div>
            <div style={{ backgroundImage:  `url(${this.state.surveyMedia[this.state.modalIndex]})`}} className="survey-modal-header">
              
            </div>
            <div style={{ backgroundImage:  `url(http://localhost:8000/wp-content/uploads/2019/12/bg-scaled.png)`}} className="survey-modal-title">
              <h1 className="survey-title">{this.state.modalTitle}</h1>
            </div>
            <div  className="content">
            {this.state.modalContent}
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
    return null;
  }
}
