import React, { Component } from 'react'

export default class Nav extends Component {
    render() {
        return (
            <div id="menu-wrapper">
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-3 col-md-4">
						<div className="logo">
							<a href="">
								<img width="150" src="https://www.inktel.com/wp-content/themes/inktel/images/inktel-logo.png" alt="Inktel" className="img-responsive"/>
							</a>
						</div>
					</div>

					<div className="col-sm-9 col-md-8">
						<div id="menu-items-wrapper">
							

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
			</div>
		</div>
        )
    }
}
