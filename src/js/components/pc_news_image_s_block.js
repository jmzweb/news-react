import React from "react";
import {Card} from "antd";
import {Row,Col,Router,Route,Link,browserHistory} from "react-router";

import "../../css/sBlock.css";

export default class PCNewsImageSBlock extends React.Component{
	constructor(){
		super();
		this.state = {
			news:""
		}
	}

	componentWillMount(){
		var myFetchOptions = {
			method:"GET"
		};
		fetch("http://iwen.wiki/sxtstu/news/news.php?type="+this.props.type+
			"&count="+this.props.count,myFetchOptions)
		.then(response => response.json())
		.then(json => this.setState({news:json}))
	}

	render(){


		const styleH3 = {
			width:this.props.imageWidth,
			whiteSpace:"nowrap",
			overflow:"hidden",
			textOverflow:"ellipsis"
		}
		const {news} = this.state;
		const newsList = news.length
		?
		news.map((newsItem,index)=>(

			<div key={index} className="sBlock">
			
				<Link to={`details/${newsItem.uniquekey}`}>
					<img  className="imgStyle"  src={newsItem.thumbnail_pic_s}   alt="" />
					<div>
						<h3>{newsItem.title}</h3>
						<p>{newsItem.author_name}</p>
					</div>
				</Link>
				
			</div>
		))
		:
		"没有加载到任何新闻"
		return(
			<div className="topNewsList">
				<Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>{newsList}</Card>
			</div>
		)
	}
}