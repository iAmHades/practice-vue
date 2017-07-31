'use strict'

import parse from './html-prase.js'

const cache = Object.create(null)

export default function compile(html) {
	html = html.trim()
	const hit = cache[html]
	return hit || (cache[html] = parse(html))
}