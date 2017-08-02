import compile from './compile/index'
import {
	h
} from './vdom/index'

module.exports = function Vue(options) {
	this.options = options
	this.data = options.data
	proxyAttribute(this, this.data)
	const el = document.querySelector(options.el)
	const renderFunction = compile(getOuterHTML(el))
    
}

function getOuterHTML(dom) {
	return dom.outerHTML
}

function proxyAttribute(obj, data) {
	Object.keys(data).forEach((key) => {
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get: function() {
				return data[key]
			},
			set: function(newValue) {
				data[key] = newValue
			}
		})
	})
}