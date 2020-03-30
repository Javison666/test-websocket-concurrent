import { combineReducers,createStore } from 'redux'
import todos from './reduce/todo'
// import visibilityFilter from './visibilityFilter'

const reducers = combineReducers({
  todos,
//   visibilityFilter
})

let store = createStore(reducers)

export default store