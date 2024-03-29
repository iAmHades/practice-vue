function updateClass(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
    oldClass = oldVnode.data.class,
    klass = vnode.data.class;

  if (!oldClass && !klass) return;
  oldClass = oldClass || {};
  klass = klass || {};

  for (name in oldClass) {
    if (!klass[name]) {
      elm.classList.remove(name);
    }
  }
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

export default {
  create: updateClass,
  update: updateClass
};