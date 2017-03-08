import React from "react";
import {render} from "react-dom";
import { Row, Col } from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import "../../css/pc_footer.css";

export default class MobileFooter extends React.Component{

	render(){
		return(
			<footer>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="footer">
						@copy;&nbsp;2017 News. ALl Rights Demo
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		);
	}
}