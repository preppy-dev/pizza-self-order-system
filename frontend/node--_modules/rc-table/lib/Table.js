"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.INTERNAL_HOOKS = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _getScrollBarSize = _interopRequireDefault(require("rc-util/lib/getScrollBarSize"));

var _ColumnGroup = _interopRequireDefault(require("./sugar/ColumnGroup"));

var _Column = _interopRequireDefault(require("./sugar/Column"));

var _FixedHeader = _interopRequireDefault(require("./Header/FixedHeader"));

var _Header = _interopRequireDefault(require("./Header/Header"));

var _TableContext = _interopRequireDefault(require("./context/TableContext"));

var _BodyContext = _interopRequireDefault(require("./context/BodyContext"));

var _Body = _interopRequireDefault(require("./Body"));

var _useColumns3 = _interopRequireDefault(require("./hooks/useColumns"));

var _useFrame = require("./hooks/useFrame");

var _valueUtil = require("./utils/valueUtil");

var _ResizeContext = _interopRequireDefault(require("./context/ResizeContext"));

var _useStickyOffsets = _interopRequireDefault(require("./hooks/useStickyOffsets"));

var _ColGroup = _interopRequireDefault(require("./ColGroup"));

var _legacyUtil = require("./utils/legacyUtil");

var _Panel = _interopRequireDefault(require("./Panel"));

var _Footer = _interopRequireWildcard(require("./Footer"));

var _expandUtil = require("./utils/expandUtil");

var _fixUtil = require("./utils/fixUtil");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Used for conditions cache
var EMPTY_DATA = []; // Used for customize scroll

var EMPTY_SCROLL_TARGET = {};
var INTERNAL_HOOKS = 'rc-table-internal-hook';
exports.INTERNAL_HOOKS = INTERNAL_HOOKS;
var MemoTableContent = React.memo(function (_ref) {
  var children = _ref.children;
  return children;
}, function (prev, next) {
  if (!(0, _shallowequal.default)(prev.props, next.props)) {
    return false;
  } // No additional render when pinged status change.
  // This is not a bug.


  return prev.pingLeft !== next.pingLeft || prev.pingRight !== next.pingRight;
});

