import React from 'react'

//ReactDOM 实际上是个对象
//   var ReactDOM = {
//   findDOMNode: findDOMNode,
//   render: ReactMount.render,
//   unmountComponentAtNode: ReactMount.unmountComponentAtNode,
//   version: ReactVersion,

//   unstable_batchedUpdates: ReactUpdates.batchedUpdates,
//   unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
// };

// ReactDOM.render() params (nextElement, container, callback)
import ReactDOM from 'react-dom'


import {
	Router,
	Route,
	useRouterHistory,
	IndexRoute,
	browserHistory
} from 'react-router'

// browserHistory 用html5的api 需要额外的配置 如果使用webpack-dev-server 启动只需加入historyApiFallback: true即可

// import { createHashHistory } from 'history'
// 去除hashHistory产生的字符串 
// 不去除的话看到的url会是这样：/#/user/haishanh?_k=adseis
// const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false }); 

import App from './containers'
import LeftNav from './containers/left-nav'
import routes from './routes'

ReactDOM.render(
	<Router history={browserHistory}>
		{ routes }
	</Router>,
	document.getElementById('root')
)