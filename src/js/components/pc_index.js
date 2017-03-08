import React from "react";


import PCHeader from "./pc_header.js";
import  PCNewsContainer from "./pc_newscontainer.js";
import PCFooter from "./pc_footer.js";

export default class PCIndex extends React.Component{
	render(){
		return(
			<div>
				<PCHeader />
				<PCNewsContainer />
				<PCFooter />
			</div>
		)
	}
}