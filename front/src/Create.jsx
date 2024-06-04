import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'

function Create() {
  const [task, setTask] = useState()
  const inputRef = useRef(null);
  const handleAdd = () => {
    axios.post('http://localhost:3000/add', {task: task})
    .then(result => console.log(result))
    .catch(err => console.log(err))
    if (inputRef)
      inputRef.current.value = "";
  }
  return (
    <div>
			<input type="text" onChange={(e) => setTask(e.target.value)} onKeyDown={event => {if (event.key === 'Enter') {handleAdd()}}}  ref={inputRef} />
			<button type="button" onClick={handleAdd}>Add</button>
		</div>
  )
}

export default Create
