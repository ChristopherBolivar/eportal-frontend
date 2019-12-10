import React, { Component } from "react";

export default class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: [],
      post: [],
      modalTitle: '',
      modalContent: '',
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
      return (
        <div id={`post-${i}`} key={i} className="row news-div">
          <div className="col-4 px-0">
            <img
              alt={post.title.rendered}
              width="150px"
              height="150px"
              src={this.state.imageUrl[i]}
            />
          </div>
          <div className="col-8 px-0">
            <h4>{post.title.rendered}</h4>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
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
      );
    });
  };

  activateModal = e => {
    e.target.classList.add("active");
    let index = Number(e.target.id.slice(5));
    document.getElementById('modal').classList.add('is-active')
    this.setState(
      {
        modalTitle: this.state.post[index].title.rendered,
        modalContent: this.state.post[index].content.rendered
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
            <div className="modal-header">
              {this.state.modalTitle}
            </div>
            {this.state.modalContent}
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
