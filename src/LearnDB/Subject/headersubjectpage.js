import React, { Component}  from 'react';
import './subject.css';
import Modalcontent from './modalcontent.js';
import {withRouter} from 'react-router-dom';
import DialogModal from 'sweetalert2';
import Axios from 'axios';

class headersubjectpage extends Component{

	constructor(props){

		super(props);

		this.state = {
			subjectname : props.subjectname,
			linkmodal : false,
			notesmodal : false
		}

		this.dataRef = React.createRef();
		this.commentsRef = React.createRef();

	}

	backtoMainPage = () => {

		this.props.history.push('/');

	}

	showLinkModal = () => {

		this.setState({linkmodal : true});

	}

	hideLinkModal = () => {

		this.setState({linkmodal : false});

	}

	showNotesModal = () => {

		this.setState({notesmodal : true});

	}

	hideNotesModal = () => {

		this.setState({notesmodal : false});

	}

	submitHandler = (form) => {

		if(!this.dataRef.current.value){
			DialogModal.fire('Please Enter Link.');
			return;
		}

		Axios.post('/subjects/savedata', {
		    comments: this.commentsRef.current.value,
		    data: this.dataRef.current.value,
		    type: form,
		    subject: this.state.subjectname
		})
		.then((response) => {

		    this.hideLinkModal();

		    DialogModal.fire({
			  	position: 'top-end',
			  	type: 'success',
			  	title: 'Your work has been saved',
			  	showConfirmButton: false,
			  	timer: 1500
			});

			this.props.refresh();

		 })
		.catch((error) => {
		    console.log(error);
		});

	}

	render(){

		let linkmodalbodycontent = [
			<div key="1" className="form-group">
				<label>Comments:</label>
				<input ref={this.commentsRef} type="text" className="form-control" id="comment" />
			</div>,
			<div key="2" className="form-group">
				<label>Important Link:</label>
				<input ref={this.dataRef} type='text' className='form-control' id='link' />
			</div>
		];

		let notesmodalbodycontent = [
			<div key="1" className="form-group">
				<label>Comments:</label>
				<input ref={this.commentsRef} type="text" className="form-control" id="comment" />
			</div>,
			<div key="2" className="form-group">
				<label>Important Notes:</label>
				<textarea ref={this.dataRef} className="form-control rounded-0"  rows="6" id="link" />
			</div>
		];

		return (
			<div className="headingclass">
				<div className="row">
					<div className="col-sm-4 text-left BackButton" onClick={this.backtoMainPage}>
						 « Back
					</div>
					<div className="col-sm-4 subjectText">
						{this.state.subjectname}
					</div>
					<div className="col-sm-4 text-right">
						 <button type="button" onClick={this.showLinkModal} className="commonbutton btn btn-sm btn-primary">Add Link</button>
	  					 <button type="button" onClick={this.showNotesModal} className="commonbutton btn btn-sm btn-success">Add Notes</button>
					</div>
				</div>

				<Modalcontent
				modalbodycontent={linkmodalbodycontent}
				size="md"
				heading="Important Link"
				show={this.state.linkmodal}
				onHide={this.hideLinkModal}
				saveData={ () => this.submitHandler("link")} />

				<Modalcontent
				modalbodycontent={notesmodalbodycontent}
				size="lg"
				heading="Important Notes"
				show={this.state.notesmodal}
				onHide={this.hideNotesModal}
				saveData={ () => this.submitHandler("notes")} />
			</div>
		);
	}
}


export default withRouter(headersubjectpage);