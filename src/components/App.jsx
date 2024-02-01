import "../assets/App/css/App.css"
import Footer from "./blocks/_footer"
import TodoBlock from "./blocks/_todoBlock"
import LabelCoppied from "./blocks/_text_copied_label"
import { useRef } from "react"
export default function App() {
	const LabelCoppiedElement = useRef(LabelCoppied)
	function toggleCoppiedLabelClasses() {
		const element = LabelCoppiedElement.current
		if (!element.classList.contains("coppied-label-active")) {
			setTimeout(
				() => element.classList.toggle("coppied-label-active"),
				700
			)
			element.classList.toggle("coppied-label-active")
		}
	}
	return (
		<div className="App">
			<LabelCoppied refference={LabelCoppiedElement} />
			<TodoBlock toggleClasses={toggleCoppiedLabelClasses} />
			<Footer />
		</div>
	)
}
