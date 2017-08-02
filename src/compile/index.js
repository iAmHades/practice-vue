'use strict'

import parse from './html-prase.js'
import textParser from './text-parser.js'

const cache = Object.create(null)

export default function compile(html) {
	html = html.trim()
	const hit = cache[html]
	return hit || (cache[html] = generateFunction(renderFunction(parse(html))))
}

function generateFunction(func){
	return new Function(func)
}

function renderFunction(ast) {
	let attrs, child, render
		// 遍历到最底层
	if (ast.children && ast.children.length === 1 && typeof(ast.children[0]) === 'string') {
		if (ast.attrs.length > 0) {
			return 'h("' + ast.tag + '", {attrs: ' + getAttrsStr(ast.attrsMap) + '}, ' + generateText(ast.children[0]) + ')'
		} else {
			return 'h("' + ast.tag + '", ' + generateText(ast.children[0]) + ')'
		}
	} else if (ast.children) {
		child = getChildRender(ast.children)
	}
	if (ast.attrs.length > 0) {
		render = 'h("' + ast.tag + '", {attrs: ' + getAttrsStr(ast.attrsMap) + '}, [' + child + '])'
	} else {
		render = 'h("' + ast.tag + '", [' + child + '])'
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

function getAttrsStr(obj) {
	let str = []
	Object.keys(obj).forEach((key) => {
		str.push(key + ':"' + obj[key] + '"')
	})
	return '{' + str.join(',') + '}'
}

function generateText(text) {
	const exp = textParser(text)
	return 'String(' + escapeNewlines(exp) + ')'
}

function escapeNewlines (str) {
  return str.replace(/\n/g, '\\n')
}

function h() {}