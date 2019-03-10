import React  from 'react';
import './subject.css';
import { MdEdit , MdDelete } from "react-icons/md";

function linksubjectpage(props){

	let bodycontent = props.linkdata.map( (data,index) =>{

		return 	<tr key={index} className="linktablerow">
					<td>{data.comments}</td>
					<td>{data.link}
						<div className="updateRow">
							<MdEdit className="editRow"/>
							<MdDelete className="deleteRow"/>
						</div>
					</td>
				</tr>
	});

	if(bodycontent.length === 0){

		bodycontent = <tr><td colSpan="2" style={{"textAlign":"center"}}>No Link Found</td></tr>

	}


	return (
		<div className="linktable">
			<table className="table table-bordered">
			    <thead>
			      <tr>
			        <th width="25%">Comment</th>
			        <th width="75%">Link</th>
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