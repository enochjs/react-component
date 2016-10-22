import React from 'react'
import ReactDOM from 'react-dom'

import Test from './test'


//ReactDOM 实际上是个对象
//   var ReactDOM = {
//   findDOMNode: findDOMNode,
//   render: ReactMount.render,
//   unmountComponentAtNode: ReactMount.unmountComponentAtNode,
//   version: ReactVersion,

//   unstable_batchedUpdates: ReactUpdates.batchedUpdates,
//   unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
// };

// render params (nextElement, container, callback)
ReactDOM.render(
	<Test />,
	document.getElementById('root'),
	() => {
		console.log('reactDOM-callback')
	}
)