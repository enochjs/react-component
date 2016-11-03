import React, {
  Component,
} from 'react'
import {
  Menu,
  Icon,
} from 'antd'
import {
  Link,
  browserHistory,
} from 'react-router'

import config from './../config'

const SubMenu = Menu.SubMenu
const menuList = config.menuList

export default class LeftNav extends Component {
  constructor(props) {
    super(props)
  }
  handleClick = (e) => {
    browserHistory.push(`/${e.key}`); // history的方式。
  }
  render() {
    return (
      <nav id='nav' className="ant-col-lg-4">
        <Menu 
        	onClick={this.handleClick}
        	mode="inline"
            >
          {
          	menuList.map((menu, index) => 
          		<SubMenu key={menu.name} title={<span><Icon type="appstore" /><span>{menu.name}</span></span>}>
          			{
          				menu.children.map((subMenu, subIndex) =>
          					<Menu.Item key={subMenu.route}>
          						{
          							//Link 的方式实现
          							/*  <Link to={subMenu.route}>{subMenu.name}</Link>   */  
          						}
          						{subMenu.name}
          					</Menu.Item>
          				)
          			}
          		</SubMenu>
          	)
         }
        </Menu>
  		</nav>
    )
  }
}