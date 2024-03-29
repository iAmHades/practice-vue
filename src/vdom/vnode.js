'use strict';

export default function VNode(sel, data, children, text, elm) {
	var key = data === undefined ? undefined : data.key;
	return {
		sel: sel,
		data: data,
		children: children,
		text: text,
		elm: elm,
		key: key
	};
};