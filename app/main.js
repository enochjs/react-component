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
	//Route,
	//useRouterHistory,
	//IndexRoute,
	browserHistory
} from 'react-router'

// browserHistory 用html5的api 需要额外的配置 如果使用webpack-dev-server 启动只需加入historyApiFallback: true即可

// import { createHashHistory } from 'history'
// 去除hashHistory产生的字符串 
// 不去除的话看到的url会是这样：/#/user/haishanh?_k=adseis
// const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false }); 


import { createStore } from 'redux'	

// react-redux 
// Provider 允许组件使用connect方法
// connect 方法的主要作用，连接store 和 组件，将store中的数据作为props传入组件中
// connect接收四个参数 
// 1）type function mapDispatchToProps (state, props) => {} 
// 2) type function or object mapDispatchToProps 目前为止用默认的dispatch就好
// 3) type function mergeProps 
// 4) type object  { pure = true, witdhRef = false } withRef = true 时通过 getWrappedInstance() 方法可以获得connect里面包装的组件
import { Provider } from 'react-redux'
import rootReducer from './reducers'

import App from './containers'
import LeftNav from './containers/left-nav'
import routes from './routes'
import Immutable from 'immutable'

const initialState = Immutable.Map()

const store = createStore(rootReducer, initialState)

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			{ routes }
		</Router>
	</Provider>,
	document.getElementById('root')
)