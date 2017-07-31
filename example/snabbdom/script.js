import {
  h,
  patch
} from '../../src/vdom/index'

function view() {
  return h('div', [
    h('div', 'hello world'),
    h('h1', 'hello world'),
    h('h2', 'hello world')
  ]);
}

window.addEventListener('DOMContentLoaded', () => {
  var container = document.getElementById('container');
  patch(container, view());
});