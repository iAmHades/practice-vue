'use strict';

const snabbdom = require('./snabbdom.js');
const patch = snabbdom.init([
  require('./modules/class'),
  require('./modules/props'),
  require('./modules/style'),
  require('./modules/eventlisteners'),
]);
const h = require('./h.js');


export 