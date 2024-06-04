const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://test:test@todo-react.wppa9ep.mongodb.net/todo-react?retryWrites=true&w=majority&appName=todo-react";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions);

app.get("/get", (req, res) => {
  TodoModel.find()
	.then(result => res.json(result))
	.catch(err => res.json(err))
})
app.post("/add", (req, res) => {
	const task = req.body.task;
	TodoModel.create({
		task: task
	})
	.then(result => res.json(result))
	.catch(err => res.json(err))
})
app.put("/update/:id", (req, res) => {
	const {id} = req.params;
	TodoModel.findByIdAndUpdate({_id: id}, req.body.todo)
	.then(result => res.json(result))
	.catch(err => res.json(err))
})
app.delete("/delete/:id", (req, res) => {
	const {id} = req.params;
	TodoModel.deleteOne({_id: id})
	.then(result => res.json(result))
	.catch(err => res.json(err))
})
app.listen(3000, () => console.log("Server is running"))