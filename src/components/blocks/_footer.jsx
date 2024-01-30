export default function _footer() {
	let domain = window.location.href
	domain = domain.slice(0, domain.length - 1)
	return (
		<footer>
			<div className="footer-wrapper">
				<div>{domain}</div>
				<div>@arrow_function &copy;</div>
			</div>
		</footer>
	)
}
