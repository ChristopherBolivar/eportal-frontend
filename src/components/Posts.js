import React, { Component, Fragment } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import Faq from "./Faq";
import Surveys from "./Surveys";
import Banner from "./Banner";
import Nav from './Nav'
import Footer from './Footer'
import Contact from './Contact'
import 'bulma/css/bulma.css'
export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedPosts: [],
      surveys: [],
      faqs: [],
      imageUrl: [],
      fullsizeImg: [],
      PostisLoaded: false,
      SurveyisLoaded: false,
      FaqisLoaded: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://staging-space.bvdpartners.com/portal/wp-json/wp/v2/news?per_page=100")
      .then(res => {
        let theData = [...res.data]
        let resCopy = [...res.data]
          .sort((a, b) => {
            return b - a;
          })
          .splice(0, 3);
        this.setState({
          posts: theData,
          selectedPosts: resCopy,
          PostisLoaded: true,
        });
      })
      axios
      .get("https://staging-space.bvdpartners.com/portal/wp-json/wp/v2/surveys?per_page=100")
      .then(res => {
        
        this.setState({
          surveys: res.data,
          SurveyisLoaded: true,
        });
      })
      

      .catch(err => console.log("Error:", err));
      axios
      .get("https://staging-space.bvdpartners.com/portal/wp-json/wp/v2/faq?per_page=100")
      .then(res => {
       
        this.setState({

          faqs: res.data,
          FaqisLoaded: true
        });
      })
      .catch(err => console.log(err));
      var today = new Date();
      var day = today;
      console.log(day.toDateString().split(" "))
   
  }

  

  showEventPagination = () => {
    const posts = this.state.posts;

    let pageAmount = Math.ceil(posts.length / 3);
    let navArray = [];
    let i = 0;
    while (i < pageAmount) {
      i++;
      navArray.push(i);
    }
    return navArray.map((item, x) => {
      return (
        <li
          className="pag-nav"
          id={`item-${x + 1}`}
          onClick={this.renderEvents}
          style={{ display: "inline" }}
          key={item}
        >
          &bull;
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
    let newArray =  indexes.map((number, i) => {
      if (pageNumber === 1) {
        return indexes[i];
      }
      
      while (i < indexes.length) {
        if (pageNumber > 1) {
          let result = indexes[2] * (pageNumber - 1);
          return (result += i) + 1;
        }
      }
      return null
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
     let postImg = this.state.selectedPosts.sort((a,b)=>{return b.id - a.id}).map((item,i)=>{
       return item.acf.background_image
     })
     this.setState({
      imageUrl: postImg
     });
  };
  
  render() {
    const { isLoaded } = this.state;
    

    if (this.state.PostisLoaded &&
      this.state.SurveyisLoaded &&
      this.state.FaqisLoaded) {
      return (
        <Fragment>
          <Nav surveys={this.state.surveys} posts={this.state.posts} faqs={this.state.faqs} />
          <Banner surveys={this.state.surveys} posts={this.state.selectedPosts} />
          <div className="container-fluid px-4 mt-1">
            <div className="row pt-4">
              <div className="col-12 col-lg-8 pt-2 pb-2 news-post">
                <h2 className="headline">Upcoming events</h2>
          
                <PostItem
                  posts={this.state.selectedPosts}
                />
                <ul className="pagination-ul" style={{ listStyle: "none", display: "inline", margin: '0 50%' }}>
                  {this.showEventPagination()}
                </ul>
              </div>
              <div className="col-12 col-lg-4 survey-div">
                <Surveys surveys={this.state.surveys} />
                
              </div>
            </div>
          </div>

          <Faq faqs={this.state.faqs} />
          <Contact />
          <Footer/>
        </Fragment>
      );
    }
    return   (
      <React.Fragment>
       <div style={{margin: '25% 0'}} className="d-flex justify-content-center">
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
  )
  }
}
