import React, {
	Component,
} from 'react'

import Header from './header'
import LeftNav from './left-nav'
import './../style/base.css'
import 'antd/dist/antd.css'

export default class App extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const {
			children
		} = this.props
		return (
			<div id="page-wrapper">
				<Header />
        <div id="main-wrapper">
          <LeftNav />
        	<div id="page-content">{children}</div>
        </div>
			</div>
		)
	}
}