"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

function contains(root, n) {
  var node = n;

  while (node) {
    if (node === root) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}