// import { combineReducers } from 'redux'

// redux-immutable
import { combineReducers } from 'redux-immutable'
import {
  expandTableList,
} from './expand-table'
console.log(expandTableList)
const rootReducer = combineReducers({
	expandTableList,
})

console.log("========reducer")
console.log(rootReducer)

export default rootReducer
