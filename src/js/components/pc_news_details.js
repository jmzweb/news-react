import React  from "react";
import {Row,Col} from "antd";
import PCHeader from "./pc_header.js";
import PCFooter from "./pc_footer.js";
import PCNewsComment from "./pc_news_comment.js";
import PCNewsImageBlock from "./pc_news_image_block.js";

import "../../css/pc_news_details.css";

export default class PCNewsDetails extends React.Component{

	constructor(){
		super();
		this.state = {
			newsItem:""
		}
	}

	componentDidMount(){
		var myFetchOptions = {
			method:"GET"
		}
		fetch("http://iwen.wiki/sxtstu/news/newsdetails.php?uniquekey="+this.props.params.uniquekey,myFetchOptions)
		.then(response=>response.json())
		.then(json => {
			this.setState({newsItem:json});
		})
	}

	createMark(){
		return {
			__html:this.state.newsItem.pagecontent
		}
	}

	render(){
		return (
			<div  className="container">
				<PCHeader/>
				<Row>
					<Col span={2}></Col>
					<Col span={20}  className="clearfix">
						<div  className="articleRight">
							<PCNewsImageBlock count={8} type="top" width="100%" cardTitle="相关新闻" imageWidth="200px"/>
						</div>
						<div className="articleContainer" dangerouslySetInnerHTML={this.createMark()}></div>
						
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCNewsComment />
				<PCFooter/>
			</div>
		)
	}

}