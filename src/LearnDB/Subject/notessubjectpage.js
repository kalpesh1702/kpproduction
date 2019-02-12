import React  from 'react';
import './subject.css';

function notessubjectpage(props){

	let colorArray =[ 	{color: "#8a6d3b",backgroundColor: "#fcf8e3",borderColor: "#faebcc"},
						{color: "#a94442",backgroundColor: "#f2dede",borderColor: "#ebccd1"},
						{color: "#31708f",backgroundColor: "#d9edf7",borderColor: "#bce8f1"},
						{color: "#3c763d",backgroundColor: "#dff0d8",borderColor: "#d6e9c6"},
						{color: "#fff",backgroundColor: "#337ab7",borderColor: "#337ab7"},
						{color: "#333",backgroundColor: "#f5f5f5",borderColor: "#ddd"},
						{color: "#8a6d3b",backgroundColor: "#fcf8e3",borderColor: "#faebcc"},
					];
	let Randomcss = (props.index) % 6;

	return(
		<div className="custompanel">
        	<div className="custompanel-heading" style={colorArray[Randomcss]}>{props.notesdata.comments}</div>
        	<div className="custompanel-body">{props.notesdata.notes}</div>
      	</div>
	);
}

export default notessubjectpage;