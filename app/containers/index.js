import React, {
	Component,
} from 'react'

import Header from './header'
import LeftNav from './left-nav'
import Footer from './footer'
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
        <div id="main-wrapper" className="ant-row">
          <LeftNav />
        	<div id="page-content" className="ant-col-lg-20">{children}</div>
        </div>
        <Footer />
			</div>
		)
	}
}