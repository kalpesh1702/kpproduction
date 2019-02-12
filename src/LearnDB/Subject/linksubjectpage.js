import React  from 'react';
import './subject.css';

function linksubjectpage(props){

	let bodycontent = props.linkdata.map( (data,index) =>{

		return <tr key={index}><td>{data.comments}</td><td>{data.link}</td></tr>

	});

	if(bodycontent.length === 0){

		bodycontent = <tr><td colSpan="2" style={{"textAlign":"center"}}>No Link Found</td></tr>

	}


	return (
		<div className="linktable">
			<table className="table table-bordered">
			    <thead>
			      <tr>
			        <th>Comment</th>
			        <th>Link</th>
			      </tr>
			    </thead>
			    <tbody>
			    	{bodycontent}
			    </tbody>
			</table>
		</div>
	);
}

export default linksubjectpage;