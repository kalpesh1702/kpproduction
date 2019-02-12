import React, {Component} from 'react';
import Axios from 'axios';
import LoaderController from './../../Loader/loader.js';
import SubjectBody from './subjectbody.js';
import {withRouter} from 'react-router-dom';

class learningcourse extends Component{

	constructor(props){
		super(props);

		this.state = {
			loader : true,
			coursedata : []
		}
	}

	fetchcoursedata = () => {

		Axios.get('/course/fetchdata')
		.then((response) => {

			this.setState({
				'loader' : false,
				'coursedata': response.data
			})
		 })
		.catch((error) => {
		    console.log(error);
		});

	}

	componentDidMount(){

		this.fetchcoursedata();

	}


	clickhandler = (subject) => {
		this.props.history.push('/subject/'+subject);
	}

	render(){

		return (

			(this.state.loader)

		 	?
		 		<LoaderController />
		 	:

			<div className="container">
				<div className="row">
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[0]}
						color="#755139"
						click={() => this.clickhandler(this.state.coursedata[0].name)} />
					</div>
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[1]}
						color="#006E6D"
						click={() => this.clickhandler(this.state.coursedata[1].name)} />
					</div>
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[2]}
						color="#a09898"
						click={() => this.clickhandler(this.state.coursedata[2].name)} />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[3]}
						color="#8D9440"
						click={() =>this.clickhandler(this.state.coursedata[3].name)} />
					</div>
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[4]}
						color="#22a53f"
						click={() => this.clickhandler(this.state.coursedata[4].name)} />
					</div>
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[5]}
						color="#3F69AA"
						click={() => this.clickhandler(this.state.coursedata[5].name)} />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[6]}
						color="#6B5B95"
						click={() => this.clickhandler(this.state.coursedata[6].name)} />
					</div>
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[7]}
						color="#C62168"
						click={() => this.clickhandler(this.state.coursedata[7].name)} />
					</div>
					<div className="col-sm-4">
						<SubjectBody
						subject={this.state.coursedata[8]}
						color="black"
						click={() => this.clickhandler(this.state.coursedata[8].name)} />
					</div>
				</div>
			</div>
		);
	}

}

export default withRouter(learningcourse);