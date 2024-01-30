import "../assets/App/css/App.css"
import Footer from "./blocks/_footer"
import TodoBlock from "./blocks/_todoBlock"
import LabelCoppied from "./blocks/_text_copied_label"
export default function App(props) {
	return (
		<div className="App">
			<LabelCoppied />
			<TodoBlock />
			<Footer />
		</div>
	)
}
