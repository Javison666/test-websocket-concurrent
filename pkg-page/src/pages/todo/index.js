import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../actions'
import TodoList from './TodoList'

import { Button } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// eslint-disable-next-line
import zhCN from 'antd/lib/locale-provider/zh_CN';
import "antd/dist/antd.css";
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <Button type="primary">Example button</Button>
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
      <TodoList></TodoList>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo