import React, { Component } from 'react'

export default class Nav extends Component {
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
										<input type="search" className="search-field" placeholder="Search…"  name="s" title="Search for:"/>
										<input type="submit" className="submit"/>
									</form>
								</div>
							</div>
						
					</div>
				</div>
		</div>
        )
    }
}
