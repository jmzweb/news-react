import React from "react";
import {render} from "react-dom";

import PCIndex from "./components/pc_index.js";
import PCNewsDetails from "./components/pc_news_details.js";
import PCSelfcenter from "./components/pc_selfcenter.js";


import MobileIndex from "./components/mobile_index.js";
import MobileNewsDetails from "./components/mobile_news_details.js";
import MobileSelfcenter from "./components/mobile_selfcenter.js";

import {Router,Route,hashHistory} from "react-router";



import 'antd/dist/antd.css';

import MediaQuery from "react-responsive";


class Root extends React.Component{
	render(){
		return(

			<div>
				<MediaQuery query="(min-device-width:1224px)">
					<Router history={hashHistory}>
						<Route path="/" component={PCIndex} />
						<Route path="/details/:uniquekey" component={PCNewsDetails} />
						<Route path="/selfcenter" component={PCSelfcenter} />

					</Router>
				</MediaQuery>
				<MediaQuery query="(max-device-width:1224px)">
					<Router history={hashHistory}>
						<Route  path="/"  component={MobileIndex}  />
						<Route  path="/details/:uniquekey"  component={MobileNewsDetails}  />
						<Route  path="/selfcenter" component={MobileSelfcenter} />

					</Router>
				</MediaQuery>
			</div>
		)
	}
}
render(<Root/>,document.getElementById("root"));