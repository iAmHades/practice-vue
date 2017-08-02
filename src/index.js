import compile from './compile/index'
import {
	h,
	patch
} from './vdom/index'
import observer from './observer/observer'
import Watcher from './observer/watcher'

export default class Vue {
	constructor(options) {
		this._options = options
		this._data = options.data
		proxyAttribute(this, this._data)
		this._el = document.querySelector(options.el)
		const renderFunction = compile(getOuterHTML(this._el))
		this._ob = observer(this._data)
		// 开发测试用，强制渲染函数渲染为VNode树，进行patch生成dom
		let vnode= renderFunction.call(this)
		this.update(vnode)
	}

	update(vtree) {
		if (!this._tree) {
			patch(this._el, vtree)
		} else {
			patch(this._tree, vtree)
		}
		this._tree = vtree
	}
}

Vue.prototype.h = h


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