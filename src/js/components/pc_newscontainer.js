

import React from "react";
import logo from "../../images/logo.png";
import {Col,Row,Carousel,Tabs} from "antd";
import "../../css/pc_newscontainer.css";
import PCNewsBlock from "./pc_news_block.js";
import PCNewsImageBlock from "./pc_news_image_block.js";


import PCProduct from './pc_products';

import PCNewsImageSBlock from "./pc_news_image_s_block.js"

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{

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
		const settings = {
			dots:true,
			infinite:true,
			speed:1000,
			slidesToShow:1,
			autoplay:true,
			autoplaySpeed:3000
		}

		return(

			<div className="container">

				<Row>
					<Col span="2"></Col>
					<Col span="8">
						<div className="leftContainer">
							<div  className="carousel">
								<Carousel {...settings}>
									<div>
										<a>
											<img src="http://www.iwen.wiki/zhichenshop/l1.jpg" />
										</a>
									</div>
									<div>
										<a>
											<img src="http://www.iwen.wiki/zhichenshop/l2.jpg" />
										</a>
									</div>
									<div>
										<a>
											<img src="http://www.iwen.wiki/zhichenshop/l3.jpg" />
										</a>
									</div>
									<div>
										<a>
											<img src="http://www.iwen.wiki/zhichenshop/l4.jpg" />
										</a>
									</div>
								
								</Carousel>
							</div>
						</div>
						<div className="leftContainer" >
							<PCNewsImageBlock   className="carousel" count={8} type="guoji"  cartTitle="国际头条" imageWidth="112px"/>
						</div>
						
					</Col>
					<Col className="rightContainer" span="12">
						<Tabs>
							<TabPane tab="娱乐" key="1">
								<PCNewsBlock count={19} type="yule" width="100%"/>
							</TabPane>
							<TabPane tab="科技" key="2">
								<PCNewsBlock count={19} type="keji" width="100%"/>
							</TabPane>
							<TabPane tab="国内" key="3">
								<PCNewsBlock count={19} type="guonei" width="100%"/>
							</TabPane>
							<TabPane tab="国际" key="4">
								<PCNewsBlock count={19} type="guoji" width="100%"/>
							</TabPane>
						</Tabs>
					</Col>
					<Col span="2"></Col>
				</Row>
				<Row>
					<Col span="2"></Col>
					<Col span="20">
						<PCNewsImageBlock cartTitle="娱乐新闻" type="yule" count={15} width="100%" imageWidth="100px"/>
						<PCNewsImageBlock cartTitle="国内新闻" type="guonei" count={15} width="100%" imageWidth="100px"/>
						<PCNewsImageBlock cartTitle="国际新闻" type="guoji" count={8} width="100%" imageWidth="100px"/>
					</Col>
					<Col span="2"></Col>
				</Row>
				<Row>
					<Col span="2"></Col>
					<Col span="20">
						<Tabs class="tabs_product">
							<TabPane tab="ReactNews 产品" key="1">
								<PCProduct/>
							</TabPane>
						</Tabs>
					</Col>
					<Col span="2"></Col>
				</Row>

			</div>

			
		)
	}
}



