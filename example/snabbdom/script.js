import {
  h,
  patch
} from '../../src/vdom/index'

function view() {
  return h('div', [
    h('h1', 'Top 10 movies'),
    h('h1', 'Top 10 movies'),
    h('h1', 'Top 10 movies')
  ]);
}

window.addEventListener('DOMContentLoaded', () => {
  var container = document.getElementById('container');
  patch(container, view());
});