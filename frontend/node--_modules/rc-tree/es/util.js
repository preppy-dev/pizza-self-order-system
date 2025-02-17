import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * Legacy code. Should avoid to use if you are new to import these code.
 */
import React from 'react';
import warning from "rc-util/es/warning";
import TreeNode from './TreeNode';
var DRAG_SIDE_RANGE = 0.25;
var DRAG_MIN_GAP = 2;
export function arrDel(list, value) {
  var clone = list.slice();
  var index = clone.indexOf(value);

  if (index >= 0) {
    clone.splice(index, 1);
  }

  return clone;
}
export function arrAdd(list, value) {
  var clone = list.slice();

  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }

  return clone;
}
export function posToArr(pos) {
  return pos.split('-');
}
export function getPosition(level, index) {
  return "".concat(level, "-").concat(index);
}
export function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}
export function getDragNodesKeys(dragNodeKey, keyEntities) {
  var dragNodesKeys = [dragNodeKey];
  var entity = keyEntities[dragNodeKey];

  function dig() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    list.forEach(function (_ref) {
      var key = _ref.key,
          children = _ref.children;
      dragNodesKeys.push(key);
      dig(children);
    });
  }

  dig(entity.children);
  return dragNodesKeys;
} // Only used when drag, not affect SSR.

export function calcDropPosition(event, treeNode) {
  var clientY = event.clientY;

  var _treeNode$selectHandl = treeNode.selectHandle.getBoundingClientRect(),
      top = _treeNode$selectHandl.top,
      bottom = _treeNode$selectHandl.bottom,
      height = _treeNode$selectHandl.height;

  var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

  if (clientY <= top + des) {
    return -1;
  }

  if (clientY >= bottom - des) {
    return 1;
  }

  return 0;
}
/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */

export function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) return undefined;
  var multiple = props.multiple;

  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }

  return selectedKeys;
}

var internalProcessProps = function internalProcessProps(props) {
  return props;
};

export function convertDataToTree(treeData, processor) {
  if (!treeData) return [];

  var _ref2 = processor || {},
      _ref2$processProps = _ref2.processProps,
      processProps = _ref2$processProps === void 0 ? internalProcessProps : _ref2$processProps;

  var list = Array.isArray(treeData) ? treeData : [treeData];
  return list.map(function (_ref3) {
    var children = _ref3.children,
        props = _objectWithoutProperties(_ref3, ["children"]);

    var childrenNodes = convertDataToTree(children, processor);
    return React.createElement(TreeNode, Object.assign({}, processProps(props)), childrenNodes);
  });
}
/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */

export function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  } // Convert keys to object format


  var keyProps;

  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (_typeof(keys) === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
    };
  } else {
    warning(false, '`checkedKeys` is not an array or an object');
    return null;
  }

  return keyProps;
}
/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */

export function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = new Set();

  function conductUp(key) {
    if (expandedKeys.has(key)) return;
    var entity = keyEntities[key];
    if (!entity) return;
    expandedKeys.add(key);
    var parent = entity.parent,
        node = entity.node;
    if (node.disabled) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conductUp(key);
  });
  return _toConsumableArray(expandedKeys);
}
/**
 * Returns only the data- and aria- key/value pairs
 */

export function getDataAndAria(props) {
  var omitProps = {};
  Object.keys(props).forEach(function (key) {
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      omitProps[key] = props[key];
    }
  });
  return omitProps;
}