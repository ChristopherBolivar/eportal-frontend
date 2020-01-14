import React, { Component } from 'react'

export default class Nav extends Component {
	state = {
		posts: [],
		survey: [],
		searchQuery: '',
		searchResultsEvents: [],
		searchResultsFaqs: [],
	}
	componentDidMount() {
		this.setState({
			posts: this.props.posts,
			survey: this.props.surveys,
			faqs: this.props.faqs
		})
	}
	activateModal = e => {
		
		e.preventDefault();
		document.getElementById('search-modal').classList.add('is-active')
		document.getElementById('modal-search').value = e.target.parentNode.childNodes[0].value
		let searchQuery = document.getElementById('modal-search').value
		console.log(searchQuery)
		let filter = this.state.posts.filter(post => {
			 if(post.acf.accouncement_title.toLowerCase().includes(searchQuery)){
				 return post
			 }
		})
		let filterFaqs = this.state.faqs.filter(post => {
			if(post.acf.question.toLowerCase().includes(searchQuery)){
				return post
			}
	   })
		console.log(filter, 'here')
		  this.setState({
			searchResultsEvents: filter,
			searchResultsFaqs: filterFaqs
		})
	}
	
	displayResultsEvents = () =>{
		console.log(this.state.searchResults)
		return this.state.searchResultsEvents.map((post,i)=>{
			return <h1 key={i}>{post.acf.accouncement_title}</h1>
		})
	}
	displayResultsFaqs = () =>{
		console.log(this.state.searchResults)
		return this.state.searchResultsFaqs.map((post,i)=>{
			return <h1 key={i}>{post.acf.question}</h1>
		})
	}
    render() { 
        return (
            <div id="menu-wrapper">
			<div className="d-flex flex-wrap justify-content-between">
					
						<div className="logo">
							<a href="www.inktel.com">
								<img width="150" src="https://www.inktel.com/wp-content/themes/inktel/images/inktel-logo.png" alt="Inktel" className="img-responsive"/>
							</a>
					</div>

					
						<div className="d-flex flex-wrap justify-content-around px-0 mx-0" id="menu-items-wrapper">
							

								
								<ul className="social-media-nav">

								<li className="social"><a href="https://twitter.com/inktel" target="_blank" rel="noopener noreferrer"></a></li>
								<li className="social"><a href="https://www.linkedin.com/company/inktel" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
								<li className="social"><a href="https://www.facebook.com/inktel" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
								<li className="social social-last"><a href="https://www.instagram.com/inktel/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
								</ul>
							<div id="search-box">
								<div role="search" method="get" className="search-form">
									<form method="get" action=">">
										<input type="input" className="search-field" placeholder="Search…"  name="s" title="Search for:"/>
										<input type="submit" onClick={e => this.activateModal(e)} className="submit"/>
									</form>
								</div>
							</div>
						
					</div>
				</div>
				<div id="search-modal" className="modal">
          <div className="modal-background">
            <div id="modal-content" className="modal-content">
            <div className="modal-header">
				<input id="modal-search" defaultValue={this.state.searchQuery}/>
            </div>
            <div className="modal-text container">
			{this.displayResultsEvents()}
			{this.displayResultsFaqs()}
            </div>
            </div>
            <button
              onClick={this.modalHide}
              className="modal-close is-large"
              aria-label="close"
            ></button>
          </div>
        </div>
		</div>
		
        )
    }
}
