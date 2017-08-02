import compile from './compile/index'
import { h } from './vdom/index'

module.exports = function Vue(options) {
	const el = document.querySelector(options.el)
	const renderFunction = compile(getOuterHTML(el))
}

function getOuterHTML(dom) {
	return dom.outerHTML
}