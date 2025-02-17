import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Portal from "rc-util/es/PortalWrapper";
import * as React from 'react';
import Child from './DrawerChild';

var DrawerWrapper =
/** @class */
function () {
  var DrawerWrapper = /*#__PURE__*/function (_React$Component) {
    _inherits(DrawerWrapper, _React$Component);

    var _super = _createSuper(DrawerWrapper);

    function DrawerWrapper(props) {
      var _this;

      _classCallCheck(this, DrawerWrapper);

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

    _createClass(DrawerWrapper, [{
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
            props = _objectWithoutProperties(_this$props3, ["defaultOpen", "getContainer", "wrapperClassName", "forceRender", "handler"]);

        var open = this.state.open; // 渲染在当前 dom 里；

        if (!getContainer) {
          return React.createElement("div", {
            className: wrapperClassName,
            ref: function ref(c) {
              _this2.dom = c;
            }
          }, React.createElement(Child, Object.assign({}, props, {
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
        return React.createElement(Portal, {
          visible: open,
          forceRender: $forceRender,
          getContainer: getContainer,
          wrapperClassName: wrapperClassName
        }, function (_ref) {
          var visible = _ref.visible,
              afterClose = _ref.afterClose,
              rest = _objectWithoutProperties(_ref, ["visible", "afterClose"]);

          return (// react 15，componentWillUnmount 时 Portal 返回 afterClose, visible.
            React.createElement(Child, Object.assign({}, props, rest, {
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

export default DrawerWrapper;