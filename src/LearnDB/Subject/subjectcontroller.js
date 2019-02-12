import React, { Component } from 'react';
import Axios from 'axios';
import LoaderController from './../../Loader/loader.js';
import HeaderSubject from './headersubjectpage.js';
import LinkSubject from './linksubjectpage.js';
import NotesSubject from './notessubjectpage.js';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert'
import './subject.css';

class subjectcontroller extends Component{

	constructor(props){
		super(props);

		this.state = {
			loader : true,
			tabkey : "link",
			linkData : [],
			notesData: [],
			subjectname : (this.props.location.pathname).replace("/subject/", "")
		}

	}

	refreshpage = () => {

		this.setState({
			loader : true
		})

		this.fetchdata();

	}

	fetchdata = () => {

		Axios.get('/subjects/fetchdata',{
			params:{
				subjectname: this.state.subjectname
			}
		})
		.then((response) => {

			this.setState({
				'loader' : false,
				'linkData': response.data.linkdata,
				'notesData': response.data.notesdata
			})
		 })
		.catch((error) => {
		    console.log(error);
		});

	}

	changetabkey = (key) => {
		this.setState({
			'tabkey' : key
		})
	}


	componentDidMount(){

		this.fetchdata();

	}

	render(){

		let notespanel ="";

		notespanel = this.state.notesData.map(function(element , index){
			return <NotesSubject key={index} index={index} notesdata={element} />
		});

		if(this.state.notesData.length == 0){

			notespanel =  <Alert variant="danger">No Notes Found</Alert>;

		}

		return(

			(this.state.loader)

		 	?
		 		<LoaderController />
		 	:

		 	<div>
		 		<HeaderSubject
		 			refresh={this.refreshpage}
		 			linkformcontroller={this.linkformcontroller}
		 			subjectname={this.state.subjectname} />

		 		<Tabs
			        id="controlled-tab"
			        activeKey={this.state.key}
			        onSelect={(key) => this.changetabkey(key) }>

			        <Tab eventKey="link" title="Link">
			          	<LinkSubject linkdata={this.state.linkData} />
			        </Tab>

			        <Tab eventKey="notes" title="Notes">
			          	{notespanel}
			        </Tab>

			    </Tabs>
		 	</div>

		);
	}

}

export default subjectcontroller;