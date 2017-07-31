'use strict';

import snabbdom from './snabbdom'
import cls from './modules/class'
import props from './modules/props'
import style from './modules/style'
import attributes from './modules/stattributesyle'
import eventlisteners from './modules/eventlisteners'
import h from './h'

const patch = snabbdom([
  cls, props, style, eventlisteners,attributes
]);

export {
  h,
  patch
}