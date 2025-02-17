import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Feature:
 *  - fixed not need to set width
 *  - support `rowExpandable` to config row expand logic
 *  - add `summary` to support `() => ReactNode`
 *
 * Update:
 *  - `dataIndex` is `array[]` now
 *  - `expandable` wrap all the expand related props
 *
 * Removed:
 *  - expandIconAsCell
 *  - useFixedHeader
 *  - rowRef
 *  - columns[number].onCellClick
 *  - onRowClick
 *  - onRowDoubleClick
 *  - onRowMouseEnter
 *  - onRowMouseLeave
 *  - getBodyWrapper
 *  - bodyStyle
 *
 * Deprecated:
 *  - All expanded props, move into expandable
 */
import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import warning from "rc-util/es/warning";
import ResizeObserver from 'rc-resize-observer';
import getScrollBarSize from "rc-util/es/getScrollBarSize";
import ColumnGroup from './sugar/ColumnGroup';
import Column from './sugar/Column';
import FixedHeader from './Header/FixedHeader';
import Header from './Header/Header';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import Body from './Body';
import useColumns from './hooks/useColumns';
import { useFrameState, useTimeoutLock } from './hooks/useFrame';
import { getPathValue, mergeObject, validateValue, getColumnsKey } from './utils/valueUtil';
import ResizeContext from './context/ResizeContext';
import useStickyOffsets from './hooks/useStickyOffsets';
import ColGroup from './ColGroup';
import { getExpandableProps, getDataAndAriaProps } from './utils/legacyUtil';
import Panel from './Panel';
import Footer, { FooterComponents } from './Footer';
import { findAllChildrenKeys, renderExpandIcon } from './utils/expandUtil';
import { getCellFixedInfo } from './utils/fixUtil'; // Used for conditions cache

var EMPTY_DATA = []; // Used for customize scroll

