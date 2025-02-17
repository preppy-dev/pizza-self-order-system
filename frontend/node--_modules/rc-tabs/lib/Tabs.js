"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _useMergedState5 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));

var _TabNavList = _interopRequireDefault(require("./TabNavList"));

var _TabPanelList = _interopRequireDefault(require("./TabPanelList"));

var _TabPane = _interopRequireDefault(require("./TabPanelList/TabPane"));

var _TabContext = _interopRequireDefault(require("./TabContext"));

var _useTouchMove = require("./hooks/useTouchMove");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Should added antd:
 * - type
 *
 * Removed:
 * - onNextClick
 * - onPrevClick
 * - keyboard
 */
// Used for accessibility
var uuid = 0;

function parseTabList(children) {
  return (0, _toArray.default)(children).map(function (node) {
    if (React.isValidElement(node)) {
      var key = node.key !== undefined ? String(node.key) : undefined;
      return _objectSpread(_objectSpread({
        key: key
      }, node.props), {}, {
        node: node
      });
    }

    return null;
  }).filter(function (tab) {
    return tab;
  });
}

function Tabs(_ref, ref) {
  var _classNames;

  var id = _ref.id,
      _ref$prefixCls = _ref.prefixCls,
      prefixCls = _ref$prefixCls === void 0 ? 'rc-tabs' : _ref$prefixCls,
      className = _ref.className,
      children = _ref.children,
      direction = _ref.direction,
      activeKey = _ref.activeKey,
      defaultActiveKey = _ref.defaultActiveKey,
      editable = _ref.editable,
      animated = _ref.animated,
      _ref$tabPosition = _ref.tabPosition,
      tabPosition = _ref$tabPosition === void 0 ? 'top' : _ref$tabPosition,
      tabBarGutter = _ref.tabBarGutter,
      tabBarStyle = _ref.tabBarStyle,
      tabBarExtraContent = _ref.tabBarExtraContent,
      locale = _ref.locale,
      moreIcon = _ref.moreIcon,
      moreTransitionName = _ref.moreTransitionName,
      destroyInactiveTabPane = _ref.destroyInactiveTabPane,
      renderTabBar = _ref.renderTabBar,
      onChange = _ref.onChange,
      onTabClick = _ref.onTabClick,
      onTabScroll = _ref.onTabScroll,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["id", "prefixCls", "className", "children", "direction", "activeKey", "defaultActiveKey", "editable", "animated", "tabPosition", "tabBarGutter", "tabBarStyle", "tabBarExtraContent", "locale", "moreIcon", "moreTransitionName", "destroyInactiveTabPane", "renderTabBar", "onChange", "onTabClick", "onTabScroll"]);
  var tabs = parseTabList(children);
  var rtl = direction === 'rtl';
  var mergedAnimated;

  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false
    };
  } else {
    mergedAnimated = _objectSpread({
      inkBar: true,
      tabPane: false
    }, animated !== true ? animated : null);
  } // ======================== Mobile ========================


  var _useState = (0, React.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      mobile = _useState2[0],
      setMobile = _useState2[1];

  (0, React.useEffect)(function () {
    // Only update on the client side
    setMobile((0, _useTouchMove.isMobile)());
  }, []); // ====================== Active Key ======================

  var _useMergedState = (0, _useMergedState5.default)(function () {
    var _tabs$;

    return (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key;
  }, {
    value: activeKey,
    defaultValue: defaultActiveKey
  }),
      _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
      mergedActiveKey = _useMergedState2[0],
      setMergedActiveKey = _useMergedState2[1];

  var _useState3 = (0, React.useState)(function () {
    return tabs.findIndex(function (tab) {
      return tab.key === mergedActiveKey;
    });
  }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      activeIndex = _useState4[0],
      setActiveIndex = _useState4[1]; // Reset active key if not exist anymore


  (0, React.useEffect)(function () {
    var newActiveIndex = tabs.findIndex(function (tab) {
      return tab.key === mergedActiveKey;
    });

    if (newActiveIndex === -1) {
      var _tabs$newActiveIndex;

      newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
      setMergedActiveKey((_tabs$newActiveIndex = tabs[newActiveIndex]) === null || _tabs$newActiveIndex === void 0 ? void 0 : _tabs$newActiveIndex.key);
    }

    setActiveIndex(newActiveIndex);
  }, [tabs.map(function (tab) {
    return tab.key;
  }).join('_'), mergedActiveKey, activeIndex]); // ===================== Accessibility ====================

  var _useMergedState3 = (0, _useMergedState5.default)(null, {
    value: id
  }),
      _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
      mergedId = _useMergedState4[0],
      setMergedId = _useMergedState4[1];

  var mergedTabPosition = tabPosition;

  if (mobile && !['left', 'right'].includes(tabPosition)) {
    mergedTabPosition = 'top';
  } // Async generate id to avoid ssr mapping failed


  (0, React.useEffect)(function () {
    if (!id) {
      setMergedId("rc-tabs-".concat(process.env.NODE_ENV === 'test' ? 'test' : uuid));
      uuid += 1;
    }
  }, []); // ======================== Events ========================

  function onInternalTabClick(key, e) {
    onTabClick === null || onTabClick === void 0 ? void 0 : onTabClick(key, e);
    setMergedActiveKey(key);
    onChange === null || onChange === void 0 ? void 0 : onChange(key);
  } // ======================== Render ========================


  var sharedProps = {
    id: mergedId,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition: mergedTabPosition,
    rtl: rtl,
    mobile: mobile
  };
  var tabNavBar;

  var tabNavBarProps = _objectSpread(_objectSpread({}, sharedProps), {}, {
    editable: editable,
    locale: locale,
    moreIcon: moreIcon,
    moreTransitionName: moreTransitionName,
    tabBarGutter: tabBarGutter,
    onTabClick: onInternalTabClick,
    onTabScroll: onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle
  });

  if (renderTabBar) {
    tabNavBar = renderTabBar(tabNavBarProps, _TabNavList.default);
  } else {
    tabNavBar = React.createElement(_TabNavList.default, Object.assign({}, tabNavBarProps));
  }

  return React.createElement(_TabContext.default.Provider, {
    value: {
      tabs: tabs,
      prefixCls: prefixCls
    }
  }, React.createElement("div", Object.assign({
    ref: ref,
    id: id,
    className: (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(mergedTabPosition), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-mobile"), mobile), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-editable"), editable), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-rtl"), rtl), _classNames), className)
  }, restProps), tabNavBar, React.createElement(_TabPanelList.default, Object.assign({
    destroyInactiveTabPane: destroyInactiveTabPane
  }, sharedProps, {
    animated: mergedAnimated
  }))));
}

var ForwardTabs = React.forwardRef(Tabs);
ForwardTabs.TabPane = _TabPane.default;
var _default = ForwardTabs;
exports.default = _default;