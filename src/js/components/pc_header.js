import React from "react";

import Logo from "../../images/logo.png";
import {Row,Col, Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';

import PCRegister from "./pc_register.js";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;//页面提交
const TabPane = Tabs.TabPane;

import "../../css/pc_header.css";

export default class PCHeader extends React.Component{
	
	constructor(){
		super();
		this.state = {
			current:"top",
		}
	}



	//登陆注册的事件
	handlerClick(event){
		this.setState({
			current:event.key
		});
}



	render(){
		return(
			<header className="container">
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className="logo">
							<img src={Logo}/>
							<span>NEWS</span>
						</a>
					</Col>
					<Col span={12}>
						<Menu mode="horizontal" onClick={this.handlerClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>科技
							</Menu.Item>
						</Menu>
					</Col>
					<Col span={4}>
						<PCRegister />
					</Col>
					<Col span={2}></Col>
				</Row>
			
			</header>
			
		)
	}
}