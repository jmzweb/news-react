import React from "react";
import {render} from "react-dom";
import MobileHeader from "./mobile_header.js";
import MobileFooter from "./mobile_footer.js";
import MobileList from "./mobile_list.js";

import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Carousel} from 'antd';
const TabPane = Tabs.TabPane;


export default class MobileIndex extends React.Component{
	render(){

		const settings = {
			dots:true,
			infinite:true,
			speed:500,
			slidesToShow:1,
			autoplay:true
		}

		return(

			<div>
				<MobileHeader/>

				<Tabs>
					
					<TabPane tab="头条" key="1">
						<div className="carousel">
							<Carousel {...settings}>
								<div>
									<img src="http://www.iwen.wiki/zhichenshop/l1.jpg" />
								</div>
								<div>
									<img src="http://www.iwen.wiki/zhichenshop/l2.jpg" />
								</div>
								<div>
									<img src="http://www.iwen.wiki/zhichenshop/l3.jpg" />
								</div>
								<div>
									<img src="http://www.iwen.wiki/zhichenshop/l4.jpg" />
								</div>
							</Carousel>
						</div>
						<MobileList count={20} type="top"/>
					</TabPane>


					<TabPane tab="国内" key="2">
						<MobileList count={20}  type="guonei"/>
					</TabPane>
					<TabPane tab="国际" key="3">
						<MobileList count={20}  type="guoji"/>
					</TabPane>
					<TabPane tab="娱乐" key="4">
						<MobileList count={20}  type="yule"/>
					</TabPane>
					<TabPane tab="科技" key="5">
						<MobileList count={20}  type="keji"/>
					</TabPane>
					
				</Tabs>

				<MobileFooter/>
			</div>
		)
	}
}