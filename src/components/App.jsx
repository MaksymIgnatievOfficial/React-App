import "../assets/App/css/App.css"
import Footer from "./blocks/_footer"
import TodoBlock from "./blocks/_todoBlock"
import LabelCoppied from "./blocks/_text_copied_label"
import { useState, useRef } from "react"
export default function App() {
	const [classes, setClasses] = useState(["coppied-label"])
	const LabelCoppiedElement = useRef(LabelCoppied)
	return (
		<div className="App">
			<LabelCoppied classes={classes} />
			<TodoBlock />
			<Footer />
		</div>
	)
}
