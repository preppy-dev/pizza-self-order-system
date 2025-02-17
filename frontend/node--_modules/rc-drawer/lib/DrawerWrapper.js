"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _PortalWrapper = _interopRequireDefault(require("rc-util/lib/PortalWrapper"));

var React = _interopRequireWildcard(require("react"));

var _DrawerChild = _interopRequireDefault(require("./DrawerChild"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DrawerWrapper =
/** @class */
function () {
  var DrawerWrapper = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(DrawerWrapper, _React$Component);

    var _super = _createSuper(DrawerWrapper);

    function DrawerWrapper(props) {
      var _this;

      (0, _classCallCheck2.default)(this, DrawerWrapper);
      _this = _super.call(this, props);

      _this.onHandleClick = function (e) {
        var _this$props = _this.props,
            onHandleClick = _this$props.onHandleClick,
            $open = _this$props.open;

        if (onHandleClick) {
          onHandleClick(e);
        }

        if (typeof $open === 'undefined') {
          var _open = _this.state.open;

          _this.setState({
            open: !_open
          });
        }
      };

      _this.onClose = function (e) {
        var _this$props2 = _this.props,
            onClose = _this$props2.onClose,
            open = _this$props2.open;

        if (onClose) {
          onClose(e);
        }

        if (typeof open === 'undefined') {
          _this.setState({
            open: false
          });
        }
      };

      var open = typeof props.open !== 'undefined' ? props.open : !!props.defaultOpen;
      _this.state = {
        open: open
      };

      if ('onMaskClick' in props) {
        console.warn('`onMaskClick` are removed, please use `onClose` instead.');
      }

      return _this;
    }

    (0, _createClass2.default)(DrawerWrapper, [{
      key: "render",
      // tslint:disable-next-line:member-ordering
      value: function render() {
        var _this2 = this;

        var _this$props3 = this.props,
            defaultOpen = _this$props3.defaultOpen,
            getContainer = _this$props3.getContainer,
            wrapperClassName = _this$props3.wrapperClassName,
            forceRender = _this$props3.forceRender,
            handler = _this$props3.handler,
            props = (0, _objectWithoutProperties2.default)(_this$props3, ["defaultOpen", "getContainer", "wrapperClassName", "forceRender", "handler"]);
        var open = this.state.open; // 渲染在当前 dom 里；

        if (!getContainer) {
          return React.createElement("div", {
            className: wrapperClassName,
            ref: function ref(c) {
              _this2.dom = c;
            }
          }, React.createElement(_DrawerChild.default, Object.assign({}, props, {
            open: open,
            handler: handler,
            getContainer: function getContainer() {
              return _this2.dom;
            },
            onClose: this.onClose,
            onHandleClick: this.onHandleClick
          })));
        } // 如果有 handler 为内置强制渲染；


        var $forceRender = !!handler || forceRender;
        return React.createElement(_PortalWrapper.default, {
          visible: open,
          forceRender: $forceRender,
          getContainer: getContainer,
          wrapperClassName: wrapperClassName
        }, function (_ref) {
          var visible = _ref.visible,
              afterClose = _ref.afterClose,
              rest = (0, _objectWithoutProperties2.default)(_ref, ["visible", "afterClose"]);
          return (// react 15，componentWillUnmount 时 Portal 返回 afterClose, visible.
            React.createElement(_DrawerChild.default, Object.assign({}, props, rest, {
              open: visible !== undefined ? visible : open,
              afterVisibleChange: afterClose !== undefined ? afterClose : props.afterVisibleChange,
              handler: handler,
              onClose: _this2.onClose,
              onHandleClick: _this2.onHandleClick
            }))
          );
        });
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, _ref2) {
        var prevProps = _ref2.prevProps;
        var newState = {
          prevProps: props
        };

        if (typeof prevProps !== 'undefined' && props.open !== prevProps.open) {
          newState.open = props.open;
        }

        return newState;
      }
    }]);
    return DrawerWrapper;
  }(React.Component);

  DrawerWrapper.defaultProps = {
    prefixCls: 'drawer',
    placement: 'left',
    getContainer: 'body',
    defaultOpen: false,
    level: 'all',
    duration: '.3s',
    ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    onChange: function onChange() {},
    afterVisibleChange: function afterVisibleChange() {},
    handler: React.createElement("div", {
      className: "drawer-handle"
    }, React.createElement("i", {
      className: "drawer-handle-icon"
    })),
    showMask: true,
    maskClosable: true,
    maskStyle: {},
    wrapperClassName: '',
    className: '',
    keyboard: true,
    forceRender: false
  };
  return DrawerWrapper;
}();

var _default = DrawerWrapper;
exports.default = _default;