import React,{Component} from 'react';
import { Modal , Button} from 'react-bootstrap';

class Modalcontent extends Component{

	render(){

		return(
			<Modal show={this.props.show} onHide={this.props.onHide} size={this.props.size}>

				<Modal.Header closeButton>
				    <Modal.Title>{this.props.heading}</Modal.Title>
				</Modal.Header>

			  	<Modal.Body>
			  		{this.props.modalbodycontent}
			  	</Modal.Body>

				<Modal.Footer>
				    <Button onClick={this.props.onHide} variant="secondary">Close</Button>
				    <Button onClick={this.props.saveData} variant="primary">Save</Button>
				</Modal.Footer>

			</Modal>
		);
	}
}

export default Modalcontent;