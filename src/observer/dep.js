'use strict'

export default function Dep() {
	this.subs = []
}

Dep.prototype.notify = function() {
	this.subs.forEach((sub)=>{
		sub()
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