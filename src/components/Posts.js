import React, { Component, Fragment } from 'react'
import axios from 'axios'
import PostItem from './PostItem'
import Banner from './Banner'
import Faq from './Faq'
export default class Posts extends Component {
    state = {
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
        const { posts, isLoaded } = this.state;
        console.log(this.state)
        if (isLoaded) {
            return (
                <Fragment>

                    <Banner />
                    <div className="container mt-1">
                        <div className="row">
                           <div className="col-8 ">

                            <h1>News / Events</h1>
                           <div className="news-parent-container">
                           {posts.map((post, i) => {
                                return <PostItem key={i} post={post} />
                            })}
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
