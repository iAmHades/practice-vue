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
		// 因为修改data为响应式,这样就能通过getter函数，完成依赖的收集，
		// 因为渲染函数中在使用这些变量进行渲染的时候，会触发getter函数，
		this._ob = observer(this._data)
		// watcher函数则用来声明第一次收集依赖
		this._watcher = new Watcher(this, renderFunction, this._update)
			// init的时候
		this._update(this._watcher.value)
	}

	_update(vtree) {
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