import React from "react";
import {render} from "react-dom";
import {Row,Col,Modal,Menu,Icon,Tabs,message,Form,Input,Button,Checkbox,Card,notification,Upload} from "antd";

import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";

import "../../css/mobile_selfcenter.css";

const subMenu = Menu.subMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export default class MobileSelfcenter extends React.Component{
	constructor(){
		super();
		this.state = {
			usercollection:"",
			usercomments:"",
		}
	}
	componentDidMount(){
		var myFetchOptions={
			method:"GET"
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
		.then(response=>response.json())
		.then(json => {
			this.setState({usercollection:json});
			console.log(localStorage.userid);
		});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" +localStorage.userid,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
				usercomments:json
			});
			console.log(json);
		})
	}
	render(){
		const props = {
			action:"http://newsapi.gugujiankong.com/handler.ashx",
			headers:{
				"Access-Control-Allow-Origin":"*"
			},
			listType:'picture-card',
			defaultFileList:[
				{
					uid:-1,
					name:'xxx.png',
					state:'done',
					url:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
					thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
				}
			]
		}

		const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length
		?
		usercollection.map((uc,index)=>(
			<Card  key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
				<p>{uc.Title}</p>
			</Card>
			
		))
		:
		"您还没有收藏任何的新闻，快去收藏一些新闻吧。";

		const usercommentsList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={`于 ${comment.datetime} 评论了文章`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'您还没有发表过任何评论。';
		return(
			<div>
				<MobileHeader/>
				<Row>
					<Col span="24">
						<Tabs>
							<TabPane   tab="我的收藏列表"  key="1">
								<div  className="mobileSelfcenterContent">
									<Row>
										<Col span="24">
											{usercollectionList}
										</Col>
									</Row>
								</div>
								
							</TabPane>
							<TabPane   tab="我的评论列表"  key="2">
								<Row className="mobileSelfcenterContent">
									<Col span="24">
										{usercommentsList}
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="头像设置" key="3">
								<div className="mobileSelfcenterContent">
									<Upload {...props}>
										<Icon type="plus"/>
										<div>上传照片</div>
									</Upload>
									<Modal  visible={this.state.modalVisible}  footer={null}  onCancel={this.handleCancel}>
										<img  src={this.state.previewImage}  alt="预览"  />
									</Modal>
								</div>
							</TabPane>
						</Tabs>
					</Col>
				</Row>
				<MobileFooter/>
			</div>
		)
	}
}