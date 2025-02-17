"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertChildrenToData = convertChildrenToData;
exports.fillLegacyProps = fillLegacyProps;
exports.fillAdditionalInfo = fillAdditionalInfo;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _TreeNode = _interopRequireDefault(require("../TreeNode"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function convertChildrenToData(nodes) {
  return (0, _toArray.default)(nodes).map(function (node) {
    if (!_react.default.isValidElement(node) || !node.type) {
      return null;
    }

    var key = node.key,
        _node$props = node.props,
        children = _node$props.children,
        value = _node$props.value,
        restProps = (0, _objectWithoutProperties2.default)(_node$props, ["children", "value"]);

    var data = _objectSpread({
      key: key,
      value: value
    }, restProps);

    var childData = convertChildrenToData(children);

    if (childData.length) {
      data.children = childData;
    }

    return data;
  }).filter(function (data) {
    return data;
  });
}

function fillLegacyProps(dataNode) {
  // Skip if not dataNode exist
  if (!dataNode) {
    return dataNode;
  }

  var cloneNode = _objectSpread({}, dataNode);

  if (!('props' in cloneNode)) {
    Object.defineProperty(cloneNode, 'props', {
      get: function get() {
        (0, _warning.default)(false, 'New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.');
        return cloneNode;
      }
    });
  }

  return cloneNode;
}

function fillAdditionalInfo(extra, triggerValue, checkedValues, treeData, showPosition) {
  var triggerNode = null;
  var nodeList = null;

  function generateMap() {
    function dig(list) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
      var parentIncluded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return list.map(function (dataNode, index) {
        var pos = "".concat(level, "-").concat(index);
        var included = checkedValues.includes(dataNode.value);
        var children = dig(dataNode.children || [], pos, included);

        var node = _react.default.createElement(_TreeNode.default, Object.assign({}, dataNode), children.map(function (child) {
          return child.node;
        })); // Link with trigger node


        if (triggerValue === dataNode.value) {
          triggerNode = node;
        }

        if (included) {
          var checkedNode = {
            pos: pos,
            node: node,
            children: children
          };

          if (!parentIncluded) {
            nodeList.push(checkedNode);
          }

          return checkedNode;
        }

        return null;
      }).filter(function (node) {
        return node;
      });
    }

    if (!nodeList) {
      nodeList = [];
      dig(treeData); // Sort to keep the checked node length

      nodeList.sort(function (_ref, _ref2) {
        var val1 = _ref.node.props.value;
        var val2 = _ref2.node.props.value;
        var index1 = checkedValues.indexOf(val1);
        var index2 = checkedValues.indexOf(val2);
        return index1 - index2;
      });
    }
  }

  Object.defineProperty(extra, 'triggerNode', {
    get: function get() {
      (0, _warning.default)(false, '`triggerNode` is deprecated. Please consider decoupling data with node.');
      generateMap();
      return triggerNode;
    }
  });
  Object.defineProperty(extra, 'allCheckedNodes', {
    get: function get() {
      (0, _warning.default)(false, '`allCheckedNodes` is deprecated. Please consider decoupling data with node.');
      generateMap();

      if (showPosition) {
        return nodeList;
      }

      return nodeList.map(function (_ref3) {
        var node = _ref3.node;
        return node;
      });
    }
  });
}