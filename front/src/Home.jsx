import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Create from './Create'
import configData from "../config.json";

function Home() {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${configData.BACK_END_URL}get`)
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
    setLoading(false)
  })
  const handleToggle = (todo, event) => {
    todo.isDone = !todo.isDone;
    event.target.checked = todo.isDone;
    handleEdit(todo);
  }
  const handleEdit = (todo) => {
    axios.put(`${configData.BACK_END_URL}update/${todo._id}`, {todo: todo})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
  const handleDelete = (id) => {
    axios.delete(`${configData.BACK_END_URL}delete/${id}`)
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
  if (loading) {
    return <p>Loading data...</p>;
  }
  return (
    <div id="home">
		<h1>To Do List</h1>
		<Create />
    {
      !todos.length
      ? <div>No data</div>
      : todos.map(todo => (
        <div className="todo-item" key={todo._id}>
          <input className="todo-block checkbox" type="checkbox" onChange={(event) => handleToggle(todo, event)} checked={todo.isDone} />
          <div className="todo-block name">{todo.task}</div>
          <div className="todo-block delete" onClick={() => handleDelete(todo._id)}>X</div>
          </div>
      ))}
		</div>
  )
}

export default Home
