"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTreeData;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _legacyUtil = require("../utils/legacyUtil");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MAX_WARNING_TIMES = 10;

function parseSimpleTreeData(treeData, _ref) {
  var id = _ref.id,
      pId = _ref.pId,
      rootPId = _ref.rootPId;
  var keyNodes = {};
  var rootNodeList = []; // Fill in the map

  var nodeList = treeData.map(function (node) {
    var clone = _objectSpread({}, node);

    var key = clone[id];
    keyNodes[key] = clone;
    clone.key = clone.key || key;
    return clone;
  }); // Connect tree

  nodeList.forEach(function (node) {
    var parentKey = node[pId];
    var parent = keyNodes[parentKey]; // Fill parent

    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(node);
    } // Fill root tree node


    if (parentKey === rootPId || !parent && rootPId === null) {
      rootNodeList.push(node);
    }
  });
  return rootNodeList;
}
/**
 * Format `treeData` with `value` & `key` which is used for calculation
 */


function formatTreeData(treeData, getLabelProp) {
  var warningTimes = 0;
  var valueSet = new Set();

  function dig(dataNodes) {
    return (dataNodes || []).map(function (node) {
      var key = node.key,
          value = node.value,
          children = node.children,
          rest = (0, _objectWithoutProperties2.default)(node, ["key", "value", "children"]);
      var mergedValue = 'value' in node ? value : key;

      var dataNode = _objectSpread(_objectSpread({}, rest), {}, {
        key: key !== null && key !== undefined ? key : mergedValue,
        value: mergedValue,
        title: getLabelProp(node)
      }); // Check `key` & `value` and warning user


      if (process.env.NODE_ENV !== 'production') {
        if (key !== null && key !== undefined && value !== undefined && String(key) !== String(value) && warningTimes < MAX_WARNING_TIMES) {
          warningTimes += 1;
          (0, _warning.default)(false, "`key` or `value` with TreeNode must be the same or you can remove one of them. key: ".concat(key, ", value: ").concat(value, "."));
        }

        (0, _warning.default)(!valueSet.has(value), "Same `value` exist in the tree: ".concat(value));
        valueSet.add(value);
      }

      if ('children' in node) {
        dataNode.children = dig(children);
      }

      return dataNode;
    });
  }

  return dig(treeData);
}
/**
 * Convert `treeData` or `children` into formatted `treeData`.
 * Will not re-calculate if `treeData` or `children` not change.
 */


function useTreeData(treeData, children, _ref2) {
  var getLabelProp = _ref2.getLabelProp,
      simpleMode = _ref2.simpleMode;

  var cacheRef = _react.default.useRef({});

  if (treeData) {
    cacheRef.current.formatTreeData = cacheRef.current.treeData === treeData ? cacheRef.current.formatTreeData : formatTreeData(simpleMode ? parseSimpleTreeData(treeData, _objectSpread({
      id: 'id',
      pId: 'pId',
      rootPId: null
    }, simpleMode !== true ? simpleMode : {})) : treeData, getLabelProp);
    cacheRef.current.treeData = treeData;
  } else {
    cacheRef.current.formatTreeData = cacheRef.current.children === children ? cacheRef.current.formatTreeData : formatTreeData((0, _legacyUtil.convertChildrenToData)(children), getLabelProp);
  }

  return cacheRef.current.formatTreeData;
}