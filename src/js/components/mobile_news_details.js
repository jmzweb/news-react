import React from "react";
import {Row,Col,BackTop} from "antd";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import PCNewsComment from "./pc_news_comment.js";

import {Router,Route,Link,browerHistory}  from "react-router";

import "../../css/mobile_news_details.css";

export default class MobileNewsDetails extends React.Component{
	constructor(){
		super();
		this.state={
			newsItem:""
		};
	}
	componentDidMount(){
		var myFetchOptions={
			method:"GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
			+this.props.params.uniquekey,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({newsItem:json});
			console.log(json);
		})
	}
	createMarkup(){
		return {__html:this.state.newsItem.pagecontent};
	}
	render(){

		return(
			<div>
				<MobileHeader/>
				<div className="mobileDetails">
					<Row className="mobileDetailscontent">
						<Col span="24">
							<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						</Col>
					</Row>
					<PCNewsComment/>
				</div>
				<MobileFooter/>
			</div>
		);
		
	}
}