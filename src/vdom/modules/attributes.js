var NamespaceURIs = {
  "xlink": "http://www.w3.org/1999/xlink"
};

var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
  "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
  "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
  "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
  "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
  "truespeed", "typemustmatch", "visible"
];

var booleanAttrsDict = Object.create(null);
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = true;
}

function updateAttrs(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
    oldAttrs = oldVnode.data.attrs,
    attrs = vnode.data.attrs,
    namespaceSplit;

  if (!oldAttrs && !attrs) return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  // update modified attributes, add new attributes
  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      if (!cur && booleanAttrsDict[key])
        elm.removeAttribute(key);
      else {
        namespaceSplit = key.split(":");
        if (namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0]))
          elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);
        else
          elm.setAttribute(key, cur);
      }
    }
  }
  //remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}


export default {
  create: updateAttrs,
  update: updateAttrs
};