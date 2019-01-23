import React, { Component } from 'react';

class subjectfile extends Component{

	constructor(){
		super();
		this.state = {
			links : "hello/link",
			notes: "one two three...."
		}
	}

	componentDidMount(){


	}

	render(){
		var pathname = this.props.location.pathname;
		var subjectname = pathname.replace("/subject/", "");
		return(
			<div>
				<p>Below are links</p>
				<p>{this.state.links}</p>
				<p>Below are notes</p>
				<p>{this.state.notes}</p>
			</div>
		);

	}
}

export default subjectfile;