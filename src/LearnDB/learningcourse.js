import React, {Component} from 'react';
import './learningcourse.css';
import SubjectBody from './SubjectDiagram/subjectbody.js';
import {withRouter} from 'react-router-dom';

class learningcourse extends Component{


	clickhandler = (subject) => {
		this.props.history.push('/subject/'+subject);
	}

	render(){

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-4"><SubjectBody name="NodeJs" color="#755139" click={() => this.clickhandler("NodeJs")}/></div>
					<div className="col-sm-4"><SubjectBody name="ReactJs" color="#006E6D" click={() => this.clickhandler("ReactJs")}/></div>
					<div className="col-sm-4"><SubjectBody name="JavaScript/Jquery" color="#a09898" click={() => this.clickhandler("JavaScript")}/></div>
				</div>
				<div className="row">
					<div className="col-sm-4"><SubjectBody name="PHP/Symfony" color="#8D9440" click={() =>this.clickhandler("PHP")}/></div>
					<div className="col-sm-4"><SubjectBody name="HTML/CSS" color="#22a53f" click={() => this.clickhandler("HTML")}/></div>
					<div className="col-sm-4"><SubjectBody name="Mysql/DBMS" color="#3F69AA" click={() => this.clickhandler("Mysql")}/></div>
				</div>
				<div className="row">
					<div className="col-sm-4"><SubjectBody name="Java/Oops" color="#6B5B95" click={() => this.clickhandler("Java")}/></div>
					<div className="col-sm-4"><SubjectBody name="DataStructure/Algo" color="#C62168" click={() => this.clickhandler("DataStructure")}/></div>
					<div className="col-sm-4"><SubjectBody name="C++" color="black" click={() => this.clickhandler("C++")}/></div>
				</div>
			</div>
		);
	}

}

export default withRouter(learningcourse);