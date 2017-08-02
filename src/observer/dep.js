'use strict'
let id = 0

export default function Dep() {
	this.id = id++
	// 里面添加watcher 实例
	this.subs = []
}

Dep.target = null

Dep.prototype.depend = function() {
	// 跟watcher 相互建立绑定关系
	Dep.target.addDep(this)
}

Dep.prototype.notify = function() {
	this.subs.forEach((sub) => {
		// watcher这边的update方法，就直接调用patch完全重新渲染dom
		sub.update()
	})
}

Dep.prototype.addSub = function(sub) {
	this.subs.push(sub)
}

Dep.prototype.removeSub = function(sub) {
	var index = this.subs.indexOf(sub)
	if (index > -1) {
		return this.subs.splice(index, 1)
	}
}