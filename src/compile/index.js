'use strict'

import parse from './html-prase.js'

const cache = Object.create(null)

export default function compile(html) {
	html = html.trim()
	const hit = cache[html]
	return hit || (cache[html] = renderFunction(parse(html)))
}

function renderFunction(ast) {
	let attrs, child, render
	// 遍历到最底层
	if (ast.children && ast.children.length===1 && typeof(ast.children[0])==='string') {
		if (ast.attrs.length > 0) {
    		return 'h("'+ast.tag+'", {attrs: '+ getAttrsStr(ast.attrsMap) +'}, "'+ast.children[0]+'")'
		}else{
			return 'h("'+ast.tag+'", "'+ast.children[0]+'")'
		}
	} else if(ast.children) {
		child = getChildRender(ast.children)
	}
	if (ast.attrs.length > 0) {
		render = 'h("'+ast.tag+'", {attrs: '+ getAttrsStr(ast.attrsMap) +'}, ['+child+'])'
	}else{
        render = 'h("'+ast.tag+'", ['+child+'])'
	}
	return render
}

function getChildRender(childs) {
	if (Array.isArray(childs)) {
		// 因为出来的childs会有空格的字符串
		childs = childs.filter((child) => {
			if (typeof(child) == 'string' && !child.trim()) return false
			else return true
		})
		return childs.map((child) => {
    			return renderFunction(child)
		       })
	}
}

function getAttrsStr(obj){
	let str = []
	Object.keys(obj).forEach((key)=> {
		str.push(key + ':"' + obj[key]+'"')
	})
	return '{'+ str.join(',')+'}'
}


function h() {}