import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    console.log(this.props.posts, "props r here");
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
      isLoaded: true
    });

    let media = this.state.post.map((post, i) => {
      return post.featured_media;
    });

    // let array = []
    // media.map((item, i) => {

    //     return axios
    //       .get(
    //        `http://localhost:8000/wp-json/wp/v2/media/${item}`
    //      )
    //      .then(res => {
    //        array.push(res.data.media_details.sizes.full.source_url)
           
    //      })
    //      .then(res=>{
    //         this.setState({
    //             imageUrl: array
    //         })
    //      })
    //      .catch(err => console.log(err));
    //  })
     
  };

  renderEvent = () => {
    const divStyle = {
        backgroundImage: 'url(' + this.state.imageUrl + ')',
        backgroundSize: 'cover'
      };
    return this.state.post.map((post, i) => {
      return (
        <div key={i} className="row news-div">
          <div style={divStyle} className="col-2"></div>
          <div className="col-10 px-0">
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
