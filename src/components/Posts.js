import React, { Component, Fragment } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import Banner from "./Banner";
import Faq from "./Faq";
import Surveys from "./Surveys";
export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedPosts: [],
      imageUrl: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/posts?per_page=100")
      .then(res => {
        let resCopy = [...res.data]
          .sort((a, b) => {
            return b - a;
          })
          .splice(0, 3);
        this.setState({
          posts: res.data,
          selectedPosts: resCopy,
          isLoaded: true
        });
      })
      .then(res => {
          let array = []
        this.state.selectedPosts.map((item, i) => {
          axios
            .get(`http://localhost:8000/wp-json/wp/v2/media/${item.featured_media}`)
            .then(res => {
              array.push(res.data.media_details.sizes.full.source_url);
            })
            .then(res => {
              this.setState({
                imageUrl: array
              });
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log("Error:", err));
  }

  showEventPagination = () => {
    const posts = this.state.posts;

    let pageAmount = Math.ceil(posts.length / 3);
    let navArray = [];
    let i = 0;
    console.log(pageAmount);
    while (i < pageAmount) {
      i++;
      navArray.push(i);
    }
    return navArray.map((item, x) => {
      return (
        <li
          id={`item-${x + 1}`}
          onClick={this.renderEvents}
          style={{ display: "inline", margin: "0 .5rem" }}
          key={item}
        >
          {item}
        </li>
      );
    });
  };
  renderEvents = e => {
    let indexes = [1, 2, 3];
    let pageNumber = Number(e.target.id.slice(5));
    let sortedPosts = this.state.posts.sort((a, b) => {
      return b.id - a.id;
    });
    let postRender = [];
    let newArray = indexes.map((number, i) => {
      if (pageNumber === 1) {
        return indexes[i];
      }
      while (i < indexes.length) {
        if (pageNumber > 1) {
          let result = indexes[2] * (pageNumber - 1);
          return (result += i) + 1;
        }
      }
    });

    sortedPosts.forEach((post, i) => {
      if (sortedPosts.indexOf(post) === newArray[0] - 1) {
        postRender.push(post);
      }
      if (sortedPosts.indexOf(post) === newArray[1] - 1) {
        postRender.push(post);
      }
      if (sortedPosts.indexOf(post) === newArray[2] - 1) {
        postRender.push(post);
      }
    });
    this.setState({
      selectedPosts: postRender
    });
    let array = []
    this.state.selectedPosts.map((item, i) => {
      axios
        .get(`http://localhost:8000/wp-json/wp/v2/media/${item.featured_media}`)
        .then(res => {
            console.log(res.status)
          array.push(res.data.media_details.sizes.full.source_url);
        })
        .then(res => {
          this.setState({
            imageUrl: array
          });
        })
        .catch(err => console.log(err,'yellow'));
    })
  };

  render() {
    const { isLoaded } = this.state;
    if (isLoaded && this.state.imageUrl.length === 3) {
      return (
        <Fragment>
          {/* <Banner /> */}
          <div className="container mt-1">
            <div className="row">
              <div className="col-8 ">
                <h1 style={{ display: "inline" }}>News / Events</h1>

                <PostItem images={this.state.imageUrl} posts={this.state.selectedPosts} />
                <ul style={{ listStyle: "none", display: "inline" }}>
                  {this.showEventPagination()}
                </ul>
              </div>
              <div className="col-4">
                <Surveys />
              </div>
            </div>
          </div>
          <Faq />
        </Fragment>
      );
    }
    return <p>loading..</p>;
  }
}
