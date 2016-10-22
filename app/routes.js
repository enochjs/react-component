import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
} from 'react-router'
import App from './containers'
import {
	expandTable
} from './component/table'

console.log(App)
console.log(expandTable)

const routes = (
  <Route path="/" component={App}>
    <Route path='/table' component={expandTable} />
  </Route>
)

export default routes