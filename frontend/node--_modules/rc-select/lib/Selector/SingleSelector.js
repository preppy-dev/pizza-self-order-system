"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _pickAttrs = _interopRequireDefault(require("rc-util/lib/pickAttrs"));

var _Input = _interopRequireDefault(require("./Input"));

var SingleSelector = function SingleSelector(props) {
  var inputElement = props.inputElement,
      prefixCls = props.prefixCls,
      id = props.id,
      inputRef = props.inputRef,
      disabled = props.disabled,
      autoFocus = props.autoFocus,
      autoComplete = props.autoComplete,
      accessibilityIndex = props.accessibilityIndex,
      mode = props.mode,
      open = props.open,
      values = props.values,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      showSearch = props.showSearch,
      searchValue = props.searchValue,
      activeValue = props.activeValue,
      onInputKeyDown = props.onInputKeyDown,
      onInputMouseDown = props.onInputMouseDown,
      onInputChange = props.onInputChange,
      onInputPaste = props.onInputPaste,
      onInputCompositionStart = props.onInputCompositionStart,
      onInputCompositionEnd = props.onInputCompositionEnd;
  var combobox = mode === 'combobox';
  var inputEditable = combobox || showSearch && open;
  var item = values[0];

  var getDisplayValue = function getDisplayValue(value) {
    return value === null ? '' : String(value);
  };

  var inputValue = searchValue;

  if (combobox) {
    inputValue = item ? getDisplayValue(item.value) : activeValue || searchValue;
  } // Not show text when closed expect combobox mode


  var hasTextInput = mode !== 'combobox' && !open ? false : !!inputValue;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
    className: "".concat(prefixCls, "-selection-search")
  }, _react.default.createElement(_Input.default, {
    ref: inputRef,
    prefixCls: prefixCls,
    id: id,
    open: open,
    inputElement: inputElement,
    disabled: disabled,
    autoFocus: autoFocus,
    autoComplete: autoComplete,
    editable: inputEditable,
    accessibilityIndex: accessibilityIndex,
    value: inputValue,
    onKeyDown: onInputKeyDown,
    onMouseDown: onInputMouseDown,
    onChange: onInputChange,
    onPaste: onInputPaste,
    onCompositionStart: onInputCompositionStart,
    onCompositionEnd: onInputCompositionEnd,
    tabIndex: tabIndex,
    attrs: (0, _pickAttrs.default)(props, true)
  })), !combobox && item && !hasTextInput && _react.default.createElement("span", {
    className: "".concat(prefixCls, "-selection-item")
  }, item.label), !item && !hasTextInput && _react.default.createElement("span", {
    className: "".concat(prefixCls, "-selection-placeholder")
  }, placeholder));
};

var _default = SingleSelector;
exports.default = _default;