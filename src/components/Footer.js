import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer id="footer-wrapper">
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-12">
					<div id="footer-top">
						<div className="social-media">
                            
							<ul className="social-media-2">

								<li className="social"><a href="https://twitter.com/inktel" target="_blank" rel="noopener noreferrer"></a></li>
								<li className="social"><a href="https://www.linkedin.com/company/inktel" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
								<li className="social"><a href="https://www.facebook.com/inktel" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
								<li className="social social-last"><a href="https://www.instagram.com/inktel/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
							</ul>

							<ul className="footer-links">
								<li><a href="https://www.inktel.com/ideas">Ideas</a></li>
								<li><a href="https://www.inktel.com/expertise">Expertise</a></li>
								<li><a href="https://www.inktel.com/culture">About</a></li>
								<li><a href="https://www.inktel.com/careers">Careers</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-sm-12">
					<div className="footer-menu">
						<ul className="footer-links">
							<li><strong><a href="https://www.inktel.com/culture/"><span style={{color: '#02275a'}}>Passion for People	&trade;</span></a></strong></li>
							<li><a href="https://www.inktel.com/privacy-policy/">Privacy Policy</a></li>
							<li><a href="https://www.inktel.com/terms-of-use/">Terms of Use</a></li>
							<li><a href="https://www.inktel.com/contact">Contact Us</a></li>
							<li><strong><a href="https://www.inktel.com/careers/"><span style={{color:'#02275a'}}>Where Talent Lives&trade;</span></a></strong></li>
						</ul>
					</div>
				</div>
				<div className="col-sm-12 pt-2">
					<div className="copyright">
						<p>© 2019 Inktel Contact Center Solutions.  All Rights Reserved.</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
            </div>
        )
    }
}
