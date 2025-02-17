"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveKey = getActiveKey;
exports.saveRef = saveRef;
exports.default = exports.SubPopupMenu = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _miniStore = require("mini-store");

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _createChainedFunction = _interopRequireDefault(require("rc-util/lib/createChainedFunction"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

var _DOMWrap = _interopRequireDefault(require("./DOMWrap"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function allDisabled(arr) {
  if (!arr.length) {
    return true;
  }

  return arr.every(function (c) {
    return !!c.props.disabled;
  });
}

function updateActiveKey(store, menuId, activeKey) {
  var state = store.getState();
  store.setState({
    activeKey: _objectSpread(_objectSpread({}, state.activeKey), {}, (0, _defineProperty2.default)({}, menuId, activeKey))
  });
}

function getEventKey(props) {
  // when eventKey not available ,it's menu and return menu id '0-menu-'
  return props.eventKey || '0-menu-';
}

function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var children = props.children,
      eventKey = props.eventKey;

  if (activeKey) {
    var found;
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (c && c.props && !c.props.disabled && activeKey === (0, _util.getKeyFromChildrenIndex)(c, eventKey, i)) {
        found = true;
      }
    });

    if (found) {
      return activeKey;
    }
  }

  activeKey = null;

  if (props.defaultActiveFirst) {
    (0, _util.loopMenuItem)(children, function (c, i) {
      if (!activeKey && c && !c.props.disabled) {
        activeKey = (0, _util.getKeyFromChildrenIndex)(c, eventKey, i);
      }
    });
    return activeKey;
  }

  return activeKey;
}

function saveRef(c) {
  if (c) {
    var index = this.instanceArray.indexOf(c);

    if (index !== -1) {
      // update component if it's already inside instanceArray
      this.instanceArray[index] = c;
    } else {
      // add component if it's not in instanceArray yet;
      this.instanceArray.push(c);
    }
  }
}

var SubPopupMenu =
/** @class */
function () {
  var SubPopupMenu = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(SubPopupMenu, _React$Component);

    var _super = _createSuper(SubPopupMenu);

    function SubPopupMenu(props) {
      var _this;

      (0, _classCallCheck2.default)(this, SubPopupMenu);
      _this = _super.call(this, props);
      /**
       * all keyboard events callbacks run from here at first
       *
       * note:
       *  This legacy code that `onKeyDown` is called by parent instead of dom self.
       *  which need return code to check if this event is handled
       */

      _this.onKeyDown = function (e, callback) {
        var keyCode = e.keyCode;
        var handled;

        _this.getFlatInstanceArray().forEach(function (obj) {
          if (obj && obj.props.active && obj.onKeyDown) {
            handled = obj.onKeyDown(e);
          }
        });

        if (handled) {
          return 1;
        }

        var activeItem = null;

        if (keyCode === _KeyCode.default.UP || keyCode === _KeyCode.default.DOWN) {
          activeItem = _this.step(keyCode === _KeyCode.default.UP ? -1 : 1);
        }

        if (activeItem) {
          e.preventDefault();
          updateActiveKey(_this.props.store, getEventKey(_this.props), activeItem.props.eventKey);

          if (typeof callback === 'function') {
            callback(activeItem);
          }

          return 1;
        }

        return undefined;
      };

      _this.onItemHover = function (e) {
        var key = e.key,
            hover = e.hover;
        updateActiveKey(_this.props.store, getEventKey(_this.props), hover ? key : null);
      };

      _this.onDeselect = function (selectInfo) {
        _this.props.onDeselect(selectInfo);
      };

      _this.onSelect = function (selectInfo) {
        _this.props.onSelect(selectInfo);
      };

      _this.onClick = function (e) {
        _this.props.onClick(e);
      };

      _this.onOpenChange = function (e) {
        _this.props.onOpenChange(e);
      };

      _this.onDestroy = function (key) {
        /* istanbul ignore next */
        _this.props.onDestroy(key);
      };

      _this.getFlatInstanceArray = function () {
        return _this.instanceArray;
      };

      _this.step = function (direction) {
        var children = _this.getFlatInstanceArray();

        var activeKey = _this.props.store.getState().activeKey[getEventKey(_this.props)];

        var len = children.length;

        if (!len) {
          return null;
        }

        if (direction < 0) {
          children = children.concat().reverse();
        } // find current activeIndex


        var activeIndex = -1;
        children.every(function (c, ci) {
          if (c && c.props.eventKey === activeKey) {
            activeIndex = ci;
            return false;
          }

          return true;
        });

        if (!_this.props.defaultActiveFirst && activeIndex !== -1 && allDisabled(children.slice(activeIndex, len - 1))) {
          return undefined;
        }

        var start = (activeIndex + 1) % len;
        var i = start;

        do {
          var child = children[i];

          if (!child || child.props.disabled) {
            i = (i + 1) % len;
          } else {
            return child;
          }
        } while (i !== start);

        return null;
      };

      _this.renderCommonMenuItem = function (child, i, extraProps) {
        var state = _this.props.store.getState();

        var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
            props = _assertThisInitialize.props;

        var key = (0, _util.getKeyFromChildrenIndex)(child, props.eventKey, i);
        var childProps = child.props; // https://github.com/ant-design/ant-design/issues/11517#issuecomment-477403055

        if (!childProps || typeof child.type === 'string') {
          return child;
        }

        var isActive = key === state.activeKey;

        var newChildProps = _objectSpread(_objectSpread({
          mode: childProps.mode || props.mode,
          level: props.level,
          inlineIndent: props.inlineIndent,
          renderMenuItem: _this.renderMenuItem,
          rootPrefixCls: props.prefixCls,
          index: i,
          parentMenu: props.parentMenu,
          // customized ref function, need to be invoked manually in child's componentDidMount
          manualRef: childProps.disabled ? undefined : (0, _createChainedFunction.default)(child.ref, saveRef.bind((0, _assertThisInitialized2.default)(_this))),
          eventKey: key,
          active: !childProps.disabled && isActive,
          multiple: props.multiple,
          onClick: function onClick(e) {
            (childProps.onClick || _util.noop)(e);

            _this.onClick(e);
          },
          onItemHover: _this.onItemHover,
          motion: props.motion,
          subMenuOpenDelay: props.subMenuOpenDelay,
          subMenuCloseDelay: props.subMenuCloseDelay,
          forceSubMenuRender: props.forceSubMenuRender,
          onOpenChange: _this.onOpenChange,
          onDeselect: _this.onDeselect,
          onSelect: _this.onSelect,
          builtinPlacements: props.builtinPlacements,
          itemIcon: childProps.itemIcon || _this.props.itemIcon,
          expandIcon: childProps.expandIcon || _this.props.expandIcon
        }, extraProps), {}, {
          direction: props.direction
        }); // ref: https://github.com/ant-design/ant-design/issues/13943


        if (props.mode === 'inline' || (0, _util.isMobileDevice)()) {
          newChildProps.triggerSubMenuAction = 'click';
        }

        return _react.default.cloneElement(child, newChildProps);
      };

      _this.renderMenuItem = function (c, i, subMenuKey) {
        /* istanbul ignore if */
        if (!c) {
          return null;
        }

        var state = _this.props.store.getState();

        var extraProps = {
          openKeys: state.openKeys,
          selectedKeys: state.selectedKeys,
          triggerSubMenuAction: _this.props.triggerSubMenuAction,
          subMenuKey: subMenuKey
        };
        return _this.renderCommonMenuItem(c, i, extraProps);
      };

      props.store.setState({
        activeKey: _objectSpread(_objectSpread({}, props.store.getState().activeKey), {}, (0, _defineProperty2.default)({}, props.eventKey, getActiveKey(props, props.activeKey)))
      });
      _this.instanceArray = [];
      return _this;
    }

    (0, _createClass2.default)(SubPopupMenu, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        // invoke customized ref to expose component to mixin
        if (this.props.manualRef) {
          this.props.manualRef(this);
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return this.props.visible || nextProps.visible || this.props.className !== nextProps.className || !(0, _shallowequal.default)(this.props.style, nextProps.style);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var props = this.props;
        var originalActiveKey = 'activeKey' in props ? props.activeKey : props.store.getState().activeKey[getEventKey(props)];
        var activeKey = getActiveKey(props, originalActiveKey);

        if (activeKey !== originalActiveKey) {
          updateActiveKey(props.store, getEventKey(props), activeKey);
        } else if ('activeKey' in prevProps) {
          // If prev activeKey is not same as current activeKey,
          // we should set it.
          var prevActiveKey = getActiveKey(prevProps, prevProps.activeKey);

          if (activeKey !== prevActiveKey) {
            updateActiveKey(props.store, getEventKey(props), activeKey);
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = (0, _extends2.default)({}, this.props);
        this.instanceArray = [];
        var className = (0, _classnames.default)(props.prefixCls, props.className, "".concat(props.prefixCls, "-").concat(props.mode));
        var domProps = {
          className: className,
          // role could be 'select' and by default set to menu
          role: props.role || 'menu'
        };

        if (props.id) {
          domProps.id = props.id;
        }

        if (props.focusable) {
          domProps.tabIndex = 0;
          domProps.onKeyDown = this.onKeyDown;
        }

        var prefixCls = props.prefixCls,
            eventKey = props.eventKey,
            visible = props.visible,
            level = props.level,
            mode = props.mode,
            overflowedIndicator = props.overflowedIndicator,
            theme = props.theme;

        _util.menuAllProps.forEach(function (key) {
          return delete props[key];
        }); // Otherwise, the propagated click event will trigger another onClick


        delete props.onClick;
        return _react.default.createElement(_DOMWrap.default, Object.assign({}, props, {
          prefixCls: prefixCls,
          mode: mode,
          tag: "ul",
          level: level,
          theme: theme,
          visible: visible,
          overflowedIndicator: overflowedIndicator
        }, domProps), _react.default.Children.map(props.children, function (c, i) {
          return _this2.renderMenuItem(c, i, eventKey || '0-menu-');
        }));
      }
    }]);
    return SubPopupMenu;
  }(_react.default.Component);

  SubPopupMenu.defaultProps = {
    prefixCls: 'rc-menu',
    className: '',
    mode: 'vertical',
    level: 1,
    inlineIndent: 24,
    visible: true,
    focusable: true,
    style: {},
    manualRef: _util.noop
  };
  return SubPopupMenu;
}();

exports.SubPopupMenu = SubPopupMenu;
var connected = (0, _miniStore.connect)()(SubPopupMenu);
var _default = connected;
exports.default = _default;