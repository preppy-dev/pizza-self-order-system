"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertChildrenToColumns = convertChildrenToColumns;
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _legacyUtil = require("../utils/legacyUtil");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function convertChildrenToColumns(children) {
  return (0, _toArray.default)(children).filter(function (node) {
    return React.isValidElement(node);
  }).map(function (_ref) {
    var key = _ref.key,
        props = _ref.props;
    var nodeChildren = props.children,
        restProps = (0, _objectWithoutProperties2.default)(props, ["children"]);

    var column = _objectSpread({
      key: key
    }, restProps);

    if (nodeChildren) {
      column.children = convertChildrenToColumns(nodeChildren);
    }

    return column;
  });
}

function flatColumns(columns) {
  return columns.reduce(function (list, column) {
    var fixed = column.fixed; // Convert `fixed='true'` to `fixed='left'` instead

    var parsedFixed = fixed === true ? 'left' : fixed;
    var subColumns = column.children;

    if (subColumns && subColumns.length > 0) {
      return [].concat((0, _toConsumableArray2.default)(list), (0, _toConsumableArray2.default)(flatColumns(subColumns).map(function (subColum) {
        return _objectSpread({
          fixed: parsedFixed
        }, subColum);
      })));
    }

    return [].concat((0, _toConsumableArray2.default)(list), [_objectSpread(_objectSpread({}, column), {}, {
      fixed: parsedFixed
    })]);
  }, []);
}

function warningFixed(flattenColumns) {
  var allFixLeft = true;

  for (var i = 0; i < flattenColumns.length; i += 1) {
    var col = flattenColumns[i];

    if (allFixLeft && col.fixed !== 'left') {
      allFixLeft = false;
    } else if (!allFixLeft && col.fixed === 'left') {
      (0, _warning.default)(false, "Index ".concat(i - 1, " of `columns` missing `fixed='left'` prop."));
      break;
    }
  }

  var allFixRight = true;

  for (var _i = flattenColumns.length - 1; _i >= 0; _i -= 1) {
    var _col = flattenColumns[_i];

    if (allFixRight && _col.fixed !== 'right') {
      allFixRight = false;
    } else if (!allFixRight && _col.fixed === 'right') {
      (0, _warning.default)(false, "Index ".concat(_i + 1, " of `columns` missing `fixed='right'` prop."));
      break;
    }
  }
}

function revertForRtl(columns) {
  return columns.map(function (column) {
    var fixed = column.fixed,
        restProps = (0, _objectWithoutProperties2.default)(column, ["fixed"]); // Convert `fixed='left'` to `fixed='right'` instead

    var parsedFixed = fixed;

    if (fixed === 'left') {
      parsedFixed = 'right';
    } else if (fixed === 'right') {
      parsedFixed = 'left';
    }

    return _objectSpread({
      fixed: parsedFixed
    }, restProps);
  });
}
/**
 * Parse `columns` & `children` into `columns`.
 */


function useColumns(_ref2, transformColumns) {
  var prefixCls = _ref2.prefixCls,
      columns = _ref2.columns,
      children = _ref2.children,
      expandable = _ref2.expandable,
      expandedKeys = _ref2.expandedKeys,
      getRowKey = _ref2.getRowKey,
      onTriggerExpand = _ref2.onTriggerExpand,
      expandIcon = _ref2.expandIcon,
      rowExpandable = _ref2.rowExpandable,
      expandIconColumnIndex = _ref2.expandIconColumnIndex,
      direction = _ref2.direction,
      expandRowByClick = _ref2.expandRowByClick;
  var baseColumns = React.useMemo(function () {
    return columns || convertChildrenToColumns(children);
  }, [columns, children]); // Add expand column

  var withExpandColumns = React.useMemo(function () {
    if (expandable) {
      var _expandColumn;

      var expandColIndex = expandIconColumnIndex || 0;
      var prevColumn = baseColumns[expandColIndex];
      var expandColumn = (_expandColumn = {}, (0, _defineProperty2.default)(_expandColumn, _legacyUtil.INTERNAL_COL_DEFINE, {
        className: "".concat(prefixCls, "-expand-icon-col")
      }), (0, _defineProperty2.default)(_expandColumn, "title", ''), (0, _defineProperty2.default)(_expandColumn, "fixed", prevColumn ? prevColumn.fixed : null), (0, _defineProperty2.default)(_expandColumn, "className", "".concat(prefixCls, "-row-expand-icon-cell")), (0, _defineProperty2.default)(_expandColumn, "render", function render(_, record, index) {
        var rowKey = getRowKey(record, index);
        var expanded = expandedKeys.has(rowKey);
        var recordExpandable = rowExpandable ? rowExpandable(record) : true;
        var icon = expandIcon({
          prefixCls: prefixCls,
          expanded: expanded,
          expandable: recordExpandable,
          record: record,
          onExpand: onTriggerExpand
        });

        if (expandRowByClick) {
          return React.createElement("span", {
            onClick: function onClick(e) {
              return e.stopPropagation();
            }
          }, icon);
        }

        return icon;
      }), _expandColumn); // Insert expand column in the target position

      var cloneColumns = baseColumns.slice();
      cloneColumns.splice(expandColIndex, 0, expandColumn);
      return cloneColumns;
    }

    return baseColumns;
  }, [expandable, baseColumns, getRowKey, expandedKeys, expandIcon, direction]);
  var mergedColumns = React.useMemo(function () {
    var finalColumns = withExpandColumns;

    if (transformColumns) {
      finalColumns = transformColumns(finalColumns);
    } // Always provides at least one column for table display


    if (!finalColumns.length) {
      finalColumns = [{
        render: function render() {
          return null;
        }
      }];
    }

    return finalColumns;
  }, [transformColumns, withExpandColumns, direction]);
  var flattenColumns = React.useMemo(function () {
    if (direction === 'rtl') {
      return revertForRtl(flatColumns(mergedColumns));
    }

    return flatColumns(mergedColumns);
  }, [mergedColumns, direction]); // Only check out of production since it's waste for each render

  if (process.env.NODE_ENV !== 'production') {
    warningFixed(flattenColumns);
  }

  return [mergedColumns, flattenColumns];
}

var _default = useColumns;
exports.default = _default;