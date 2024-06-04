const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

const port = 3000
const uri = "mongodb+srv://test:test@todo-react.wppa9ep.mongodb.net/todo-react?retryWrites=true&w=majority&appName=todo-react";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
try {
	mongoose.connect(uri, clientOptions);
	console.log("Database connected");
} catch {
	console.log("Database failed");
}

app.get("/get", (req, res) => {
  TodoModel.find()
	.then(result => res.json(result))
	.catch(err => res.json(err))
})
app.post("/add", (req, res) => {
	const task = req.body.task;
	if (task) {
		TodoModel.create({
			task: task
		})
		.then(result => res.json(result))
		.catch(err => res.json(err))
	} else {
		res.json({err: "No name"})
	}
})
app.put("/update/:id", (req, res) => {
	const {id} = req.params;
	if (id) {
		TodoModel.findByIdAndUpdate({_id: id}, req.body.todo)
		.then(result => res.json(result))
		.catch(err => res.json(err))
	} else {
		res.json({err: "No ID"})
	}
})
app.delete("/delete/:id", (req, res) => {
	const {id} = req.params;
	if (id) {
		TodoModel.deleteOne({_id: id})
		.then(result => res.json(result))
		.catch(err => res.json(err))
	} else {
		res.json({err: "No ID"})
	}
})
app.listen(port, () => console.log("Server is running. Port: " + port))