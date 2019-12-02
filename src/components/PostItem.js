import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class PostItem extends Component {
    state = {
        imageUrl: '',
        post: [],
        isLoaded: false
    }
    componentDidMount() {
        console.log(this.props.posts, 'props r here')
        this.setState({
            post: this.props.posts,
            isLoaded: true
        })
        //  axios.get(`http://localhost:8000/wp-json/wp/v2/media/${this.props.post.featured_media}`)
        // .then(res => {
        //     this.setState({
        //         imageUrl: res.data.media_details.sizes.full.source_url,
        //         isLoaded: true
        //     }) 
        // }).catch(err => console.log(err))
    }
    renderEvent = () => {
        return this.state.post.map((post,i)=>{
            console.log(post.title.rendered, '++++')
        return <h1 key={i}>{post.title.rendered}</h1>
       })
       
    }
    render() {
        console.log(this.state.post, '=-=-=-=-=-=-=-')
        if (this.state.isLoaded) {
            return (
                <div className="container news-parent-div">
                    <div className="row news-div">
                        <div className="col-4 px-0">
                            {this.renderEvent()}
                           
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}
