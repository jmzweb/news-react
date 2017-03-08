import React from "react";
import {render} from "react-dom";
import Logo from "../../images/logo.png";
import {Row,Col, Menu, Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';

import {Router,Route,Link,browserHistory} from "react-router";

import "../../css/pc_register.css";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;//页面提交
const TabPane = Tabs.TabPane;


class PCRegister extends React.Component{


	constructor(){
		super();
		this.state = {
			userNickName:"未知",
			hasLogined:false,
			current:"top",
			modalVisible:false,
			action:"login",
			userid:0
		}
	}

	//用户打开页面判断是否曾经登陆过
	componentWillMount(){
		if(localStorage.userid != ""){
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.Userid});
		}
	}

	/*
		获取状态：this.state
		设置状态：this.setState({
			
		})

	*/

	//登陆注册的事件
	handlerClick(event){
		if(event.key == "register"){
			//注册
			this.setState({
				current:"register"
			});
			this.setModalVisible(true);
		}
		if(event.key == "logout"){
			//正在登陆中
		}
	}


	//控制模态框显示与隐藏
	setModalVisible(value){
		this.setState({
			modalVisible:value
		})
	}

	//提交事件
	handlerSubmit(event){
		event.preventDefault();
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		//请求方式  GET
		var myFetchOptions = {
			method:"GET"
		}
		//调用fetch  action= login register
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			if(this.state.action == "register"){
				this.setState({
					hasLogined:true,
					userNickName:formData.r_userName
				})
			}else{
				this.setState({
					hasLogined:true,
					userNickName:json.NickUserName,
					userid:json.UserId
				})
			}
			//本地存储数据
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
		})

		//给出用户提示
		message.success("请求成功");
		//关闭窗口
		this.setModalVisible(false);
	}

	//判断是登陆还是注册
	callback(key){
		if(key == "1"){
			//我的登陆和注册的网络请求地址都是一个地址，但是字段不一样
			this.setState({
				action:"login"
			})
		}
		if(key == "2"){
			this.setState({
				action:"register"
			})
		}
	}

	logout(){
		localStorage.userid = "";
		localStorage.userNickName = "";
		this.setState({
			hasLogined:false
		})
	}


	render(){
		//getFieldProps 获取输入框中的内容的方法
		var {getFieldProps} = this.props.form;//接受页面次参数
		var userShow = this.state.hasLogined
		?
		<Menu.Item key="logout" className="register  registered">
			<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
			&nbsp;&nbsp;
			<Link target="_blank" to={`/selfcenter`}>
				<Button type="dashed" htmlType="button">个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item> 
		:
		<Menu.Item key="register" className="register">
			<Icon type="github" />注册/登陆
		</Menu.Item>
		return(
			<div>
				<Menu mode="horizontal" onClick={this.handlerClick.bind(this)} >
					{userShow}
				</Menu>
				<Modal title="用户中心" wrapClassName="vertial-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
				<Tabs type="card" onChange={this.callback.bind(this)}>
					<TabPane tab="登陆" key="1">
						<Form horizontal onSubmit={this.handlerSubmit.bind(this)}>
							<FormItem label="账户">
								<Input placeholder="请输入您的账号" {...getFieldProps("userName")} />
							</FormItem>
							<FormItem label="密码">
								<Input type="password" placeholder="请输入您的密码" {...getFieldProps("password")} />
							</FormItem>
							<Button type="primary" htmlType="submit">登陆</Button>
						</Form>
					</TabPane>


					<TabPane tab="注册" key="2">
						<Form horizontal onSubmit={this.handlerSubmit.bind(this)}>
							<FormItem label="账户">
								<Input placeholder="请输入您的账号" {...getFieldProps("r_userName")} />
							</FormItem>
							<FormItem label="密码">
								<Input type="password" placeholder="请输入您的密码" {...getFieldProps("r_password")} />
							</FormItem>
							<FormItem label="确认密码">
								<Input type="password" placeholder="请再次输入您的密码" {...getFieldProps("r_confirmpassword")} />
							</FormItem>
							<Button type="primary" htmlType="submit">注册</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</div>
			
		)
	}
}
export default PCRegister = Form.create({})(PCRegister);