'use strict'
import Dep from './dep'

export default function observer(obj) {
	return new Observer(obj)
}

function Observer(obj) {
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
			console.info('...getter...')
				// watcher过程中，render函数的渲染触发getter，完成依赖收集
				// 其他形式触发的getter不再被收集
			if (Dep.target) {
				// 跟watcher建立绑定关系
				dep.depend()
			}
			return val
		},
		set: function reactiveSetter(newVal) {
			console.info('...setter...')
			if (newVal === val) return
			val = newVal
				//发生变化，则立刻广播出去
			dep.notify()
		}
	})
}