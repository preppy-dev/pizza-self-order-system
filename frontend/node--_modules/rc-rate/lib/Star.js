"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Star = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Star, _React$Component);

  var _super = _createSuper(Star);

  function Star() {
    var _this;

    (0, _classCallCheck2.default)(this, Star);
    _this = _super.apply(this, arguments);

    _this.onHover = function (e) {
      var _this$props = _this.props,
          onHover = _this$props.onHover,
          index = _this$props.index;
      onHover(e, index);
    };

    _this.onClick = function (e) {
      var _this$props2 = _this.props,
          onClick = _this$props2.onClick,
          index = _this$props2.index;
      onClick(e, index);
    };

    _this.onKeyDown = function (e) {
      var _this$props3 = _this.props,
          onClick = _this$props3.onClick,
          index = _this$props3.index;

      if (e.keyCode === 13) {
        onClick(e, index);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(Star, [{
    key: "getClassName",
    value: function getClassName() {
      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          index = _this$props4.index,
          value = _this$props4.value,
          allowHalf = _this$props4.allowHalf,
          focused = _this$props4.focused;
      var starValue = index + 1;
      var className = prefixCls;

      if (value === 0 && index === 0 && focused) {
        className += " ".concat(prefixCls, "-focused");
      } else if (allowHalf && value + 0.5 === starValue) {
        className += " ".concat(prefixCls, "-half ").concat(prefixCls, "-active");

        if (focused) {
          className += " ".concat(prefixCls, "-focused");
        }
      } else {
        className += starValue <= value ? " ".concat(prefixCls, "-full") : " ".concat(prefixCls, "-zero");

        if (starValue === value && focused) {
          className += " ".concat(prefixCls, "-focused");
        }
      }

      return className;
    }
  }, {
    key: "render",
    value: function render() {
      var onHover = this.onHover,
          onClick = this.onClick,
          onKeyDown = this.onKeyDown;
      var _this$props5 = this.props,
          disabled = _this$props5.disabled,
          prefixCls = _this$props5.prefixCls,
          character = _this$props5.character,
          characterRender = _this$props5.characterRender,
          index = _this$props5.index,
          count = _this$props5.count,
          value = _this$props5.value;

      var start = _react.default.createElement("li", {
        className: this.getClassName()
      }, _react.default.createElement("div", {
        onClick: disabled ? null : onClick,
        onKeyDown: disabled ? null : onKeyDown,
        onMouseMove: disabled ? null : onHover,
        role: "radio",
        "aria-checked": value > index ? 'true' : 'false',
        "aria-posinset": index + 1,
        "aria-setsize": count,
        tabIndex: 0
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-first")
      }, character), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-second")
      }, character)));

      if (characterRender) {
        start = characterRender(start, this.props);
      }

      return start;
    }
  }]);
  return Star;
}(_react.default.Component);

exports.default = Star;