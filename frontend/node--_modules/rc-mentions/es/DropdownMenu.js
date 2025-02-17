import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import Menu, { MenuItem } from 'rc-menu';
import * as React from 'react';
import { MentionsContextConsumer } from './MentionsContext';
/**
 * We only use Menu to display the candidate.
 * The focus is controlled by textarea to make accessibility easy.
 */

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _this;

    _classCallCheck(this, DropdownMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownMenu).apply(this, arguments));

    _this.renderDropdown = function (_ref) {
      var notFoundContent = _ref.notFoundContent,
          activeIndex = _ref.activeIndex,
          setActiveIndex = _ref.setActiveIndex,
          selectOption = _ref.selectOption,
          onFocus = _ref.onFocus,
          onBlur = _ref.onBlur;
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          options = _this$props.options;
      var activeOption = options[activeIndex] || {};
      return React.createElement(Menu, {
        prefixCls: "".concat(prefixCls, "-menu"),
        activeKey: activeOption.value,
        onSelect: function onSelect(_ref2) {
          var key = _ref2.key;
          var option = options.find(function (_ref3) {
            var value = _ref3.value;
            return value === key;
          });
          selectOption(option);
        },
        onFocus: onFocus,
        onBlur: onBlur
      }, options.map(function (option, index) {
        var value = option.value,
            disabled = option.disabled,
            children = option.children,
            className = option.className,
            style = option.style;
        return React.createElement(MenuItem, {
          key: value,
          disabled: disabled,
          className: className,
          style: style,
          onMouseEnter: function onMouseEnter() {
            setActiveIndex(index);
          }
        }, children);
      }), !options.length && React.createElement(MenuItem, {
        disabled: true
      }, notFoundContent));
    };

    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "render",
    value: function render() {
      return React.createElement(MentionsContextConsumer, null, this.renderDropdown);
    }
  }]);

  return DropdownMenu;
}(React.Component);

export default DropdownMenu;