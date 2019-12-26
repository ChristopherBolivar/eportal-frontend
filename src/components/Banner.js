import React, { Component } from 'react'

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
    setInterval(()=>{
      document.getElementById('next').click()
      console.log(document.querySelector('#bar').style,'++++')
    },10000)
  }
  renderCarouselSlides = () =>{
   return this.state.posts.map((post,i)=>{
      console.log(i,'+++++')
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
      else{
        return null
      }
    })
  }
  renderSurveyCarouselSlides = () =>{
    return this.props.surveys.map((post,i)=>{
        if(post.acf.display_in_slider){
           if(i === 0){
            return (
              <div className="banner-div" key={i} style={{
                
                backgroundImage: `radial-gradient(circle, rgba(0,36,91,.7) 0%, rgba(0,24,60,.7) 61%), url(${
                  post.acf.media.url
                }) `,
                backgroundBlendMode: 'multiply',
              }} className="carousel-item active">

                <div className="banner-content">
                <h1>{post.acf.call_to_action}</h1>
                <h6>{post.acf.description}</h6>
                </div>
             </div>
            )
           }
           else if(i !== 0 ){
            return (
              <React.Fragment>
                <div className="banner-div" key={i} style={{
                
                backgroundImage: `radial-gradient(circle, rgba(0,36,91,.7) 0%, rgba(0,24,60,.7) 61%), url(${
                  post.acf.media.url
                }) `,
                backgroundBlendMode: 'multiply',
              }} 
              className="carousel-item">

                <div className="banner-content">
                <h1>{post.acf.call_to_action}</h1>
                <h6>{post.acf.description}</h6>
                </div>
             </div>
             <div className="loading-bar">
             <div id="bar" className="bar">
             </div>
           </div>
              </React.Fragment>
            )
           }
           return null
           
        }
        return null
       
     })
   }
    render() {
      console.log(this.state.surveys, 'props')
        return (
          <React.Fragment>
              <div className="banner">
                <div id="carouselExampleFade" className="carousel slide " data-interval="false" data-ride="carousel">
  <div className="carousel-inner px-0">
 
    {this.renderSurveyCarouselSlides()}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a id="next" className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

            </div>
            
          </React.Fragment>
        )
    }
}
