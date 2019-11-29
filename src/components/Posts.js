import React, { Component } from 'react'
import axios from 'axios'
import PostItem from './PostItem'

export default class Posts extends Component {
    state ={
        posts: [],
        isLoaded: false
    }
    componentDidMount() {
        axios.get('http://localhost:8000/wp-json/wp/v2/posts')
        .then(res => {
            this.setState({
                posts: res.data,
                isLoaded: true
            })
        })
        .catch(err => console.log('Error:', err))
    }
    render() {
        const {posts, isLoaded} = this.state;
        console.log(this.state)
        if(isLoaded){
            return (
                <div>
                    {posts.map((post,i) =>{
                    return <PostItem key={i} post={post}/>
                    })}
                </div>
            )
        }
        return <p>loading..</p>
        
    }
}
