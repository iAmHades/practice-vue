import compile from './compile/index'

module.exports = function Vue(options) {
	const el = document.querySelector(options.el)
	const renderFunction = compile(getOuterHTML(el))

	console.info(renderFunction)
}

function getOuterHTML(dom) {
	return dom.outerHTML
}