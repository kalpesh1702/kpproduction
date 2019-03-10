import React from 'react';
import './subjectbody.css';
import { MdEmail , MdFileDownload } from "react-icons/md";
import DialogModal from 'sweetalert2';


function subjectbody(props){

	let sendemailalert  = () => {

		let subjectname = props.subject.name;

		DialogModal.fire({
			title: 'Please Enter Email Address',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Submit',
		})
		.then((result) => {
			if(!result.dismiss){
				props.sendemail(result,subjectname);
			}
		})
	}

 	return (

 		<div className="showcase">
			<div className="explore-card-base">
				<div className="top-inner-layer" style={{"background" : props.color}}>
					<div className="right-inner-layer" style={{"borderColor":props.color}}>
						<MdEmail onClick={sendemailalert} className="printicon" style={{"color" : props.color}}/>
						<MdFileDownload onClick={props.download} className="downloadicon" style={{"color" : props.color}}/>
					</div>
					<div className="title">{props.subject.name}</div>
				</div>
				<div className="bot-base" onClick={props.click}>
					<div className="row">
						<div className="col-sm-6">
							<div className="big-number">{props.subject.totallinks}</div>
							<div className="text-label">Link</div>
						</div>
						<div className="col-sm-6">
							<div className="big-number">{props.subject.totalnotes}</div>
							<div className="text-label">Notes</div>
						</div>
					</div>
				</div>
			</div>
		</div>

 	);
}

export default subjectbody;