import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import raf from 'raf';
import ResizeObserver from 'rc-resize-observer';
import useRaf, { useRafState } from '../hooks/useRaf';
import TabNode from './TabNode';
import useOffsets from '../hooks/useOffsets';
import useVisibleRange from '../hooks/useVisibleRange';
import OperationNode from './OperationNode';
import TabContext from '../TabContext';
import useTouchMove from '../hooks/useTouchMove';
import useRefs from '../hooks/useRefs';
import AddButton from './AddButton';
import useSyncState from '../hooks/useSyncState';

function TabNavList(props, ref) {
  var _classNames;

  var _React$useContext = React.useContext(TabContext),
      prefixCls = _React$useContext.prefixCls,
      tabs = _React$useContext.tabs;

  var className = props.className,
      style = props.style,
      id = props.id,
      animated = props.animated,
      activeKey = props.activeKey,
      rtl = props.rtl,
      extra = props.extra,
      editable = props.editable,
      locale = props.locale,
      tabPosition = props.tabPosition,
      tabBarGutter = props.tabBarGutter,
      children = props.children,
      onTabClick = props.onTabClick,
      onTabScroll = props.onTabScroll;
  var tabsWrapperRef = useRef();
  var tabListRef = useRef();
  var operationsRef = useRef();
  var innerAddButtonRef = useRef();

  var _useRefs = useRefs(),
      _useRefs2 = _slicedToArray(_useRefs, 2),
      getBtnRef = _useRefs2[0],
      removeBtnRef = _useRefs2[1];

  var tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';

  var _useSyncState = useSyncState(0, function (next, prev) {
    if (tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({
        direction: next > prev ? 'left' : 'right'
      });
    }
  }),
      _useSyncState2 = _slicedToArray(_useSyncState, 2),
      transformLeft = _useSyncState2[0],
      setTransformLeft = _useSyncState2[1];

  var _useSyncState3 = useSyncState(0, function (next, prev) {
    if (!tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({
        direction: next > prev ? 'top' : 'bottom'
      });
    }
  }),
      _useSyncState4 = _slicedToArray(_useSyncState3, 2),
      transformTop = _useSyncState4[0],
      setTransformTop = _useSyncState4[1];

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      wrapperScrollWidth = _useState2[0],
      setWrapperScrollWidth = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      wrapperScrollHeight = _useState4[0],
      setWrapperScrollHeight = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      wrapperWidth = _useState6[0],
      setWrapperWidth = _useState6[1];

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      wrapperHeight = _useState8[0],
      setWrapperHeight = _useState8[1];

  var _useRafState = useRafState(new Map()),
      _useRafState2 = _slicedToArray(_useRafState, 2),
      tabSizes = _useRafState2[0],
      setTabSizes = _useRafState2[1];

  var tabOffsets = useOffsets(tabs, tabSizes, wrapperScrollWidth); // ========================== Util =========================

  var operationsHiddenClassName = "".concat(prefixCls, "-nav-operations-hidden");
  var transformMin = 0;
  var transformMax = 0;

  if (!tabPositionTopOrBottom) {
    transformMin = Math.min(0, wrapperHeight - wrapperScrollHeight);
    transformMax = 0;
  } else if (rtl) {
    transformMin = 0;
    transformMax = Math.max(0, wrapperScrollWidth - wrapperWidth);
  } else {
    transformMin = Math.min(0, wrapperWidth - wrapperScrollWidth);
    transformMax = 0;
  }

  function alignInRange(value) {
    if (value < transformMin) {
      return [transformMin, false];
    }

    if (value > transformMax) {
      return [transformMax, false];
    }

    return [value, true];
  } // ========================= Mobile ========================


  var touchMovingRef = useRef();

  var _useState9 = useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      lockAnimation = _useState10[0],
      setLockAnimation = _useState10[1];

  function doLockAnimation() {
    setLockAnimation(Date.now());
  }

  function clearTouchMoving() {
    window.clearTimeout(touchMovingRef.current);
  }

  useTouchMove(tabsWrapperRef, function (offsetX, offsetY) {
    var preventDefault = false;

    function doMove(setState, offset) {
      setState(function (value) {
        var _alignInRange = alignInRange(value + offset),
            _alignInRange2 = _slicedToArray(_alignInRange, 2),
            newValue = _alignInRange2[0],
            needPrevent = _alignInRange2[1];

        preventDefault = needPrevent;
        return newValue;
      });
    }

    if (tabPositionTopOrBottom) {
      // Skip scroll if place is enough
      if (wrapperWidth >= wrapperScrollWidth) {
        return preventDefault;
      }

      doMove(setTransformLeft, offsetX);
    } else {
      if (wrapperHeight >= wrapperScrollHeight) {
        return preventDefault;
      }

      doMove(setTransformTop, offsetY);
    }

    clearTouchMoving();
    doLockAnimation();
    return preventDefault;
  });
  useEffect(function () {
    clearTouchMoving();

    if (lockAnimation) {
      touchMovingRef.current = window.setTimeout(function () {
        setLockAnimation(0);
      }, 100);
    }

    return clearTouchMoving;
  }, [lockAnimation]); // ========================= Scroll ========================

  function scrollToTab() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : activeKey;
    var tabOffset = tabOffsets.get(key);
    if (!tabOffset) return;

    if (tabPositionTopOrBottom) {
      // ============ Align with top & bottom ============
      var newTransform = transformLeft; // RTL

      if (rtl) {
        if (tabOffset.right < transformLeft) {
          newTransform = tabOffset.right;
        } else if (tabOffset.right + tabOffset.width > transformLeft + wrapperWidth) {
          newTransform = tabOffset.right + tabOffset.width - wrapperWidth;
        }
      } // LTR
      else if (tabOffset.left < -transformLeft) {
          newTransform = -tabOffset.left;
        } else if (tabOffset.left + tabOffset.width > -transformLeft + wrapperWidth) {
          newTransform = -(tabOffset.left + tabOffset.width - wrapperWidth);
        }

      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform)[0]);
    } else {
      // ============ Align with left & right ============
      var _newTransform = transformTop;

      if (tabOffset.top < -transformTop) {
        _newTransform = -tabOffset.top;
      } else if (tabOffset.top + tabOffset.height > -transformTop + wrapperHeight) {
        _newTransform = -(tabOffset.top + tabOffset.height - wrapperHeight);
      }

      setTransformLeft(0);
      setTransformTop(alignInRange(_newTransform)[0]);
    }
  } // ========================== Tab ==========================
  // Render tab node & collect tab offset


  var _useVisibleRange = useVisibleRange(tabOffsets, {
    width: wrapperWidth,
    height: wrapperHeight,
    left: transformLeft,
    top: transformTop
  }, _objectSpread(_objectSpread({}, props), {}, {
    tabs: tabs
  })),
      _useVisibleRange2 = _slicedToArray(_useVisibleRange, 2),
      visibleStart = _useVisibleRange2[0],
      visibleEnd = _useVisibleRange2[1];

  function getAdditionalSpaceSize(type) {
    var _innerAddButtonRef$cu, _operationsRef$curren;

    var addBtnSize = ((_innerAddButtonRef$cu = innerAddButtonRef.current) === null || _innerAddButtonRef$cu === void 0 ? void 0 : _innerAddButtonRef$cu[type]) || 0;
    var optionsSize = 0;

    if ((_operationsRef$curren = operationsRef.current) === null || _operationsRef$curren === void 0 ? void 0 : _operationsRef$curren.className.includes(operationsHiddenClassName)) {
      optionsSize = operationsRef.current[type];
    }

    return addBtnSize + optionsSize;
  }

  var tabNodes = tabs.map(function (tab) {
    var key = tab.key;
    return React.createElement(TabNode, {
      id: id,
      prefixCls: prefixCls,
      key: key,
      rtl: rtl,
      tab: tab,
      closable: tab.closable,
      editable: editable,
      active: key === activeKey,
      tabPosition: tabPosition,
      tabBarGutter: tabBarGutter,
      renderWrapper: children,
      removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
      ref: getBtnRef(key),
      onClick: function onClick(e) {
        onTabClick(key, e);
      },
      onRemove: function onRemove() {
        removeBtnRef(key);
      },
      onFocus: function onFocus() {
        scrollToTab(key);
        doLockAnimation(); // Focus element will make scrollLeft change which we should reset back

        if (!rtl) {
          tabsWrapperRef.current.scrollLeft = 0;
        }

        tabsWrapperRef.current.scrollTop = 0;
      }
    });
  });
  var onListHolderResize = useRaf(function () {
    var _tabsWrapperRef$curre, _tabsWrapperRef$curre2, _tabListRef$current, _tabListRef$current2;

    // Update wrapper records
    var offsetWidth = ((_tabsWrapperRef$curre = tabsWrapperRef.current) === null || _tabsWrapperRef$curre === void 0 ? void 0 : _tabsWrapperRef$curre.offsetWidth) || 0;
    var offsetHeight = ((_tabsWrapperRef$curre2 = tabsWrapperRef.current) === null || _tabsWrapperRef$curre2 === void 0 ? void 0 : _tabsWrapperRef$curre2.offsetHeight) || 0;
    setWrapperWidth(offsetWidth);
    setWrapperHeight(offsetHeight);
    setWrapperScrollWidth((((_tabListRef$current = tabListRef.current) === null || _tabListRef$current === void 0 ? void 0 : _tabListRef$current.offsetWidth) || 0) - getAdditionalSpaceSize('offsetWidth'));
    setWrapperScrollHeight((((_tabListRef$current2 = tabListRef.current) === null || _tabListRef$current2 === void 0 ? void 0 : _tabListRef$current2.offsetHeight) || 0) - getAdditionalSpaceSize('offsetHeight')); // Update buttons records

    setTabSizes(function () {
      var newSizes = new Map();
      tabs.forEach(function (_ref) {
        var key = _ref.key;
        var btnNode = getBtnRef(key).current;
        newSizes.set(key, {
          width: btnNode.offsetWidth,
          height: btnNode.offsetHeight,
          left: btnNode.offsetLeft,
          top: btnNode.offsetTop
        });
      });
      return newSizes;
    });
  }); // ======================== Dropdown =======================

  var startHiddenTabs = tabs.slice(0, visibleStart);
  var endHiddenTabs = tabs.slice(visibleEnd + 1);
  var hiddenTabs = [].concat(_toConsumableArray(startHiddenTabs), _toConsumableArray(endHiddenTabs)); // =================== Link & Operations ===================

  var _useState11 = useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      inkStyle = _useState12[0],
      setInkStyle = _useState12[1];

  var activeTabOffset = tabOffsets.get(activeKey); // Delay set ink style to avoid remove tab blink

  var inkBarRafRef = useRef();

  function cleanInkBarRaf() {
    raf.cancel(inkBarRafRef.current);
  }

  useEffect(function () {
    var newInkStyle = {};

    if (activeTabOffset) {
      if (tabPositionTopOrBottom) {
        if (rtl) {
          newInkStyle.right = activeTabOffset.right;
        } else {
          newInkStyle.left = activeTabOffset.left;
        }

        newInkStyle.width = activeTabOffset.width;
      } else {
        newInkStyle.top = activeTabOffset.top;
        newInkStyle.height = activeTabOffset.height;
      }
    }

    cleanInkBarRaf();
    inkBarRafRef.current = raf(function () {
      setInkStyle(newInkStyle);
    });
    return cleanInkBarRaf;
  }, [activeTabOffset, tabPositionTopOrBottom, rtl]); // ========================= Effect ========================

  useEffect(function () {
    scrollToTab();
  }, [activeKey, activeTabOffset, tabOffsets, tabPositionTopOrBottom]); // Should recalculate when rtl changed

  useEffect(function () {
    onListHolderResize();
  }, [rtl, tabBarGutter, activeKey]); // ========================= Render ========================

  var hasDropdown = !!hiddenTabs.length;
  var wrapPrefix = "".concat(prefixCls, "-nav-wrap");
  var pingLeft;
  var pingRight;
  var pingTop;
  var pingBottom;

  if (tabPositionTopOrBottom) {
    if (rtl) {
      pingRight = transformLeft > 0;
      pingLeft = transformLeft + wrapperWidth < wrapperScrollWidth;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = -transformLeft + wrapperWidth < wrapperScrollWidth;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = -transformTop + wrapperHeight < wrapperScrollHeight;
  }
  /* eslint-disable jsx-a11y/interactive-supports-focus */


  return React.createElement("div", {
    ref: ref,
    role: "tablist",
    className: classNames("".concat(prefixCls, "-nav"), className),
    style: style,
    onKeyDown: function onKeyDown() {
      // No need animation when use keyboard
      doLockAnimation();
    }
  }, React.createElement(ResizeObserver, {
    onResize: onListHolderResize
  }, React.createElement("div", {
    className: classNames(wrapPrefix, (_classNames = {}, _defineProperty(_classNames, "".concat(wrapPrefix, "-ping-left"), pingLeft), _defineProperty(_classNames, "".concat(wrapPrefix, "-ping-right"), pingRight), _defineProperty(_classNames, "".concat(wrapPrefix, "-ping-top"), pingTop), _defineProperty(_classNames, "".concat(wrapPrefix, "-ping-bottom"), pingBottom), _classNames)),
    ref: tabsWrapperRef
  }, React.createElement(ResizeObserver, {
    onResize: onListHolderResize
  }, React.createElement("div", {
    ref: tabListRef,
    className: "".concat(prefixCls, "-nav-list"),
    style: {
      transform: "translate(".concat(transformLeft, "px, ").concat(transformTop, "px)"),
      transition: lockAnimation ? 'none' : undefined
    }
  }, tabNodes, !hasDropdown && React.createElement(AddButton, {
    ref: innerAddButtonRef,
    prefixCls: prefixCls,
    locale: locale,
    editable: editable
  }), React.createElement("div", {
    className: classNames("".concat(prefixCls, "-ink-bar"), _defineProperty({}, "".concat(prefixCls, "-ink-bar-animated"), animated.inkBar)),
    style: inkStyle
  }))))), React.createElement(OperationNode, Object.assign({}, props, {
    ref: operationsRef,
    prefixCls: prefixCls,
    tabs: hiddenTabs,
    className: !hasDropdown && operationsHiddenClassName
  })), extra && React.createElement("div", {
    className: "".concat(prefixCls, "-extra-content")
  }, extra));
  /* eslint-enable */
}

export default React.forwardRef(TabNavList);