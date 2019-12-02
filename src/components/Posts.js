import React, { Component, Fragment } from 'react'
import axios from 'axios'
import PostItem from './PostItem'
import Banner from './Banner'
import Faq from './Faq'
export default class Posts extends Component {
    state = {
        posts: [],
        selectedPosts: [],
        isLoaded: false
    }
    componentDidMount() {
        axios.get('http://localhost:8000/wp-json/wp/v2/posts')
            .then(res => {
                let resCopy = [...res.data].sort((a,b)=>{ return a - b}).splice(0,3)
                this.setState({
                    posts: res.data,
                    selectedPosts: resCopy,
                    isLoaded: true
                })
            })
            .catch(err => console.log('Error:', err))
    }

    showEventPagination = () =>{
        const posts = this.state.posts;

        let pageAmount = posts.length / 3
        let navArray = []
        let i=0
        while(i <= pageAmount ){
            i++
            navArray.push(i)
        }
       return navArray.map((item, x) => {return <li id={`item-${x + 1}`} onClick={this.renderEvents} style={{display: 'inline', margin: '0 .5rem'}} key={item}>{item}</li>})
    }
    renderEvents = (e) =>{
       let indexes = [1,2,3]
       let pageNumber = Number(e.target.id.slice(5))
       let startNumber = indexes[2] + 1
       let sortedPosts = this.state.posts.sort((a,b)=>{return a.id-b.id})
       let postRender = []
       let newArray = indexes.map((number,i)=>{
           if(pageNumber===1){
               return indexes[i]
           }
          while(i < indexes.length){
            if(pageNumber > 1){
                let result = indexes[2] * (pageNumber -1)
                return (result += i) + 1
            }
          }
       })

       sortedPosts.forEach((post, i)=>{
            if(sortedPosts.indexOf(post) === newArray[0] - 1){
                postRender.push(post)
            }
            if(sortedPosts.indexOf(post) === newArray[1] - 1){
                postRender.push(post)
            }
            if(sortedPosts.indexOf(post) === newArray[2] - 1){
                postRender.push(post)
            }
       })
       this.setState({
           selectedPosts: postRender
       })
    }
    
    render() {
        const {  isLoaded } = this.state;
        if (isLoaded) {
            return (
                <Fragment>

                    {/* <Banner /> */}
                    <div className="container mt-1">
                        <div className="row">
                           <div className="col-8 ">

                            <h1 style={{display: 'inline'}}>News / Events</h1> <ul style={{listStyle :'none', display: 'inline'}}>{this.showEventPagination()}</ul>
                           <div className="news-parent-container">
                           <PostItem  posts={this.state.selectedPosts}/>
                           </div>
                           </div>
                           <div className="col-4">
                           Surveys will go here
                           </div>
                        </div>
                    </div>
                    <Faq />
                </Fragment>
            )
        }
        return <p>loading..</p>

    }
}
