import React, { useState, useEffect, useRef } from "react"
// import { v4 as uuidv4 } from "uuid"
import copy from "clipboard-copy"
const LOCAL_STORAGE_TODOS_KEY = "todos"

export default function _todoBlock({ toggleClasses: coppied }) {
	const [todos, setTodos] = useState([])
	const [input, setInput] = useState("")
	const [editingIndex, setEditingIndex] = useState(null)
	const [editText, setEditText] = useState("")

	const inputRef = useRef(null)
	const addTodoRef = useRef(null)
	const editTextInputRef = useRef(null)

	useEffect(() => {
		setTodos(JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)))
		inputRef.current.focus()
		inputRef.current.addEventListener("keypress", (e) => {
			if (e.code === "Enter") {
				addTodoRef.current.click()
			}
		})
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos))
	}, [todos])

	const addTodo = () => {
		let text = input.trim()
		try {
			var parsed = JSON.parse(text)
		} catch {
			parsed = undefined
		}

		if (parsed !== undefined && text !== "{}") {
			let keys = Object.keys(parsed)
			if (keys.includes("text") && keys.includes("isComplete")) {
				setTodos((arr) => {
					if (parsed.hasOwnProperty("order")) {
						const newTodos = arr.map((todo) => {
							if (todo.order >= parsed.order) {
								return { ...todo, order: todo.order + 1 }
							}
							return todo
						})
						newTodos.splice(parsed.order, 0, parsed)
						return newTodos
					} else {
						return [...arr, { ...parsed, order: arr.length }]
					}
				})
			}
		} else if (text !== "") {
			setTodos((arr) => [
				...arr,
				{ text, isComplete: false, order: arr.length },
			])
		}

		setInput("")
		inputRef.current.focus()
	}
	const remodeTodo = (idx) => {
		setTodos((arr) => arr.filter((_, i) => i !== idx))
	}
	const moveUpTodo = (idx) => {
		const arr = [...todos]
		if (idx > 0) {
			;[arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]]
			--arr[idx].order
			++arr[idx - 1].order
		}
		setTodos(arr)
	}
	const moveDownTodo = (idx) => {
		const arr = [...todos]
		if (idx < arr.length - 1) {
			;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
		}
		setTodos(arr)
	}

	const toggleTodo = (idx) => {
		const newList = [...todos]
		const el = newList.find((_, i) => i === idx)
		el.isComplete = !el.isComplete
		setTodos(newList)
	}

	const copyTodo = (idx) => {
		let jsonString = JSON.stringify(todos.find((_, i) => i === idx))
		jsonString = "{\n\t"
			.concat(
				jsonString
					.replace("{", "")
					.replace("}", "")
					.split(",")
					.join(",\n\t")
			)
			.concat("\n}")
		copy(jsonString)
	}

	const handleEditClick = (index) => {
		const todoToEdit = todos[index]
		setEditingIndex(index)
		setEditText(JSON.stringify(todoToEdit))
	}

	const handleSaveClick = () => {
		try {
			const parsed = JSON.parse(editText)
			setTodos((arr) => {
				const updatedTodos = [...arr]
				updatedTodos[editingIndex] = { ...parsed, order: editingIndex }
				return updatedTodos
			})
			setEditingIndex(null)
		} catch {
			setEditingIndex(null)
		}
	}

	const handleInputChange = (event) => {
		setEditText(event.target.value)
	}

	return (
		<div className="todo-block">
			<h2>Create ToDo:</h2>
			<div className="create-todo">
				<input
					id="todo-input"
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
				/>
				<button ref={addTodoRef} onClick={() => addTodo()}>
					Add
				</button>
			</div>
			<ul>
				{todos.map((todo, idx) => (
					<li key={idx} className="todo-item">
						{editingIndex === idx ? (
							<>
								<input
									type="text"
									value={editText}
									onChange={handleInputChange}
									ref={editTextInputRef}
								/>
								<button onClick={handleSaveClick}>💾</button>
							</>
						) : (
							<>
								<button
									className="toggle-todo-btn"
									onClick={() => toggleTodo(idx)}
								>
									{todo.isComplete ? "✔️" : "❌"}
								</button>
								<span
									className={
										todo.isComplete ? "completed" : ""
									}
								>
									{todo.text}
								</span>
								<button onClick={() => handleEditClick(idx)}>
									✏️
								</button>
							</>
						)}

						<button
							className="icon-button"
							onClick={() => {
								coppied()
								copyTodo(idx)
							}}
						>
							📋
						</button>
						<button
							className="icon-button"
							onClick={() => remodeTodo(idx)}
						>
							🗑️
						</button>
						<button onClick={() => moveUpTodo(idx)}>↑</button>
						<button onClick={() => moveDownTodo(idx)}>↓</button>
					</li>
				))}
			</ul>
		</div>
	)
}
