import React, { Component } from "react";

export default class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: [],
      post: [],
      modalTitle: '',
      modalContent: '',
      modalBG: '',
      isLoaded: false
    };
  }

  componentDidMount() {
    document.querySelector("#item-1").click();
    this.setState({
      post: this.props.posts,
      isLoaded: true
    });
    let int = setInterval(() => this.getPostState(), 100);
    this.setState({ int });
  }

  getPostState = () => {
    this.setState({
      post: this.props.posts,
      imageUrl: this.props.images,
      isLoaded: true
    });
  };

  renderEvent = () => {
    return this.state.post.map((post, i) => {
      let content = [...post.acf.content.slice(0, 600)]

      return (
       <div className="news-container" key={i}>
         <div className="triangle"></div>
          <div id={`post-${i}`}  className="row news-div">
          <div style={{background: `no-repeat center url(${post.acf.news_media})`}} className="col-4 px-0 post-img">
           
          </div>
          <div className="col-8 p-2">
            <h5>{post.acf.accouncement_title}</h5>
            <p className="news-exerpt">{content}&nbsp;[...]</p>
            <a
              onClick={e => this.activateModal(e)}
              id={`post-${i}`}
              className="viewmore"
              href="#/hello"
            >
              View more
            </a>
          </div>
        </div>
        <div className="news-empty-div row">
        <div style={{opacity: '0%'}} className="col-4 px-0">
            <img
              alt={post.acf.accouncement_title}
              width="260px"
              height="280px"
              src={post.acf.news_media}
            />
          </div>
          <div style={{opacity: '0%'}} className="col-8 p-2">
            <h5 >{post.acf.accouncement_title}</h5>
            <p className="news-exerpt">{content}&nbsp;[...]</p>
          </div>
        </div>
       </div>
      );
    });
  };

  activateModal = e => {
    e.target.classList.add("active");
    let index = Number(e.target.id.slice(5));
    document.getElementById('modal').classList.add('is-active')
    this.setState(
      {
        modalTitle: this.state.post[index].acf.accouncement_title,
        modalContent: this.state.post[index].acf.content,
        modalBG: this.state.post[index].acf.news_media,
      }

      )
      
    
  };
  modalHide = () =>{

    document.getElementById('modal').classList.remove('is-active')
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <React.Fragment>
          <div className="news-parent-container">
            <div className="container news-parent-div">
              {this.renderEvent()}
            </div>
          </div>


          <div id="modal" className="modal">
          <div className="modal-background">
            <div id="modal-content" className="modal-content">
            <div style={{backgroundImage:`radial-gradient(circle, rgba(0,36,91,.7) 0%, rgba(0,24,60,.7) 61%), url(${
                  this.state.modalBG
                }) `}} className="modal-header">
              <h1>{this.state.modalTitle}</h1>
            </div>
            <div className="modal-text container">
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
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
