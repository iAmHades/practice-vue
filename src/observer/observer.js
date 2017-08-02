'use strict'
import Dep from './dep'

export default function observer(obj) {
	return new Observer(obj)
}

function Observer(obj){
	// 该处其实情况很多，目前我们就考虑简单的数据结构
	if (Array.isArray(obj)) {
		// 处理简单数组，
		obj.forEach((data) => {
			walk(data)
		})
	} else {
		walk(obj)
	}
}

function walk(obj) {
	Object.keys(obj).forEach((key) => {
		defineReactive(obj, key, obj[key])
	})
}

function defineReactive(obj, key, val) {
	var dep = new Dep()
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter() {
			return val
		},
		set: function reactiveSetter(newVal) {
			console.info(newVal)
		}
	})
}