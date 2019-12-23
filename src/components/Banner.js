import React, { Component } from 'react'
import Surveys from './Surveys'

export default class Banner extends Component {
  state = {
    posts: [],
    surveys: []
  }
  componentDidMount(){
   console.log()
    this.setState({
      posts: this.props.posts,
      surveys: this.props.surveys

    })
  }
  renderCarouselSlides = () =>{
   return this.state.posts.map((post,i)=>{
      console.log(post.acf.display_in_slider)
      if(post.acf.display_in_slider){
        return (
          <div style={{
            backgroundImage: `url(${
              post.acf.background_image
            })`
          }} className="carousel-item">
            <h1>{post.acf.accouncement_title}</h1>
            <p>{post.acf.call_to_action}</p>
         </div>
        )
      }
    })
  }
  renderSurveyCarouselSlides = () =>{
    return this.props.surveys.map((post,i)=>{
       console.log(post.acf,'=-=-=-=-=--')
      
        if(post.acf.display_in_slider){
          return (
            <div key={i} style={{
              backgroundImage: `url(${
                post.acf.strive_media
              })`
            }} className="carousel-item">
              <p>hello</p>
           </div>
          )
        }
       
     })
   }
    render() {
      console.log(this.state.surveys, 'props')
        return (
            <div className="banner">
                <div id="carouselExampleFade" className="carousel slide " data-ride="carousel">
  <div className="carousel-inner px-0">
    <div className="carousel-item active">
      DSFSDF
    </div>
    {this.renderSurveyCarouselSlides()}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

            </div>
        )
    }
}