var EMPTY_SCROLL_TARGET = {};
export var INTERNAL_HOOKS = 'rc-table-internal-hook';
var MemoTableContent = React.memo(function (_ref) {
  var children = _ref.children;
  return children;
}, function (prev, next) {
  if (!shallowEqual(prev.props, next.props)) {
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
      _React$useState2 = _slicedToArray(_React$useState, 2),
      scrollbarSize = _React$useState2[0],
      setScrollbarSize = _React$useState2[1];

  React.useEffect(function () {
    setScrollbarSize(getScrollBarSize());
  }); // ===================== Warning ======================

  if (process.env.NODE_ENV !== 'production') {
    ['onRowClick', 'onRowDoubleClick', 'onRowContextMenu', 'onRowMouseEnter', 'onRowMouseLeave'].forEach(function (name) {
      warning(props[name] === undefined, "`".concat(name, "` is removed, please use `onRow` instead."));
    });
    warning(!('getBodyWrapper' in props), '`getBodyWrapper` is deprecated, please use custom `components` instead.');
  } // ==================== Customize =====================


  var mergedComponents = React.useMemo(function () {
    return mergeObject(components, {});
  }, [components]);
  var getComponent = React.useCallback(function (path, defaultComponent) {
    return getPathValue(mergedComponents, path) || defaultComponent;
  }, [mergedComponents]);
  var getRowKey = React.useMemo(function () {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return function (record) {
      var key = record && record[rowKey];

      if (process.env.NODE_ENV !== 'production') {
        warning(key !== undefined, 'Each record in table should have a unique `key` prop, or set `rowKey` to an unique primary key.');
      }

      return key;
    };
  }, [rowKey]); // ====================== Expand ======================

  var expandableConfig = getExpandableProps(props);
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
  var mergedExpandIcon = expandIcon || renderExpandIcon;
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
      return record && _typeof(record) === 'object' && mergedChildrenColumnName in record;
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
      return findAllChildrenKeys(mergedData, getRowKey, mergedChildrenColumnName);
    }

    return [];
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
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
      newExpandedKeys = _toConsumableArray(mergedExpandedKeys);
    } else {
      newExpandedKeys = [].concat(_toConsumableArray(mergedExpandedKeys), [key]);
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
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      componentWidth = _React$useState6[0],
      setComponentWidth = _React$useState6[1];

  var _useColumns = useColumns(_objectSpread(_objectSpread(_objectSpread({}, props), expandableConfig), {}, {
    expandable: !!expandedRowRender,
    expandedKeys: mergedExpandedKeys,
    getRowKey: getRowKey,
    // https://github.com/ant-design/ant-design/issues/23894
    onTriggerExpand: onTriggerExpand,
    expandIcon: mergedExpandIcon,
    expandIconColumnIndex: expandIconColumnIndex,
    direction: direction
  }), internalHooks === INTERNAL_HOOKS ? transformColumns : null),
      _useColumns2 = _slicedToArray(_useColumns, 2),
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
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      pingedLeft = _React$useState8[0],
      setPingedLeft = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      pingedRight = _React$useState10[0],
      setPingedRight = _React$useState10[1];

  var _useFrameState = useFrameState(new Map()),
      _useFrameState2 = _slicedToArray(_useFrameState, 2),
      colsWidths = _useFrameState2[0],
      updateColsWidths = _useFrameState2[1]; // Convert map to number width


  var colsKeys = getColumnsKey(flattenColumns);
  var pureColWidths = colsKeys.map(function (columnKey) {
    return colsWidths.get(columnKey);
  });
  var colWidths = React.useMemo(function () {
    return pureColWidths;
  }, [pureColWidths.join('_')]);
  var stickyOffsets = useStickyOffsets(colWidths, flattenColumns.length, direction);
  var fixHeader = hasData && scroll && validateValue(scroll.y);
  var horizonScroll = scroll && validateValue(scroll.x);
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

  var _useTimeoutLock = useTimeoutLock(null),
      _useTimeoutLock2 = _slicedToArray(_useTimeoutLock, 2),
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

  var bodyTable = React.createElement(Body, {
    data: mergedData,
    measureColumnWidth: fixHeader || horizonScroll,
    expandedKeys: mergedExpandedKeys,
    rowExpandable: rowExpandable,
    getRowKey: getRowKey,
    onRow: onRow,
    emptyNode: emptyNode,
    childrenColumnName: mergedChildrenColumnName
  });
  var bodyColGroup = React.createElement(ColGroup, {
    colWidths: flattenColumns.map(function (_ref6) {
      var width = _ref6.width;
      return width;
    }),
    columns: flattenColumns
  });
  var footerTable = summary && React.createElement(Footer, null, summary(mergedData));
  var customizeScrollBody = getComponent(['body']);

  if (process.env.NODE_ENV !== 'production' && typeof customizeScrollBody === 'function' && hasData && !fixHeader) {
    warning(false, '`components.body` with render props is only work on `scroll.y`.');
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

        warning(false, 'When use `components.body` with render props. Each column should have a fixed value.');
        return 0;
      });
    } else {
      bodyContent = React.createElement("div", {
        style: _objectSpread(_objectSpread({}, scrollXStyle), scrollYStyle),
        onScroll: onScroll,
        ref: scrollBodyRef,
        className: classNames("".concat(prefixCls, "-body"))
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
      className: classNames("".concat(prefixCls, "-header"))
    }, React.createElement(FixedHeader, Object.assign({}, headerProps, columnContext, {
      direction: direction
    }))), bodyContent);
  } else {
    groupTableNode = React.createElement("div", {
      style: _objectSpread(_objectSpread({}, scrollXStyle), scrollYStyle),
      className: classNames("".concat(prefixCls, "-content")),
      onScroll: onScroll,
      ref: scrollBodyRef
    }, React.createElement(TableComponent, {
      style: _objectSpread(_objectSpread({}, scrollTableStyle), {}, {
        tableLayout: mergedTableLayout
      })
    }, bodyColGroup, showHeader !== false && React.createElement(Header, Object.assign({}, headerProps, columnContext)), bodyTable, footerTable));
  }

  var ariaProps = getDataAndAriaProps(props);
  var fullTable = React.createElement("div", Object.assign({
    className: classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _defineProperty(_classNames, "".concat(prefixCls, "-ping-left"), pingedLeft), _defineProperty(_classNames, "".concat(prefixCls, "-ping-right"), pingedRight), _defineProperty(_classNames, "".concat(prefixCls, "-layout-fixed"), tableLayout === 'fixed'), _defineProperty(_classNames, "".concat(prefixCls, "-fixed-header"), fixHeader), _defineProperty(_classNames, "".concat(prefixCls, "-fixed-column"), fixColumn), _defineProperty(_classNames, "".concat(prefixCls, "-scroll-horizontal"), horizonScroll), _defineProperty(_classNames, "".concat(prefixCls, "-has-fix-left"), flattenColumns[0] && flattenColumns[0].fixed), _defineProperty(_classNames, "".concat(prefixCls, "-has-fix-right"), flattenColumns[flattenColumns.length - 1] && flattenColumns[flattenColumns.length - 1].fixed === 'right'), _classNames)),
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
  }, title && React.createElement(Panel, {
    className: "".concat(prefixCls, "-title")
  }, title(mergedData)), React.createElement("div", {
    className: "".concat(prefixCls, "-container")
  }, groupTableNode), footer && React.createElement(Panel, {
    className: "".concat(prefixCls, "-footer")
  }, footer(mergedData))));

  if (horizonScroll) {
    fullTable = React.createElement(ResizeObserver, {
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
        return getCellFixedInfo(colIndex, colIndex, flattenColumns, stickyOffsets, direction);
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
  return React.createElement(TableContext.Provider, {
    value: TableContextValue
  }, React.createElement(BodyContext.Provider, {
    value: BodyContextValue
  }, React.createElement(ResizeContext.Provider, {
    value: ResizeContextValue
  }, fullTable)));
}

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Summary = FooterComponents;
Table.defaultProps = {
  rowKey: 'key',
  prefixCls: 'rc-table',
  emptyText: function emptyText() {
    return 'No Data';
  }
};
export default Table;