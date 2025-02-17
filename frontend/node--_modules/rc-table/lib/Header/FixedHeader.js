"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _Header = _interopRequireDefault(require("./Header"));

var _ColGroup = _interopRequireDefault(require("../ColGroup"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function FixedHeader(_ref) {
  var columns = _ref.columns,
      flattenColumns = _ref.flattenColumns,
      colWidths = _ref.colWidths,
      columCount = _ref.columCount,
      stickyOffsets = _ref.stickyOffsets,
      direction = _ref.direction,
      props = (0, _objectWithoutProperties2.default)(_ref, ["columns", "flattenColumns", "colWidths", "columCount", "stickyOffsets", "direction"]);

  var _React$useContext = React.useContext(_TableContext.default),
      prefixCls = _React$useContext.prefixCls,
      scrollbarSize = _React$useContext.scrollbarSize; // Add scrollbar column


  var lastColumn = flattenColumns[flattenColumns.length - 1];
  var ScrollBarColumn = {
    fixed: lastColumn ? lastColumn.fixed : null,
    onHeaderCell: function onHeaderCell() {
      return {
        className: "".concat(prefixCls, "-cell-scrollbar")
      };
    }
  };
  var columnsWithScrollbar = React.useMemo(function () {
    return scrollbarSize ? [].concat((0, _toConsumableArray2.default)(columns), [ScrollBarColumn]) : columns;
  }, [scrollbarSize, columns]);
  var flattenColumnsWithScrollbar = React.useMemo(function () {
    return scrollbarSize ? [].concat((0, _toConsumableArray2.default)(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [scrollbarSize, flattenColumns]); // Calculate the sticky offsets

  var headerStickyOffsets = React.useMemo(function () {
    var right = stickyOffsets.right,
        left = stickyOffsets.left;
    return _objectSpread(_objectSpread({}, stickyOffsets), {}, {
      left: direction === 'rtl' ? [].concat((0, _toConsumableArray2.default)(left.map(function (width) {
        return width + scrollbarSize;
      })), [0]) : left,
      right: direction === 'rtl' ? right : [].concat((0, _toConsumableArray2.default)(right.map(function (width) {
        return width + scrollbarSize;
      })), [0])
    });
  }, [scrollbarSize, stickyOffsets]);
  var cloneWidths = [];

  for (var i = 0; i < columCount; i += 1) {
    cloneWidths[i] = colWidths[i];
  }

  var columnWidthsReady = !colWidths.every(function (width) {
    return !width;
  });
  return React.createElement("table", {
    style: {
      tableLayout: 'fixed',
      visibility: columnWidthsReady ? null : 'hidden'
    }
  }, React.createElement(_ColGroup.default, {
    colWidths: [].concat((0, _toConsumableArray2.default)(colWidths), [scrollbarSize]),
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), React.createElement(_Header.default, Object.assign({}, props, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  })));
}

var _default = FixedHeader;
exports.default = _default;