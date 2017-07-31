import compile from './compile/index'

export default function Vue(options) {
	const el = document.querySelector(options.el)
	const render = compile(getOuterHTML(el))
	console.info(render)
}

function getOuterHTML(dom) {
	return dom.outerHTML
}