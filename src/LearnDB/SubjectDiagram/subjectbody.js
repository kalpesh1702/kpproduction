import React from 'react';
import './subjectbody.css';


function subjectbody(props){

 	return (

 		<div className="showcase" onClick={props.click}>
			<div className="explore-card-base">
				<div className="top-inner-layer" style={{"background" : props.color}}>
					<div className="title">{props.subject.name}</div>
				</div>
				<div className="bot-base">
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