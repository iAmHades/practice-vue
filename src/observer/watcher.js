'use strict'
import Dep from './dep'

export default function Watcher(vm, expOrFn, cb) {
	this.vm = vm
	this.expression = expOrFn
	this.cb = cb
	this.newDeps = []
		// 开始收集前
	Dep.target = this
		// 获取当前watcher的真实值
	this.value = this.expression.call(vm, vm)
		// 收集结束
	Dep.target = null
}

Watcher.prototype.update = function() {
	let oldValue = this.value
	let newValue = this.expression.call(this.vm, this.vm)
	this.cb.call(this.vm, newValue, oldValue)
}

// 跟dep 相互建立绑定关系
Watcher.prototype.addDep = function(dep) {
	this.newDeps.push(dep)
	dep.addSub(this)
}