"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var _findDOMNode = _interopRequireDefault(require("rc-util/lib/Dom/findDOMNode"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _ref = require("rc-util/lib/ref");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var INTERNAL_PREFIX_KEY = 'rc-observer-key'; // Still need to be compatible with React 15, we use class component here

var ReactResizeObserver =
/** @class */
function () {
  var ReactResizeObserver = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(ReactResizeObserver, _React$Component);

    var _super = _createSuper(ReactResizeObserver);

    function ReactResizeObserver() {
      var _this;

      (0, _classCallCheck2.default)(this, ReactResizeObserver);
      _this = _super.apply(this, arguments);
      _this.resizeObserver = null;
      _this.childNode = null;
      _this.currentElement = null;
      _this.state = {
        width: 0,
        height: 0
      };

      _this.onResize = function (entries) {
        var onResize = _this.props.onResize;
        var target = entries[0].target;

        var _target$getBoundingCl = target.getBoundingClientRect(),
            width = _target$getBoundingCl.width,
            height = _target$getBoundingCl.height;

        var offsetWidth = target.offsetWidth,
            offsetHeight = target.offsetHeight;
        /**
         * Resize observer trigger when content size changed.
         * In most case we just care about element size,
         * let's use `boundary` instead of `contentRect` here to avoid shaking.
         */

        var fixedWidth = Math.floor(width);
        var fixedHeight = Math.floor(height);

        if (_this.state.width !== fixedWidth || _this.state.height !== fixedHeight) {
          var size = {
            width: fixedWidth,
            height: fixedHeight
          };

          _this.setState(size);

          if (onResize) {
            onResize(_objectSpread(_objectSpread({}, size), {}, {
              offsetWidth: offsetWidth,
              offsetHeight: offsetHeight
            }));
          }
        }
      };

      _this.setChildNode = function (node) {
        _this.childNode = node;
      };

      return _this;
    }

    (0, _createClass2.default)(ReactResizeObserver, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.onComponentUpdated();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.onComponentUpdated();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.destroyObserver();
      }
    }, {
      key: "onComponentUpdated",
      value: function onComponentUpdated() {
        var disabled = this.props.disabled; // Unregister if disabled

        if (disabled) {
          this.destroyObserver();
          return;
        } // Unregister if element changed


        var element = (0, _findDOMNode.default)(this.childNode || this);
        var elementChanged = element !== this.currentElement;

        if (elementChanged) {
          this.destroyObserver();
          this.currentElement = element;
        }

        if (!this.resizeObserver && element) {
          this.resizeObserver = new _resizeObserverPolyfill.default(this.onResize);
          this.resizeObserver.observe(element);
        }
      }
    }, {
      key: "destroyObserver",
      value: function destroyObserver() {
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var children = this.props.children;
        var childNodes = (0, _toArray.default)(children);

        if (childNodes.length > 1) {
          (0, _warning.default)(false, 'Find more than one child node with `children` in ResizeObserver. Will only observe first one.');
        } else if (childNodes.length === 0) {
          (0, _warning.default)(false, '`children` of ResizeObserver is empty. Nothing is in observe.');
          return null;
        }

        var childNode = childNodes[0];

        if (React.isValidElement(childNode) && (0, _ref.supportRef)(childNode)) {
          var ref = childNode.ref;
          childNodes[0] = React.cloneElement(childNode, {
            ref: (0, _ref.composeRef)(ref, this.setChildNode)
          });
        }

        return childNodes.length === 1 ? childNodes[0] : childNodes.map(function (node, index) {
          if (!React.isValidElement(node) || 'key' in node && node.key !== null) {
            return node;
          }

          return React.cloneElement(node, {
            key: "".concat(INTERNAL_PREFIX_KEY, "-").concat(index)
          });
        });
      }
    }]);
    return ReactResizeObserver;
  }(React.Component);

  ReactResizeObserver.displayName = 'ResizeObserver';
  return ReactResizeObserver;
}();

var _default = ReactResizeObserver;
exports.default = _default;