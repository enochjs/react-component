import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
} from 'react-router'
import App from './containers'
import {
	expandTable
} from './pages/table'

const routes = (
  <Route path="/" component={App}>
    <Route path='/expandTable' component={expandTable} />
  </Route>
)

export default routes