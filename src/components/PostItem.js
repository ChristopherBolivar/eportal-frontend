import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class PostItem extends Component {
    state = {
        imageUrl: '',
        isLoaded: false
    }
    componentDidMount() {
        this.setState({
            post: this.props.post
        })
        const getImageUrl = axios.get(`http://localhost:8000/wp-json/wp/v2/media/${this.props.post.featured_media}`)
        getImageUrl.then(res => {
            this.setState({
                imageUrl: res.data.media_details.sizes.full.source_url,
                isLoaded: true
            })
        }).catch(err => console.log(err))
    }
    render() {
        const { id, title, excerpt } = this.props.post;
        console.log('current state', id)
        if (this.state.isLoaded) {
            return (
                <div className="container news-parent-div">
                    <div className="row news-div">
                        <div className="col-4 px-0">

                            <img style={{ width: '200px', height: '200px'}} src={this.state.imageUrl} alt={title} />
                        </div>
                        <div className="col-8 px-1">
                            <h2>{title.rendered}</h2>
                            <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
                            <Link to={`/news/${id}`}>View Post</Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}
