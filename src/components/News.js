import React, { Component, Fragment } from 'react'
import axios from 'axios'

export default class News extends Component {
    state = {
        post: {},
        isLoaded: false
    }
    componentDidMount(){
        axios.get(`http://localhost:8000/wp-json/wp/v2/posts/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                post: res.data,
                isLoaded: true
            })
        })
        .catch(err => console.log('hello Error:', err))
    }
    render() {
        const {post, isLoaded} = this.state 
        console.log(post)
        if(isLoaded){
            return (
                <Fragment>
                   <h1>{post.title.rendered} </h1>
                   <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                </Fragment>
            )
        }
        return <h3>Loading..</h3>
        }
}
