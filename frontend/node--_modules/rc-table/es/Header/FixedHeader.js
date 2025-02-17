import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import * as React from 'react';
import Header from './Header';
import ColGroup from '../ColGroup';
import TableContext from '../context/TableContext';

function FixedHeader(_ref) {
  var columns = _ref.columns,
      flattenColumns = _ref.flattenColumns,
      colWidths = _ref.colWidths,
      columCount = _ref.columCount,
      stickyOffsets = _ref.stickyOffsets,
      direction = _ref.direction,
      props = _objectWithoutProperties(_ref, ["columns", "flattenColumns", "colWidths", "columCount", "stickyOffsets", "direction"]);

  var _React$useContext = React.useContext(TableContext),
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
    return scrollbarSize ? [].concat(_toConsumableArray(columns), [ScrollBarColumn]) : columns;
  }, [scrollbarSize, columns]);
  var flattenColumnsWithScrollbar = React.useMemo(function () {
    return scrollbarSize ? [].concat(_toConsumableArray(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [scrollbarSize, flattenColumns]); // Calculate the sticky offsets

  var headerStickyOffsets = React.useMemo(function () {
    var right = stickyOffsets.right,
        left = stickyOffsets.left;
    return _objectSpread(_objectSpread({}, stickyOffsets), {}, {
      left: direction === 'rtl' ? [].concat(_toConsumableArray(left.map(function (width) {
        return width + scrollbarSize;
      })), [0]) : left,
      right: direction === 'rtl' ? right : [].concat(_toConsumableArray(right.map(function (width) {
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
  }, React.createElement(ColGroup, {
    colWidths: [].concat(_toConsumableArray(colWidths), [scrollbarSize]),
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), React.createElement(Header, Object.assign({}, props, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  })));
}

export default FixedHeader;