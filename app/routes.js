import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
} from 'react-router'
import App from './containers'
import {
	expandTable
} from './pages/table'
import { MessageList } from './pages/context'

const routes = (
  <Route path="/" component={App}>
    <Route path='/expandTable' component={expandTable} />
    <Route path='/context' component={MessageList} />
  </Route>
)

export default routes