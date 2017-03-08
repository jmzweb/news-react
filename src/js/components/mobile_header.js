import React from "react";
import {render} from "react-dom";
import logo from "../../images/logo.png";
import "../../css/mobile_header.css";
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


 class MobileHeader extends React.Component{

 	constructor(){
 		super();
 		this.state = {
 			userNickName:"未知",
 			hasLogined:false,
 			current:"top",
 			action:"login",
 			userid:0
 		}
 	}

 	componentWillMount(){
 		if(localStorage.userid != ""){
 			this.setState({hasLogined:true});
 			this.setState({userNickName:localStorage.userNickName,userid:localStorage.Userid});
 		}
 	}

 	handlerClick(event){
 		if(event.key=="register"){
 			this.setState({
 				current:"register"
 			});
 			this.setModalVisible(true);
 		}
 	}

 	setModalVisible(value){
 		this.setState({
 			modalVisible:value
 		})
 	}

 	handlerSubmit(event){
 		event.preventDefault();
 		var formData = this.props.form.getFieldsValue();

 		var myFetchOptions = {
 			method:"GET"
 		}

 		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
 			+"&username="+formData.userName+"&password="+formData.password
 			+"&r_userName="+formData.r_userName+"&r_password="
 			+formData.r_password+"&r_comfirmPassword="
 			+formData.r_confirmPassword,myFetchOptions)
 		.then(response=>response.json())
 		.then(json=>{
 			console.log(json);
 			if(this.state.action=="register"){
 				this.setState({
 					hasLogined:true,
 					userNickName:formData.r_userName
 				})
 			}else{
 				this.setState({
 					hasLogined:true,
 					userNickName:json.NickUserName,
 					userid:json.Userid
 				});
 			}
 			localStorage.userid = json.Userid;
 			localStorage.userNickName = json.NickUserName;
 		})

 		message.success("请求成功");
 		this.setModalVisible(false);
 	}

 	callback(key){
 		if(key=="1"){
 			this.setState({
 				action:"login"
 			})
 		}
 		if(key=="2"){
 			this.setState({
 				action:"register"
 			})
 		}
 	}


 	login(){
 		this.setModalVisible(true);
 	}

 	logout(){
 		localStorage.userid="";
 		localStorage.userNickName="";
 		this.setState({
 			hasLogined:false
 		})
 	}


	render(){
		var {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined?
		<Icon type="ellipsis" onClick={this.logout.bind(this)}/>
		:
		<Icon type="setting" onClick={this.login.bind(this)} />
		return(
			
			<div id="mobileheader">
				<header>
					<img src={logo}/>
					<span>News</span>
					{userShow}
				</header>
				<Modal title="用户中心" wrapClassName="vertial-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
					<Tabs type="card" onChange={this.callback.bind(this)}>
						<TabPane tab="登陆" key="1">
							<Form horizontal onSubmit={this.handlerSubmit.bind(this)}>
								<FormItem label="账户">
									<Input placeholder="请输入您的账户" {...getFieldProps("userName")}/>
								</FormItem>
								<FormItem label="密码">
									<Input type="password" placeholder="请输入您的密码" {...getFieldProps("password")}/>
								</FormItem>
								<Button type="primary" htmlType="submit">登陆</Button>
							</Form>
						</TabPane>

						<TabPane tab="注册" key="2">
							<Form horizontal onSubmit={this.handlerSubmit.bind(this)}>
								<FormItem label="账户">
									<Input placeholder="请输入您的账户" {...getFieldProps("userName")} />
								</FormItem>
								<FormItem  label="密码">
									<Input type="password" placeholder="请输入您的密码" {...getFieldProps("r_password")}/>
								</FormItem>
								<FormItem>
									<Input  type="password"  placeholder="请再次输入您的密码" {...getFieldProps("r_confirmpassword")}/>
								</FormItem>
								<Button  type="primary"  htmlType="submit">注册</Button>
							</Form>
						</TabPane>

					</Tabs>
				</Modal>

			</div>
		)
	}
}

export default MobileHeader = Form.create({})(MobileHeader);