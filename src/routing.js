import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LearnCourse from './LearnDB/SubjectDiagram/learningcourse.js';
import Subject from './LearnDB/Subject/subjectcontroller.js'


class routing extends Component{

	render(){
		return(
			<Router>
				<div>
					<Route exact path="/" component={LearnCourse} />
					<Route path="/subject" component={Subject} />
				</div>
			</Router>
		);
	}

}

export default routing;