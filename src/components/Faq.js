import React, { Component } from 'react'
import axios from 'axios'

export default class Faq extends Component {
    state = {
        faqs: [],
        isLoaded: false
    }
    componentDidMount() {
        axios.get('http://localhost:8000/wp-json/wp/v2/faq').then(res => {
            this.setState({
                faqs: res.data,
                isLoaded: true
            })
        }).catch(err => console.log(err))
    }
    render() {
        console.log(this.state.faqs)
        let sortedFaq = this.state.faqs.sort((a,b)=>{return a-b})
        console.log(sortedFaq, 'sorted')
        if (this.state.isLoaded) {
            return (
                <div className="container">
                    <div className="news-parent-container">
                        {this.state.faqs.map((post, i) => {
                            return (
                                <div key={i}>
                                    <h3>{post.title.rendered}</h3>
                            <p dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
        return null
    }
}
