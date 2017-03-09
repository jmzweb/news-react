import React  from "react";

import {Router,Route,Link,browserHistory} from "react-router";

import {Row,Col,Tabs,Button,Menu,Icon,message,Form,Input,CheckBox,Modeal,Card,notification} from "antd";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const subMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import PCNewsBlock from "./pc_news_block.js";

import "../../css/pc_news_comment.css";

class PCNewsComment extends React.Component{


	constructor(){
		super();
		this.state = {
			comments:""
		}
	}


	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		var url = window.location.href;
		var urlList = url.split("/");
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" +urlList[urlList.length-1], myFetchOptions).then(response => response.json()).then(json => {
			this.setState({comments: json});
			// var url = window.location.href;
			// var urlList = url.split("/");
			// console.log(urlList[urlList.length-1]);
		});
	};
	handleSubmit(e) {
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var url = window.location.href;
		var urlList = url.split("/");
		var formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + urlList[urlList.length-1] + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
			this.componentDidMount();
		})
	};

	addUserCollection() {
		var myFetchOptions = {
			method: 'GET'
		};
		var urlList = url.split("/");
		var formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + urlList[urlList.length-1] , myFetchOptions).then(response => response.json()).then(json => {
			//收藏成功以后进行一下全局的提醒
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
	};

	render(){

		let {getFieldProps} = this.props.form;
		const {comments} = this.state;
		const commentList = comments.length
		?
		comments.map((comment,index)=>(
			<Card key={index} title = {comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
				<p>{comment.Comments}</p>
			</Card>
		))
		:
		"没有加载到任何评论"
		
		return(

			<div>
				<Row>
					
					<Col span="24">
					<header className="commentHeader">评论</header>
						{commentList}
						<Form  onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label="您的评论" >
								<Input type="textarea" placeholder="" {...getFieldProps('remark',{initialValue:''})} />
							</FormItem>
							<Button type="primary" htmlType="submit">提交</Button>
							&nbsp;&nbsp;
							<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
						</Form>
					</Col>
					
				</Row>
			</div>
		)
		
	}
}


export default PCNewsComment = Form.create({})(PCNewsComment)