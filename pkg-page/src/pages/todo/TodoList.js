import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { connect } from 'react-redux'

let TodoList = ({ todos }) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} />
        ))}
    </ul>
)

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        case 'SHOW_ALL':
        default:
            return todos
    }
}

const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}
TodoList = connect(
    mapStateToProps
)(TodoList)

export default TodoList