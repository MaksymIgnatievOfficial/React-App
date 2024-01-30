import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function _todoBlock() {
	const [todos, setTodos] = useState([
		{ isComplete: true, text: "DDoS a site" },
	])
	const addTodo = (text) => {
		setTodos((arr) => [...arr, { text, isComplete: false }])
	}
	const remodeTodo = (idx) => {
		setTodos((arr) => arr.filter((_, i) => i !== idx))
	}
	const toggleTodo = (idx) => {
		const newList = []
	}
	return (
		<div className="todo-block">
			<h2>Create ToDo:</h2>
			<div className="create-todo">
				<input type="text" />
				<button>Add</button>
			</div>
			<ul>
				{todos.map((todo) => (
					<li key={uuidv4()} className="todo-item" id={todo.text}>
						<button className="toggle-todo-btn">
							{todo.isComplete ? "✔️" : "❌"}
						</button>
						<label htmlFor={todo.text}>{todo.text}</label>
						<button
							onClick={
								() => {}
								// LabelCoppied.classList.contains(
								// 	"coppied-label-active"
								// )
								// 	? 0
								// 	: (LabelCoppied.classList.toggle(
								// 			"coppied-label-active"
								// 	  ),
								// 	  setTimeout(
								// 			() =>
								// 				LabelCoppied.classList.toggle(
								// 					".coppied-label-active"
								// 				),
								// 			700
								// 	  ))
							}
						>
							📋
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
