import React, { Component } from "react";

export default class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: [],
      post: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    document.querySelector('#item-1').click()
    console.log(this.props, "props r here");
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
        <div key={i} className="row news-div">
          <div className="col-4 px-0">
            <img width="150px" height="150px" src={this.state.imageUrl[i]} />
          </div>
          <div className="col-8 px-0">
            <h4>{post.title.rendered}</h4>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        </div>
      );
    });
  };
  render() {
    if (this.state.isLoaded) {
      return (
        <div className="news-parent-container">
          <div className="container news-parent-div">{this.renderEvent()}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}
