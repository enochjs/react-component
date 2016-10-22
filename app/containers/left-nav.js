import React, {
	Component,
} from 'react'
import {
	Menu,
	Icon
} from 'antd'
const SubMenu = Menu.SubMenu

export default class LeftNav extends Component {
	constructor(props) {
		super(props)
	}
	handleClick = () => {
		console.log('handleClick')
	}
	render() {
		return (
			<nav id='nav'>
        <Menu 
        	onClick={this.handleClick}
        	style={{width: 240}}
        	mode="inline"
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Table</span></span>}>
            <Menu.Item key="1">Expand Table</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
        </Menu>
			</nav>
		)
	}
}