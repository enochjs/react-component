import React, {
	Component,
} from 'react'

import './layout.css'

export default class LeftNav extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<header id="nav-header">
			  <span className="logo">Enochjs</span>
			  <span className="pull-right">Github</span>
			</header>
		)
	}
}