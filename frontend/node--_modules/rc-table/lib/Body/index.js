"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _BodyRow = _interopRequireDefault(require("./BodyRow"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

var _ExpandedRow = _interopRequireDefault(require("./ExpandedRow"));

var _BodyContext = _interopRequireDefault(require("../context/BodyContext"));

var _valueUtil = require("../utils/valueUtil");

var _ResizeContext = _interopRequireDefault(require("../context/ResizeContext"));

function Body(_ref) {
  var data = _ref.data,
      getRowKey = _ref.getRowKey,
      measureColumnWidth = _ref.measureColumnWidth,
      expandedKeys = _ref.expandedKeys,
      onRow = _ref.onRow,
      rowExpandable = _ref.rowExpandable,
      emptyNode = _ref.emptyNode,
      childrenColumnName = _ref.childrenColumnName;

  var _React$useContext = React.useContext(_ResizeContext.default),
      onColumnResize = _React$useContext.onColumnResize;

  var _React$useContext2 = React.useContext(_TableContext.default),
      prefixCls = _React$useContext2.prefixCls,
      getComponent = _React$useContext2.getComponent;

  var _React$useContext3 = React.useContext(_BodyContext.default),
      fixHeader = _React$useContext3.fixHeader,
      horizonScroll = _React$useContext3.horizonScroll,
      flattenColumns = _React$useContext3.flattenColumns,
      componentWidth = _React$useContext3.componentWidth;

  return React.useMemo(function () {
    var WrapperComponent = getComponent(['body', 'wrapper'], 'tbody');
    var trComponent = getComponent(['body', 'row'], 'tr');
    var tdComponent = getComponent(['body', 'cell'], 'td');
    var rows;

    if (data.length) {
      rows = data.map(function (record, index) {
        var key = getRowKey(record, index);
        return [React.createElement(_BodyRow.default, {
          key: key,
          rowKey: key,
          record: record,
          recordKey: key,
          index: index,
          rowComponent: trComponent,
          cellComponent: tdComponent,
          expandedKeys: expandedKeys,
          onRow: onRow,
          getRowKey: getRowKey,
          rowExpandable: rowExpandable,
          childrenColumnName: childrenColumnName
        })];
      });
    } else {
      rows = React.createElement(_ExpandedRow.default, {
        expanded: true,
        className: "".concat(prefixCls, "-placeholder"),
        prefixCls: prefixCls,
        fixHeader: fixHeader,
        fixColumn: horizonScroll,
        horizonScroll: horizonScroll,
        component: trComponent,
        componentWidth: componentWidth,
        cellComponent: tdComponent,
        colSpan: flattenColumns.length
      }, emptyNode);
    }

    var columnsKey = (0, _valueUtil.getColumnsKey)(flattenColumns);
    return React.createElement(WrapperComponent, {
      className: "".concat(prefixCls, "-tbody")
    }, measureColumnWidth && React.createElement("tr", {
      "aria-hidden": "true",
      className: "".concat(prefixCls, "-measure-row"),
      style: {
        height: 0
      }
    }, columnsKey.map(function (columnKey) {
      return React.createElement(_rcResizeObserver.default, {
        key: columnKey,
        onResize: function onResize(_ref2) {
          var offsetWidth = _ref2.offsetWidth;
          onColumnResize(columnKey, offsetWidth);
        }
      }, React.createElement("td", {
        style: {
          padding: 0,
          border: 0,
          height: 0
        }
      }));
    })), rows);
  }, [data, prefixCls, onRow, measureColumnWidth, expandedKeys, getRowKey, getComponent, componentWidth, emptyNode, flattenColumns]);
}

var MemoBody = React.memo(Body);
MemoBody.displayName = 'Body';
var _default = MemoBody;
exports.default = _default;