function Table(props) {
  var _classNames;

  var prefixCls = props.prefixCls,
      className = props.className,
      rowClassName = props.rowClassName,
      style = props.style,
      data = props.data,
      rowKey = props.rowKey,
      scroll = props.scroll,
      tableLayout = props.tableLayout,
      direction = props.direction,
      title = props.title,
      footer = props.footer,
      summary = props.summary,
      id = props.id,
      showHeader = props.showHeader,
      components = props.components,
      emptyText = props.emptyText,
      onRow = props.onRow,
      onHeaderRow = props.onHeaderRow,
      internalHooks = props.internalHooks,
      transformColumns = props.transformColumns,
      internalRefs = props.internalRefs;
  var mergedData = data || EMPTY_DATA;
  var hasData = !!mergedData.length; // ===================== Effects ======================

  var _React$useState = React.useState(0),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      scrollbarSize = _React$useState2[0],
      setScrollbarSize = _React$useState2[1];

  React.useEffect(function () {
    setScrollbarSize((0, _getScrollBarSize.default)());
  }); // ===================== Warning ======================

  if (process.env.NODE_ENV !== 'production') {
    ['onRowClick', 'onRowDoubleClick', 'onRowContextMenu', 'onRowMouseEnter', 'onRowMouseLeave'].forEach(function (name) {
      (0, _warning.default)(props[name] === undefined, "`".concat(name, "` is removed, please use `onRow` instead."));
    });
    (0, _warning.default)(!('getBodyWrapper' in props), '`getBodyWrapper` is deprecated, please use custom `components` instead.');
  } // ==================== Customize =====================


  var mergedComponents = React.useMemo(function () {
    return (0, _valueUtil.mergeObject)(components, {});
  }, [components]);
  var getComponent = React.useCallback(function (path, defaultComponent) {
    return (0, _valueUtil.getPathValue)(mergedComponents, path) || defaultComponent;
  }, [mergedComponents]);
  var getRowKey = React.useMemo(function () {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return function (record) {
      var key = record && record[rowKey];

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning.default)(key !== undefined, 'Each record in table should have a unique `key` prop, or set `rowKey` to an unique primary key.');
      }

      return key;
    };
  }, [rowKey]); // ====================== Expand ======================

  var expandableConfig = (0, _legacyUtil.getExpandableProps)(props);
  var expandIcon = expandableConfig.expandIcon,
      expandedRowKeys = expandableConfig.expandedRowKeys,
      defaultExpandedRowKeys = expandableConfig.defaultExpandedRowKeys,
      defaultExpandAllRows = expandableConfig.defaultExpandAllRows,
      expandedRowRender = expandableConfig.expandedRowRender,
      onExpand = expandableConfig.onExpand,
      onExpandedRowsChange = expandableConfig.onExpandedRowsChange,
      expandRowByClick = expandableConfig.expandRowByClick,
      rowExpandable = expandableConfig.rowExpandable,
      expandIconColumnIndex = expandableConfig.expandIconColumnIndex,
      expandedRowClassName = expandableConfig.expandedRowClassName,
      childrenColumnName = expandableConfig.childrenColumnName,
      indentSize = expandableConfig.indentSize;
  var mergedExpandIcon = expandIcon || _expandUtil.renderExpandIcon;
  var mergedChildrenColumnName = childrenColumnName || 'children';
  var expandableType = React.useMemo(function () {
    if (expandedRowRender) {
      return 'row';
    }
    /* eslint-disable no-underscore-dangle */

    /**
     * Fix https://github.com/ant-design/ant-design/issues/21154
     * This is a workaround to not to break current behavior.
     * We can remove follow code after final release.
     *
     * To other developer:
     *  Do not use `__PARENT_RENDER_ICON__` in prod since we will remove this when refactor
     */


    if (props.expandable && internalHooks === INTERNAL_HOOKS && props.expandable.__PARENT_RENDER_ICON__ || mergedData.some(function (record) {
      return record && (0, _typeof2.default)(record) === 'object' && mergedChildrenColumnName in record;
    })) {
      return 'nest';
    }
    /* eslint-enable */


    return false;
  }, [!!expandedRowRender, mergedData]);

  var _React$useState3 = React.useState(function () {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }

    if (defaultExpandAllRows) {
      return (0, _expandUtil.findAllChildrenKeys)(mergedData, getRowKey, mergedChildrenColumnName);
    }

    return [];
  }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      innerExpandedKeys = _React$useState4[0],
      setInnerExpandedKeys = _React$useState4[1];

  var mergedExpandedKeys = React.useMemo(function () {
    return new Set(expandedRowKeys || innerExpandedKeys || []);
  }, [expandedRowKeys, innerExpandedKeys]);
  var onTriggerExpand = React.useCallback(function (record) {
    var key = getRowKey(record, mergedData.indexOf(record));
    var newExpandedKeys;
    var hasKey = mergedExpandedKeys.has(key);

    if (hasKey) {
      mergedExpandedKeys.delete(key);
      newExpandedKeys = (0, _toConsumableArray2.default)(mergedExpandedKeys);
    } else {
      newExpandedKeys = [].concat((0, _toConsumableArray2.default)(mergedExpandedKeys), [key]);
    }

    setInnerExpandedKeys(newExpandedKeys);

    if (onExpand) {
      onExpand(!hasKey, record);
    }

    if (onExpandedRowsChange) {
      onExpandedRowsChange(newExpandedKeys);
    }
  }, [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange]); // ====================== Column ======================

  var _React$useState5 = React.useState(0),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      componentWidth = _React$useState6[0],
      setComponentWidth = _React$useState6[1];

  var _useColumns = (0, _useColumns3.default)(_objectSpread(_objectSpread(_objectSpread({}, props), expandableConfig), {}, {
    expandable: !!expandedRowRender,
    expandedKeys: mergedExpandedKeys,
    getRowKey: getRowKey,
    // https://github.com/ant-design/ant-design/issues/23894
    onTriggerExpand: onTriggerExpand,
    expandIcon: mergedExpandIcon,
    expandIconColumnIndex: expandIconColumnIndex,
    direction: direction
  }), internalHooks === INTERNAL_HOOKS ? transformColumns : null),
      _useColumns2 = (0, _slicedToArray2.default)(_useColumns, 2),
      columns = _useColumns2[0],
      flattenColumns = _useColumns2[1];

  var columnContext = React.useMemo(function () {
    return {
      columns: columns,
      flattenColumns: flattenColumns
    };
  }, [columns, flattenColumns]); // ====================== Scroll ======================

  var fullTableRef = React.useRef();
  var scrollHeaderRef = React.useRef();
  var scrollBodyRef = React.useRef();

  var _React$useState7 = React.useState(false),
      _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
      pingedLeft = _React$useState8[0],
      setPingedLeft = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
      pingedRight = _React$useState10[0],
      setPingedRight = _React$useState10[1];

  var _useFrameState = (0, _useFrame.useFrameState)(new Map()),
      _useFrameState2 = (0, _slicedToArray2.default)(_useFrameState, 2),
      colsWidths = _useFrameState2[0],
      updateColsWidths = _useFrameState2[1]; // Convert map to number width


  var colsKeys = (0, _valueUtil.getColumnsKey)(flattenColumns);
  var pureColWidths = colsKeys.map(function (columnKey) {
    return colsWidths.get(columnKey);
  });
  var colWidths = React.useMemo(function () {
    return pureColWidths;
  }, [pureColWidths.join('_')]);
  var stickyOffsets = (0, _useStickyOffsets.default)(colWidths, flattenColumns.length, direction);
  var fixHeader = hasData && scroll && (0, _valueUtil.validateValue)(scroll.y);
  var horizonScroll = scroll && (0, _valueUtil.validateValue)(scroll.x);
  var fixColumn = horizonScroll && flattenColumns.some(function (_ref2) {
    var fixed = _ref2.fixed;
    return fixed;
  });
  var scrollXStyle;
  var scrollYStyle;
  var scrollTableStyle;

  if (fixHeader) {
    scrollYStyle = {
      overflowY: 'scroll',
      maxHeight: scroll.y
    };
  }

  if (horizonScroll) {
    scrollXStyle = {
      overflowX: 'scroll'
    }; // When no vertical scrollbar, should hide it
    // https://github.com/ant-design/ant-design/pull/20705
    // https://github.com/ant-design/ant-design/issues/21879

    if (!fixHeader) {
      scrollYStyle = {
        overflowY: 'hidden'
      };
    }

    scrollTableStyle = {
      width: scroll.x === true ? 'auto' : scroll.x,
      minWidth: '100%'
    };
  }

  var onColumnResize = React.useCallback(function (columnKey, width) {
    updateColsWidths(function (widths) {
      var newWidths = new Map(widths);
      newWidths.set(columnKey, width);
      return newWidths;
    });
  }, []);

  var _useTimeoutLock = (0, _useFrame.useTimeoutLock)(null),
      _useTimeoutLock2 = (0, _slicedToArray2.default)(_useTimeoutLock, 2),
      setScrollTarget = _useTimeoutLock2[0],
      getScrollTarget = _useTimeoutLock2[1];

  function forceScroll(scrollLeft, target) {
    /* eslint-disable no-param-reassign */
    if (target && target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft;
    }
    /* eslint-enable */

  }

  var onScroll = function onScroll(_ref3) {
    var currentTarget = _ref3.currentTarget,
        scrollLeft = _ref3.scrollLeft;
    var mergedScrollLeft = typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;
    var compareTarget = currentTarget || EMPTY_SCROLL_TARGET;

    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      setScrollTarget(compareTarget);
      forceScroll(mergedScrollLeft, scrollHeaderRef.current);
      forceScroll(mergedScrollLeft, scrollBodyRef.current);
    }

    if (currentTarget) {
      var scrollWidth = currentTarget.scrollWidth,
          clientWidth = currentTarget.clientWidth;
      setPingedLeft(mergedScrollLeft > 0);
      setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
    }
  };

  var triggerOnScroll = function triggerOnScroll() {
    if (scrollBodyRef.current) {
      onScroll({
        currentTarget: scrollBodyRef.current
      });
    }
  };

  var onFullTableResize = function onFullTableResize(_ref4) {
    var width = _ref4.width;
    triggerOnScroll();
    setComponentWidth(fullTableRef.current ? fullTableRef.current.offsetWidth : width);
  }; // Sync scroll bar when init or `horizonScroll` changed


  React.useEffect(function () {
    return triggerOnScroll;
  }, []);
  React.useEffect(function () {
    if (horizonScroll) {
      triggerOnScroll();
    }
  }, [horizonScroll]); // ================== INTERNAL HOOKS ==================

  React.useEffect(function () {
    if (internalHooks === INTERNAL_HOOKS && internalRefs) {
      internalRefs.body.current = scrollBodyRef.current;
    }
  }); // ====================== Render ======================

  var TableComponent = getComponent(['table'], 'table'); // Table layout

  var mergedTableLayout = React.useMemo(function () {
    if (tableLayout) {
      return tableLayout;
    } // https://github.com/ant-design/ant-design/issues/25227
    // When scroll.x is max-content, no need to fix table layout
    // it's width should stretch out to fit content


    if (fixColumn) {
      return scroll.x === 'max-content' ? 'auto' : 'fixed';
    }

    if (fixHeader || flattenColumns.some(function (_ref5) {
      var ellipsis = _ref5.ellipsis;
      return ellipsis;
    })) {
      return 'fixed';
    }

    return 'auto';
  }, [fixHeader, fixColumn, flattenColumns, tableLayout]);
  var groupTableNode; // Header props

  var headerProps = {
    colWidths: colWidths,
    columCount: flattenColumns.length,
    stickyOffsets: stickyOffsets,
    onHeaderRow: onHeaderRow
  }; // Empty

  var emptyNode = React.useMemo(function () {
    if (hasData) {
      return null;
    }

    if (typeof emptyText === 'function') {
      return emptyText();
    }

    return emptyText;
  }, [hasData, emptyText]); // Body

  var bodyTable = React.createElement(_Body.default, {
    data: mergedData,
    measureColumnWidth: fixHeader || horizonScroll,
    expandedKeys: mergedExpandedKeys,
    rowExpandable: rowExpandable,
    getRowKey: getRowKey,
    onRow: onRow,
    emptyNode: emptyNode,
    childrenColumnName: mergedChildrenColumnName
  });
  var bodyColGroup = React.createElement(_ColGroup.default, {
    colWidths: flattenColumns.map(function (_ref6) {
      var width = _ref6.width;
      return width;
    }),
    columns: flattenColumns
  });
  var footerTable = summary && React.createElement(_Footer.default, null, summary(mergedData));
  var customizeScrollBody = getComponent(['body']);

  if (process.env.NODE_ENV !== 'production' && typeof customizeScrollBody === 'function' && hasData && !fixHeader) {
    (0, _warning.default)(false, '`components.body` with render props is only work on `scroll.y`.');
  }

  if (fixHeader) {
    var bodyContent;

    if (typeof customizeScrollBody === 'function') {
      bodyContent = customizeScrollBody(mergedData, {
        scrollbarSize: scrollbarSize,
        ref: scrollBodyRef,
        onScroll: onScroll
      });
      headerProps.colWidths = flattenColumns.map(function (_ref7, index) {
        var width = _ref7.width;
        var colWidth = index === columns.length - 1 ? width - scrollbarSize : width;

        if (typeof colWidth === 'number' && !Number.isNaN(colWidth)) {
          return colWidth;
        }

        (0, _warning.default)(false, 'When use `components.body` with render props. Each column should have a fixed value.');
        return 0;
      });
    } else {
      bodyContent = React.createElement("div", {
        style: _objectSpread(_objectSpread({}, scrollXStyle), scrollYStyle),
        onScroll: onScroll,
        ref: scrollBodyRef,
        className: (0, _classnames.default)("".concat(prefixCls, "-body"))
      }, React.createElement(TableComponent, {
        style: _objectSpread(_objectSpread({}, scrollTableStyle), {}, {
          tableLayout: mergedTableLayout
        })
      }, bodyColGroup, bodyTable, footerTable));
    }

    groupTableNode = React.createElement(React.Fragment, null, showHeader !== false && React.createElement("div", {
      style: {
        overflow: 'hidden'
      },
      onScroll: onScroll,
      ref: scrollHeaderRef,
      className: (0, _classnames.default)("".concat(prefixCls, "-header"))
    }, React.createElement(_FixedHeader.default, Object.assign({}, headerProps, columnContext, {
      direction: direction
    }))), bodyContent);
  } else {
    groupTableNode = React.createElement("div", {
      style: _objectSpread(_objectSpread({}, scrollXStyle), scrollYStyle),
      className: (0, _classnames.default)("".concat(prefixCls, "-content")),
      onScroll: onScroll,
      ref: scrollBodyRef
    }, React.createElement(TableComponent, {
      style: _objectSpread(_objectSpread({}, scrollTableStyle), {}, {
        tableLayout: mergedTableLayout
      })
    }, bodyColGroup, showHeader !== false && React.createElement(_Header.default, Object.assign({}, headerProps, columnContext)), bodyTable, footerTable));
  }

  var ariaProps = (0, _legacyUtil.getDataAndAriaProps)(props);
  var fullTable = React.createElement("div", Object.assign({
    className: (0, _classnames.default)(prefixCls, className, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-ping-left"), pingedLeft), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-ping-right"), pingedRight), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-layout-fixed"), tableLayout === 'fixed'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-fixed-header"), fixHeader), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-fixed-column"), fixColumn), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-scroll-horizontal"), horizonScroll), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-has-fix-left"), flattenColumns[0] && flattenColumns[0].fixed), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-has-fix-right"), flattenColumns[flattenColumns.length - 1] && flattenColumns[flattenColumns.length - 1].fixed === 'right'), _classNames)),
    style: style,
    id: id,
    ref: fullTableRef
  }, ariaProps), React.createElement(MemoTableContent, {
    pingLeft: pingedLeft,
    pingRight: pingedRight,
    props: _objectSpread(_objectSpread({}, props), {}, {
      stickyOffsets: stickyOffsets,
      mergedExpandedKeys: mergedExpandedKeys
    })
  }, title && React.createElement(_Panel.default, {
    className: "".concat(prefixCls, "-title")
  }, title(mergedData)), React.createElement("div", {
    className: "".concat(prefixCls, "-container")
  }, groupTableNode), footer && React.createElement(_Panel.default, {
    className: "".concat(prefixCls, "-footer")
  }, footer(mergedData))));

  if (horizonScroll) {
    fullTable = React.createElement(_rcResizeObserver.default, {
      onResize: onFullTableResize
    }, fullTable);
  }

  var TableContextValue = React.useMemo(function () {
    return {
      prefixCls: prefixCls,
      getComponent: getComponent,
      scrollbarSize: scrollbarSize,
      direction: direction,
      fixedInfoList: flattenColumns.map(function (_, colIndex) {
        return (0, _fixUtil.getCellFixedInfo)(colIndex, colIndex, flattenColumns, stickyOffsets, direction);
      })
    };
  }, [prefixCls, getComponent, scrollbarSize, direction, flattenColumns, stickyOffsets, direction]);
  var BodyContextValue = React.useMemo(function () {
    return _objectSpread(_objectSpread({}, columnContext), {}, {
      tableLayout: mergedTableLayout,
      rowClassName: rowClassName,
      expandedRowClassName: expandedRowClassName,
      componentWidth: componentWidth,
      fixHeader: fixHeader,
      fixColumn: fixColumn,
      horizonScroll: horizonScroll,
      expandIcon: mergedExpandIcon,
      expandableType: expandableType,
      expandRowByClick: expandRowByClick,
      expandedRowRender: expandedRowRender,
      onTriggerExpand: onTriggerExpand,
      expandIconColumnIndex: expandIconColumnIndex,
      indentSize: indentSize
    });
  }, [columnContext, mergedTableLayout, rowClassName, expandedRowClassName, componentWidth, fixHeader, fixColumn, horizonScroll, mergedExpandIcon, expandableType, expandRowByClick, expandedRowRender, onTriggerExpand, expandIconColumnIndex, indentSize]);
  var ResizeContextValue = React.useMemo(function () {
    return {
      onColumnResize: onColumnResize
    };
  }, [onColumnResize]);
  return React.createElement(_TableContext.default.Provider, {
    value: TableContextValue
  }, React.createElement(_BodyContext.default.Provider, {
    value: BodyContextValue
  }, React.createElement(_ResizeContext.default.Provider, {
    value: ResizeContextValue
  }, fullTable)));
}

Table.Column = _Column.default;
Table.ColumnGroup = _ColumnGroup.default;
Table.Summary = _Footer.FooterComponents;
Table.defaultProps = {
  rowKey: 'key',
  prefixCls: 'rc-table',
  emptyText: function emptyText() {
    return 'No Data';
  }
};
var _default = Table;
exports.default = _default;