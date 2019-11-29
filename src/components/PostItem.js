import React, { Component } from 'react'
import axios from 'axios'

export default class PostItem extends Component {
    state = {
        imageUrl: '',
        isLoaded: false
    }
    componentDidMount(){
        this.setState({
            post: this.props.post
        })
        const getImageUrl = axios.get(`http://localhost:8000/wp-json/wp/v2/media/${this.props.post.featured_media}`)
        getImageUrl.then(res =>{
            console.log('here',res.data.media_details.sizes.full.source_url)
            this.setState({
                imageUrl: res.data.media_details.sizes.full.source_url,
                isLoaded:true
            })
        }).catch(err=>console.log(err))
    }
    render() {
        const { title, excerpt } = this.props.post;
        console.log('current state',this.state.imageUrl)
        if(this.state.isLoaded){
            return (
                <div>
                    <h2>{title.rendered}</h2>
                    <img src={this.state.imageUrl} alt={title}/>
                    <div dangerouslySetInnerHTML={{__html: excerpt.rendered}} />
                </div>
            )
        }else{
            return null
        }
    }
}
