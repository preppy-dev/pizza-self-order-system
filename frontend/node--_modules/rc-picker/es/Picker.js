import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Removed:
 *  - getCalendarContainer: use `getPopupContainer` instead
 *  - onOk
 *
 * New Feature:
 *  - picker
 *  - allowEmpty
 *  - selectable
 *
 * Tips: Should add faq about `datetime` mode with `defaultValue`
 */
import * as React from 'react';
import classNames from 'classnames';
import warning from "rc-util/es/warning";
import useMergedState from "rc-util/es/hooks/useMergedState";
import PickerPanel from './PickerPanel';
import PickerTrigger from './PickerTrigger';
import { isEqual } from './utils/dateUtil';
import getDataOrAriaProps, { toArray } from './utils/miscUtil';
import PanelContext from './PanelContext';
import { getDefaultFormat, getInputSize, elementsContains } from './utils/uiUtil';
import usePickerInput from './hooks/usePickerInput';
import useTextValueMapping from './hooks/useTextValueMapping';
import useValueTexts from './hooks/useValueTexts';

function InnerPicker(props) {
  var _classNames2;

  var _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'rc-picker' : _props$prefixCls,
      id = props.id,
      tabIndex = props.tabIndex,
      style = props.style,
      className = props.className,
      dropdownClassName = props.dropdownClassName,
      dropdownAlign = props.dropdownAlign,
      popupStyle = props.popupStyle,
      transitionName = props.transitionName,
      generateConfig = props.generateConfig,
      locale = props.locale,
      inputReadOnly = props.inputReadOnly,
      allowClear = props.allowClear,
      autoFocus = props.autoFocus,
      showTime = props.showTime,
      _props$picker = props.picker,
      picker = _props$picker === void 0 ? 'date' : _props$picker,
      format = props.format,
      use12Hours = props.use12Hours,
      value = props.value,
      defaultValue = props.defaultValue,
      open = props.open,
      defaultOpen = props.defaultOpen,
      defaultOpenValue = props.defaultOpenValue,
      suffixIcon = props.suffixIcon,
      clearIcon = props.clearIcon,
      disabled = props.disabled,
      disabledDate = props.disabledDate,
      placeholder = props.placeholder,
      getPopupContainer = props.getPopupContainer,
      pickerRef = props.pickerRef,
      onChange = props.onChange,
      onOpenChange = props.onOpenChange,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      onMouseDown = props.onMouseDown,
      onMouseUp = props.onMouseUp,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      onContextMenu = props.onContextMenu,
      onClick = props.onClick,
      direction = props.direction,
      _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === void 0 ? 'off' : _props$autoComplete;
  var inputRef = React.useRef(null);
  var needConfirmButton = picker === 'date' && !!showTime || picker === 'time'; // ============================= State =============================

  var formatList = toArray(getDefaultFormat(format, picker, showTime, use12Hours)); // Panel ref

  var panelDivRef = React.useRef(null);
  var inputDivRef = React.useRef(null); // Real value

  var _useMergedState = useMergedState(null, {
    value: value,
    defaultValue: defaultValue
  }),
      _useMergedState2 = _slicedToArray(_useMergedState, 2),
      mergedValue = _useMergedState2[0],
      setInnerValue = _useMergedState2[1]; // Selected value


  var _React$useState = React.useState(mergedValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedValue = _React$useState2[0],
      setSelectedValue = _React$useState2[1]; // Operation ref


  var operationRef = React.useRef(null); // Open

  var _useMergedState3 = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
    postState: function postState(postOpen) {
      return disabled ? false : postOpen;
    },
    onChange: function onChange(newOpen) {
      if (onOpenChange) {
        onOpenChange(newOpen);
      }

      if (!newOpen && operationRef.current && operationRef.current.onClose) {
        operationRef.current.onClose();
      }
    }
  }),
      _useMergedState4 = _slicedToArray(_useMergedState3, 2),
      mergedOpen = _useMergedState4[0],
      triggerInnerOpen = _useMergedState4[1]; // ============================= Text ==============================


  var _useValueTexts = useValueTexts(selectedValue, {
    formatList: formatList,
    generateConfig: generateConfig,
    locale: locale
  }),
      _useValueTexts2 = _slicedToArray(_useValueTexts, 2),
      valueTexts = _useValueTexts2[0],
      firstValueText = _useValueTexts2[1];

  var _useTextValueMapping = useTextValueMapping({
    valueTexts: valueTexts,
    onTextChange: function onTextChange(newText) {
      var inputDate = generateConfig.locale.parse(locale.locale, newText, formatList);

      if (inputDate && (!disabledDate || !disabledDate(inputDate))) {
        setSelectedValue(inputDate);
      }
    }
  }),
      _useTextValueMapping2 = _slicedToArray(_useTextValueMapping, 3),
      text = _useTextValueMapping2[0],
      triggerTextChange = _useTextValueMapping2[1],
      resetText = _useTextValueMapping2[2]; // ============================ Trigger ============================


  var triggerChange = function triggerChange(newValue) {
    setSelectedValue(newValue);
    setInnerValue(newValue);

    if (onChange && !isEqual(generateConfig, mergedValue, newValue)) {
      onChange(newValue, newValue ? generateConfig.locale.format(locale.locale, newValue, formatList[0]) : '');
    }
  };

  var triggerOpen = function triggerOpen(newOpen) {
    var preventChangeEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (disabled && newOpen) {
      return;
    }

    triggerInnerOpen(newOpen);

    if (!newOpen && !preventChangeEvent) {
      triggerChange(selectedValue);
    }
  };

  var forwardKeyDown = function forwardKeyDown(e) {
    if (mergedOpen && operationRef.current && operationRef.current.onKeyDown) {
      // Let popup panel handle keyboard
      return operationRef.current.onKeyDown(e);
    }
    /* istanbul ignore next */

    /* eslint-disable no-lone-blocks */


    {
      warning(false, 'Picker not correct forward KeyDown operation. Please help to fire issue about this.');
      return false;
    }
  };

  var onInternalMouseUp = function onInternalMouseUp() {
    if (onMouseUp) {
      onMouseUp.apply(void 0, arguments);
    }

    if (inputRef.current) {
      inputRef.current.focus();
      triggerOpen(true);
    }
  }; // ============================= Input =============================


  var _usePickerInput = usePickerInput({
    blurToCancel: needConfirmButton,
    open: mergedOpen,
    triggerOpen: triggerOpen,
    forwardKeyDown: forwardKeyDown,
    isClickOutside: function isClickOutside(target) {
      return !elementsContains([panelDivRef.current, inputDivRef.current], target);
    },
    onSubmit: function onSubmit() {
      if (disabledDate && disabledDate(selectedValue)) {
        return false;
      }

      triggerChange(selectedValue);
      triggerOpen(false, true);
      resetText();
      return true;
    },
    onCancel: function onCancel() {
      triggerOpen(false, true);
      setSelectedValue(mergedValue);
      resetText();
    },
    onFocus: onFocus,
    onBlur: onBlur
  }),
      _usePickerInput2 = _slicedToArray(_usePickerInput, 2),
      inputProps = _usePickerInput2[0],
      _usePickerInput2$ = _usePickerInput2[1],
      focused = _usePickerInput2$.focused,
      typing = _usePickerInput2$.typing; // ============================= Sync ==============================
  // Close should sync back with text value


  React.useEffect(function () {
    if (!mergedOpen) {
      setSelectedValue(mergedValue);

      if (!valueTexts.length || valueTexts[0] === '') {
        triggerTextChange('');
      } else if (firstValueText !== text) {
        resetText();
      }
    }
  }, [mergedOpen, valueTexts]); // Change picker should sync back with text value

  React.useEffect(function () {
    if (!mergedOpen) {
      resetText();
    }
  }, [picker]); // Sync innerValue with control mode

  React.useEffect(function () {
    // Sync select value
    setSelectedValue(mergedValue);
  }, [mergedValue]); // ============================ Private ============================

  if (pickerRef) {
    pickerRef.current = {
      focus: function focus() {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      blur: function blur() {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    };
  } // ============================= Panel =============================


  var panelProps = _objectSpread(_objectSpread({}, props), {}, {
    className: undefined,
    style: undefined,
    pickerValue: undefined,
    onPickerValueChange: undefined
  });

  var panel = React.createElement("div", {
    className: "".concat(prefixCls, "-panel-container"),
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    }
  }, React.createElement(PickerPanel, Object.assign({}, panelProps, {
    generateConfig: generateConfig,
    className: classNames(_defineProperty({}, "".concat(prefixCls, "-panel-focused"), !typing)),
    value: selectedValue,
    locale: locale,
    tabIndex: -1,
    onChange: setSelectedValue,
    direction: direction
  })));
  var suffixNode;

  if (suffixIcon) {
    suffixNode = React.createElement("span", {
      className: "".concat(prefixCls, "-suffix")
    }, suffixIcon);
  }

  var clearNode;

  if (allowClear && mergedValue && !disabled) {
    clearNode = React.createElement("span", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      onMouseUp: function onMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        triggerChange(null);
        triggerOpen(false, true);
      },
      className: "".concat(prefixCls, "-clear")
    }, clearIcon || React.createElement("span", {
      className: "".concat(prefixCls, "-clear-btn")
    }));
  } // ============================ Warning ============================


  if (process.env.NODE_ENV !== 'production') {
    warning(!defaultOpenValue, '`defaultOpenValue` may confuse user for the current value status. Please use `defaultValue` instead.');
  } // ============================ Return =============================


  var onContextSelect = function onContextSelect(date, type) {
    if (type === 'submit' || type !== 'key' && !needConfirmButton) {
      // triggerChange will also update selected values
      triggerChange(date);
      triggerOpen(false, true);
    }
  };

  var popupPlacement = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  return React.createElement(PanelContext.Provider, {
    value: {
      operationRef: operationRef,
      hideHeader: picker === 'time',
      panelRef: panelDivRef,
      onSelect: onContextSelect,
      open: mergedOpen,
      defaultOpenValue: defaultOpenValue
    }
  }, React.createElement(PickerTrigger, {
    visible: mergedOpen,
    popupElement: panel,
    popupStyle: popupStyle,
    prefixCls: prefixCls,
    dropdownClassName: dropdownClassName,
    dropdownAlign: dropdownAlign,
    getPopupContainer: getPopupContainer,
    transitionName: transitionName,
    popupPlacement: popupPlacement,
    direction: direction
  }, React.createElement("div", {
    className: classNames(prefixCls, className, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames2, "".concat(prefixCls, "-focused"), focused), _defineProperty(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames2)),
    style: style,
    onMouseDown: onMouseDown,
    onMouseUp: onInternalMouseUp,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onContextMenu: onContextMenu,
    onClick: onClick
  }, React.createElement("div", {
    className: "".concat(prefixCls, "-input"),
    ref: inputDivRef
  }, React.createElement("input", Object.assign({
    id: id,
    tabIndex: tabIndex,
    disabled: disabled,
    readOnly: inputReadOnly || !typing,
    value: text,
    onChange: function onChange(e) {
      triggerTextChange(e.target.value);
    },
    autoFocus: autoFocus,
    placeholder: placeholder,
    ref: inputRef,
    title: text
  }, inputProps, {
    size: getInputSize(picker, formatList[0])
  }, getDataOrAriaProps(props), {
    autoComplete: autoComplete
  })), suffixNode, clearNode))));
} // Wrap with class component to enable pass generic with instance method


var Picker = /*#__PURE__*/function (_React$Component) {
  _inherits(Picker, _React$Component);

  var _super = _createSuper(Picker);

  function Picker() {
    var _this;

    _classCallCheck(this, Picker);

    _this = _super.apply(this, arguments);
    _this.pickerRef = React.createRef();

    _this.focus = function () {
      if (_this.pickerRef.current) {
        _this.pickerRef.current.focus();
      }
    };

    _this.blur = function () {
      if (_this.pickerRef.current) {
        _this.pickerRef.current.blur();
      }
    };

    return _this;
  }

  _createClass(Picker, [{
    key: "render",
    value: function render() {
      return React.createElement(InnerPicker, Object.assign({}, this.props, {
        pickerRef: this.pickerRef
      }));
    }
  }]);

  return Picker;
}(React.Component);

export default Picker;