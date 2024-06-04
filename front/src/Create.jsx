import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import configData from "../config.json";

function Create() {
  const [task, setTask] = useState()
  const inputRef = useRef(null);
  const handleAdd = () => {
    axios.post(`${configData.BACK_END_URL}add`, {task: task})
    .then(result => console.log(result))
    .catch(err => console.log(err))
    if (inputRef) {
      inputRef.current.value = "";
      setTask("");
		}
  }
  return (
    <div>
			<input type="text" onChange={(e) => setTask(e.target.value)} onKeyDown={event => {if (event.key === 'Enter') {handleAdd()}}}  ref={inputRef} />
			<button type="button" onClick={handleAdd}>Add</button>
		</div>
  )
}

export default Create
