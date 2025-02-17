"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("rc-util/lib/warning"));

var _useMergedState11 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));

var _PickerTrigger = _interopRequireDefault(require("./PickerTrigger"));

var _PickerPanel = _interopRequireDefault(require("./PickerPanel"));

var _usePickerInput5 = _interopRequireDefault(require("./hooks/usePickerInput"));

var _miscUtil = _interopRequireWildcard(require("./utils/miscUtil"));

var _uiUtil = require("./utils/uiUtil");

var _PanelContext = _interopRequireDefault(require("./PanelContext"));

var _dateUtil = require("./utils/dateUtil");

var _useValueTexts5 = _interopRequireDefault(require("./hooks/useValueTexts"));

var _useTextValueMapping5 = _interopRequireDefault(require("./hooks/useTextValueMapping"));

var _RangeContext = _interopRequireDefault(require("./RangeContext"));

var _useRangeDisabled3 = _interopRequireDefault(require("./hooks/useRangeDisabled"));

var _getExtraFooter = _interopRequireDefault(require("./utils/getExtraFooter"));

var _getRanges = _interopRequireDefault(require("./utils/getRanges"));

var _useRangeViewDates3 = _interopRequireDefault(require("./hooks/useRangeViewDates"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reorderValues(values, generateConfig) {
  if (values && values[0] && values[1] && generateConfig.isAfter(values[0], values[1])) {
    return [values[1], values[0]];
  }

  return values;
}

function canValueTrigger(value, index, disabled, allowEmpty) {
  if (value) {
    return true;
  }

  if (allowEmpty && allowEmpty[index]) {
    return true;
  }

  if (disabled[(index + 1) % 2]) {
    return true;
  }

  return false;
}

function InnerRangePicker(props) {
  var _classNames2;

  var _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'rc-picker' : _props$prefixCls,
      id = props.id,
      style = props.style,
      className = props.className,
      popupStyle = props.popupStyle,
      dropdownClassName = props.dropdownClassName,
      transitionName = props.transitionName,
      dropdownAlign = props.dropdownAlign,
      getPopupContainer = props.getPopupContainer,
      generateConfig = props.generateConfig,
      locale = props.locale,
      placeholder = props.placeholder,
      autoFocus = props.autoFocus,
      disabled = props.disabled,
      format = props.format,
      _props$picker = props.picker,
      picker = _props$picker === void 0 ? 'date' : _props$picker,
      showTime = props.showTime,
      use12Hours = props.use12Hours,
      _props$separator = props.separator,
      separator = _props$separator === void 0 ? '~' : _props$separator,
      value = props.value,
      defaultValue = props.defaultValue,
      defaultPickerValue = props.defaultPickerValue,
      open = props.open,
      defaultOpen = props.defaultOpen,
      disabledDate = props.disabledDate,
      _disabledTime = props.disabledTime,
      dateRender = props.dateRender,
      ranges = props.ranges,
      allowEmpty = props.allowEmpty,
      allowClear = props.allowClear,
      suffixIcon = props.suffixIcon,
      clearIcon = props.clearIcon,
      pickerRef = props.pickerRef,
      inputReadOnly = props.inputReadOnly,
      mode = props.mode,
      renderExtraFooter = props.renderExtraFooter,
      onChange = props.onChange,
      onOpenChange = props.onOpenChange,
      onPanelChange = props.onPanelChange,
      onCalendarChange = props.onCalendarChange,
      _onFocus = props.onFocus,
      onBlur = props.onBlur,
      _onOk = props.onOk,
      components = props.components,
      order = props.order,
      direction = props.direction,
      activePickerIndex = props.activePickerIndex,
      _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === void 0 ? 'off' : _props$autoComplete;
  var needConfirmButton = picker === 'date' && !!showTime || picker === 'time';
  var containerRef = React.useRef(null);
  var panelDivRef = React.useRef(null);
  var startInputDivRef = React.useRef(null);
  var endInputDivRef = React.useRef(null);
  var separatorRef = React.useRef(null);
  var startInputRef = React.useRef(null);
  var endInputRef = React.useRef(null); // ============================= Misc ==============================

  var formatList = (0, _miscUtil.toArray)((0, _uiUtil.getDefaultFormat)(format, picker, showTime, use12Hours)); // Active picker

  var _useMergedState = (0, _useMergedState11.default)(0, {
    value: activePickerIndex
  }),
      _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
      mergedActivePickerIndex = _useMergedState2[0],
      setMergedActivePickerIndex = _useMergedState2[1]; // Operation ref


  var operationRef = React.useRef(null);
  var mergedDisabled = React.useMemo(function () {
    if (Array.isArray(disabled)) {
      return disabled;
    }

    return [disabled || false, disabled || false];
  }, [disabled]); // ============================= Value =============================

  var _useMergedState3 = (0, _useMergedState11.default)(null, {
    value: value,
    defaultValue: defaultValue,
    postState: function postState(values) {
      return picker === 'time' && !order ? values : reorderValues(values, generateConfig);
    }
  }),
      _useMergedState4 = (0, _slicedToArray2.default)(_useMergedState3, 2),
      mergedValue = _useMergedState4[0],
      setInnerValue = _useMergedState4[1]; // =========================== View Date ===========================
  // Config view panel


  var _useRangeViewDates = (0, _useRangeViewDates3.default)({
    values: mergedValue,
    picker: picker,
    defaultDates: defaultPickerValue,
    generateConfig: generateConfig
  }),
      _useRangeViewDates2 = (0, _slicedToArray2.default)(_useRangeViewDates, 2),
      getViewDate = _useRangeViewDates2[0],
      setViewDate = _useRangeViewDates2[1]; // ========================= Select Values =========================


  var _useMergedState5 = (0, _useMergedState11.default)(mergedValue, {
    postState: function postState(values) {
      var postValues = values;

      if (mergedDisabled[0] && mergedDisabled[1]) {
        return postValues;
      } // Fill disabled unit


      for (var i = 0; i < 2; i += 1) {
        if (mergedDisabled[i] && !(0, _miscUtil.getValue)(postValues, i) && !(0, _miscUtil.getValue)(allowEmpty, i)) {
          postValues = (0, _miscUtil.updateValues)(postValues, generateConfig.getNow(), i);
        }
      }

      return postValues;
    }
  }),
      _useMergedState6 = (0, _slicedToArray2.default)(_useMergedState5, 2),
      selectedValue = _useMergedState6[0],
      setSelectedValue = _useMergedState6[1];

  var _React$useState = React.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      rangeHoverValue = _React$useState2[0],
      setRangeHoverValue = _React$useState2[1]; // ========================== Hover Range ==========================


  var _React$useState3 = React.useState(null),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      hoverRangedValue = _React$useState4[0],
      setHoverRangedValue = _React$useState4[1];

  var onDateMouseEnter = function onDateMouseEnter(date) {
    setHoverRangedValue((0, _miscUtil.updateValues)(selectedValue, date, mergedActivePickerIndex));
  };

  var onDateMouseLeave = function onDateMouseLeave() {
    setHoverRangedValue((0, _miscUtil.updateValues)(selectedValue, null, mergedActivePickerIndex));
  }; // ============================= Modes =============================


  var _useMergedState7 = (0, _useMergedState11.default)([picker, picker], {
    value: mode
  }),
      _useMergedState8 = (0, _slicedToArray2.default)(_useMergedState7, 2),
      mergedModes = _useMergedState8[0],
      setInnerModes = _useMergedState8[1];

  React.useEffect(function () {
    setInnerModes([picker, picker]);
  }, [picker]);

  var triggerModesChange = function triggerModesChange(modes, values) {
    setInnerModes(modes);

    if (onPanelChange) {
      onPanelChange(values, modes);
    }
  }; // ========================= Disable Date ==========================


  var _useRangeDisabled = (0, _useRangeDisabled3.default)({
    picker: picker,
    selectedValue: selectedValue,
    locale: locale,
    disabled: mergedDisabled,
    disabledDate: disabledDate,
    generateConfig: generateConfig
  }),
      _useRangeDisabled2 = (0, _slicedToArray2.default)(_useRangeDisabled, 2),
      disabledStartDate = _useRangeDisabled2[0],
      disabledEndDate = _useRangeDisabled2[1]; // ============================= Open ==============================


  var _useMergedState9 = (0, _useMergedState11.default)(false, {
    value: open,
    defaultValue: defaultOpen,
    postState: function postState(postOpen) {
      return mergedDisabled[mergedActivePickerIndex] ? false : postOpen;
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
      _useMergedState10 = (0, _slicedToArray2.default)(_useMergedState9, 2),
      mergedOpen = _useMergedState10[0],
      triggerInnerOpen = _useMergedState10[1];

  var startOpen = mergedOpen && mergedActivePickerIndex === 0;
  var endOpen = mergedOpen && mergedActivePickerIndex === 1; // ============================= Popup =============================
  // Popup min width

  var _React$useState5 = React.useState(0),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      popupMinWidth = _React$useState6[0],
      setPopupMinWidth = _React$useState6[1];

  React.useEffect(function () {
    if (!mergedOpen && containerRef.current) {
      setPopupMinWidth(containerRef.current.offsetWidth);
    }
  }, [mergedOpen]); // ============================ Trigger ============================

  var _triggerOpen;

  var triggerChange = function triggerChange(newValue) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _config$forceInput = config.forceInput,
        forceInput = _config$forceInput === void 0 ? true : _config$forceInput,
        source = config.source;
    var values = newValue;
    var startValue = (0, _miscUtil.getValue)(values, 0);
    var endValue = (0, _miscUtil.getValue)(values, 1);

    if (startValue && endValue && generateConfig.isAfter(startValue, endValue)) {
      if ( // WeekPicker only compare week
      picker === 'week' && !(0, _dateUtil.isSameWeek)(generateConfig, locale.locale, startValue, endValue) || // WeekPicker only compare week
      picker === 'quarter' && !(0, _dateUtil.isSameQuarter)(generateConfig, startValue, endValue) || // Other non-TimePicker compare date
      picker !== 'week' && picker !== 'quarter' && picker !== 'time' && !(0, _dateUtil.isSameDate)(generateConfig, startValue, endValue)) {
        // Clean up end date when start date is after end date
        values = [startValue, null];
        endValue = null;
      } else if (picker !== 'time' || order !== false) {
        // Reorder when in same date
        values = reorderValues(values, generateConfig);
      }
    }

    setSelectedValue(values);
    var startStr = values && values[0] ? generateConfig.locale.format(locale.locale, values[0], formatList[0]) : '';
    var endStr = values && values[1] ? generateConfig.locale.format(locale.locale, values[1], formatList[0]) : '';

    if (onCalendarChange) {
      onCalendarChange(values, [startStr, endStr]);
    }

    var canStartValueTrigger = canValueTrigger(startValue, 0, mergedDisabled, allowEmpty);
    var canEndValueTrigger = canValueTrigger(endValue, 1, mergedDisabled, allowEmpty);
    var canTrigger = values === null || canStartValueTrigger && canEndValueTrigger;

    if (canTrigger) {
      // Trigger onChange only when value is validate
      setInnerValue(values);

      if (source !== 'open') {
        _triggerOpen(false, mergedActivePickerIndex, true);
      }

      if (onChange && (!(0, _dateUtil.isEqual)(generateConfig, (0, _miscUtil.getValue)(mergedValue, 0), startValue) || !(0, _dateUtil.isEqual)(generateConfig, (0, _miscUtil.getValue)(mergedValue, 1), endValue))) {
        onChange(values, [startStr, endStr]);
      }
    } else if (forceInput) {
      // Open miss value panel to force user input
      var missingValueIndex = canStartValueTrigger ? 1 : 0; // Same index means user choice to close picker

      if (missingValueIndex === mergedActivePickerIndex) {
        return;
      }

      if (source !== 'open') {
        _triggerOpen(true, missingValueIndex);
      } // Delay to focus to avoid input blur trigger expired selectedValues


      setTimeout(function () {
        var inputRef = [startInputRef, endInputRef][missingValueIndex];

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  _triggerOpen = function triggerOpen(newOpen, index) {
    var preventChangeEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (newOpen) {
      setMergedActivePickerIndex(index);
      triggerInnerOpen(newOpen); // Open to reset view date

      if (!mergedOpen) {
        setViewDate(null, index);
      }
    } else if (mergedActivePickerIndex === index) {
      triggerInnerOpen(newOpen);

      if (!preventChangeEvent) {
        triggerChange(selectedValue, {
          source: 'open'
        });
      }
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
      (0, _warning.default)(false, 'Picker not correct forward KeyDown operation. Please help to fire issue about this.');
      return false;
    }
  }; // ============================= Text ==============================


  var sharedTextHooksProps = {
    formatList: formatList,
    generateConfig: generateConfig,
    locale: locale
  };

  var _useValueTexts = (0, _useValueTexts5.default)((0, _miscUtil.getValue)(selectedValue, 0), sharedTextHooksProps),
      _useValueTexts2 = (0, _slicedToArray2.default)(_useValueTexts, 2),
      startValueTexts = _useValueTexts2[0],
      firstStartValueText = _useValueTexts2[1];

  var _useValueTexts3 = (0, _useValueTexts5.default)((0, _miscUtil.getValue)(selectedValue, 1), sharedTextHooksProps),
      _useValueTexts4 = (0, _slicedToArray2.default)(_useValueTexts3, 2),
      endValueTexts = _useValueTexts4[0],
      firstEndValueText = _useValueTexts4[1];

  var _onTextChange = function onTextChange(newText, index) {
    var inputDate = generateConfig.locale.parse(locale.locale, newText, formatList);
    var disabledFunc = index === 0 ? disabledStartDate : disabledEndDate;

    if (inputDate && !disabledFunc(inputDate)) {
      setSelectedValue((0, _miscUtil.updateValues)(selectedValue, inputDate, index));
      setViewDate(inputDate, index);
    }
  };

  var _useTextValueMapping = (0, _useTextValueMapping5.default)({
    valueTexts: startValueTexts,
    onTextChange: function onTextChange(newText) {
      return _onTextChange(newText, 0);
    }
  }),
      _useTextValueMapping2 = (0, _slicedToArray2.default)(_useTextValueMapping, 3),
      startText = _useTextValueMapping2[0],
      triggerStartTextChange = _useTextValueMapping2[1],
      resetStartText = _useTextValueMapping2[2];

  var _useTextValueMapping3 = (0, _useTextValueMapping5.default)({
    valueTexts: endValueTexts,
    onTextChange: function onTextChange(newText) {
      return _onTextChange(newText, 1);
    }
  }),
      _useTextValueMapping4 = (0, _slicedToArray2.default)(_useTextValueMapping3, 3),
      endText = _useTextValueMapping4[0],
      triggerEndTextChange = _useTextValueMapping4[1],
      resetEndText = _useTextValueMapping4[2]; // ============================= Input =============================


  var getSharedInputHookProps = function getSharedInputHookProps(index, resetText) {
    return {
      blurToCancel: needConfirmButton,
      forwardKeyDown: forwardKeyDown,
      onBlur: onBlur,
      isClickOutside: function isClickOutside(target) {
        return !(0, _uiUtil.elementsContains)([panelDivRef.current, startInputDivRef.current, endInputDivRef.current], target);
      },
      onFocus: function onFocus(e) {
        setMergedActivePickerIndex(index);

        if (_onFocus) {
          _onFocus(e);
        }
      },
      triggerOpen: function triggerOpen(newOpen) {
        return _triggerOpen(newOpen, index);
      },
      onSubmit: function onSubmit() {
        triggerChange(selectedValue);
        resetText();
      },
      onCancel: function onCancel() {
        _triggerOpen(false, index, true);

        setSelectedValue(mergedValue);
        resetText();
      }
    };
  };

  var _usePickerInput = (0, _usePickerInput5.default)(_objectSpread(_objectSpread({}, getSharedInputHookProps(0, resetStartText)), {}, {
    open: startOpen
  })),
      _usePickerInput2 = (0, _slicedToArray2.default)(_usePickerInput, 2),
      startInputProps = _usePickerInput2[0],
      _usePickerInput2$ = _usePickerInput2[1],
      startFocused = _usePickerInput2$.focused,
      startTyping = _usePickerInput2$.typing;

  var _usePickerInput3 = (0, _usePickerInput5.default)(_objectSpread(_objectSpread({}, getSharedInputHookProps(1, resetEndText)), {}, {
    open: endOpen
  })),
      _usePickerInput4 = (0, _slicedToArray2.default)(_usePickerInput3, 2),
      endInputProps = _usePickerInput4[0],
      _usePickerInput4$ = _usePickerInput4[1],
      endFocused = _usePickerInput4$.focused,
      endTyping = _usePickerInput4$.typing; // ============================= Sync ==============================
  // Close should sync back with text value


  var startStr = mergedValue && mergedValue[0] ? generateConfig.locale.format(locale.locale, mergedValue[0], 'YYYYMMDDHHmmss') : '';
  var endStr = mergedValue && mergedValue[1] ? generateConfig.locale.format(locale.locale, mergedValue[1], 'YYYYMMDDHHmmss') : '';
  React.useEffect(function () {
    if (!mergedOpen) {
      setSelectedValue(mergedValue);

      if (!startValueTexts.length || startValueTexts[0] === '') {
        triggerStartTextChange('');
      } else if (firstStartValueText !== startText) {
        resetStartText();
      }

      if (!endValueTexts.length || endValueTexts[0] === '') {
        triggerEndTextChange('');
      } else if (firstEndValueText !== endText) {
        resetEndText();
      }
    }
  }, [mergedOpen, startValueTexts, endValueTexts]); // Sync innerValue with control mode

  React.useEffect(function () {
    setSelectedValue(mergedValue);
  }, [startStr, endStr]); // ============================ Warning ============================

  if (process.env.NODE_ENV !== 'production') {
    if (value && Array.isArray(disabled) && ((0, _miscUtil.getValue)(disabled, 0) && !(0, _miscUtil.getValue)(value, 0) || (0, _miscUtil.getValue)(disabled, 1) && !(0, _miscUtil.getValue)(value, 1))) {
      (0, _warning.default)(false, '`disabled` should not set with empty `value`. You should set `allowEmpty` or `value` instead.');
    }
  } // ============================ Private ============================


  if (pickerRef) {
    pickerRef.current = {
      focus: function focus() {
        if (startInputRef.current) {
          startInputRef.current.focus();
        }
      },
      blur: function blur() {
        if (startInputRef.current) {
          startInputRef.current.blur();
        }

        if (endInputRef.current) {
          endInputRef.current.blur();
        }
      }
    };
  } // ============================ Ranges =============================


  var rangeLabels = Object.keys(ranges || {});
  var rangeList = rangeLabels.map(function (label) {
    var range = ranges[label];
    var newValues = typeof range === 'function' ? range() : range;
    return {
      label: label,
      onClick: function onClick() {
        triggerChange(newValues);
      },
      onMouseEnter: function onMouseEnter() {
        setRangeHoverValue(newValues);
      },
      onMouseLeave: function onMouseLeave() {
        setRangeHoverValue(null);
      }
    };
  }); // ============================= Panel =============================

  function renderPanel() {
    var panelPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var panelProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var panelHoverRangedValue = null;

    if (mergedOpen && hoverRangedValue && hoverRangedValue[0] && hoverRangedValue[1] && generateConfig.isAfter(hoverRangedValue[1], hoverRangedValue[0])) {
      panelHoverRangedValue = hoverRangedValue;
    }

    var panelShowTime = showTime;

    if (showTime && (0, _typeof2.default)(showTime) === 'object' && showTime.defaultValue) {
      var timeDefaultValues = showTime.defaultValue;
      panelShowTime = _objectSpread(_objectSpread({}, showTime), {}, {
        defaultValue: (0, _miscUtil.getValue)(timeDefaultValues, mergedActivePickerIndex) || undefined
      });
    }

    var panelDateRender = null;

    if (dateRender) {
      panelDateRender = function panelDateRender(date, today) {
        return dateRender(date, today, {
          range: mergedActivePickerIndex ? 'end' : 'start'
        });
      };
    }

    return React.createElement(_RangeContext.default.Provider, {
      value: {
        inRange: true,
        panelPosition: panelPosition,
        rangedValue: rangeHoverValue || selectedValue,
        hoverRangedValue: panelHoverRangedValue
      }
    }, React.createElement(_PickerPanel.default, Object.assign({}, props, panelProps, {
      dateRender: panelDateRender,
      showTime: panelShowTime,
      mode: mergedModes[mergedActivePickerIndex],
      generateConfig: generateConfig,
      style: undefined,
      direction: direction,
      disabledDate: mergedActivePickerIndex === 0 ? disabledStartDate : disabledEndDate,
      disabledTime: function disabledTime(date) {
        if (_disabledTime) {
          return _disabledTime(date, mergedActivePickerIndex === 0 ? 'start' : 'end');
        }

        return false;
      },
      className: (0, _classnames.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-panel-focused"), mergedActivePickerIndex === 0 ? !startTyping : !endTyping)),
      value: (0, _miscUtil.getValue)(selectedValue, mergedActivePickerIndex),
      locale: locale,
      tabIndex: -1,
      onPanelChange: function onPanelChange(date, newMode) {
        triggerModesChange((0, _miscUtil.updateValues)(mergedModes, newMode, mergedActivePickerIndex), (0, _miscUtil.updateValues)(selectedValue, date, mergedActivePickerIndex));
        var viewDate = date;

        if (panelPosition === 'right') {
          viewDate = (0, _dateUtil.getClosingViewDate)(viewDate, newMode, generateConfig, -1);
        }

        setViewDate(viewDate, mergedActivePickerIndex);
      },
      onOk: null,
      onSelect: undefined,
      onChange: undefined,
      defaultValue: undefined,
      defaultPickerValue: undefined
    })));
  }

  var arrowLeft = 0;
  var panelLeft = 0;

  if (mergedActivePickerIndex && startInputDivRef.current && separatorRef.current && panelDivRef.current) {
    // Arrow offset
    arrowLeft = startInputDivRef.current.offsetWidth + separatorRef.current.offsetWidth;

    if (panelDivRef.current.offsetWidth && arrowLeft > panelDivRef.current.offsetWidth) {
      panelLeft = arrowLeft;
    }
  }

  var arrowPositionStyle = direction === 'rtl' ? {
    right: arrowLeft
  } : {
    left: arrowLeft
  };

  function renderPanels() {
    var panels;
    var extraNode = (0, _getExtraFooter.default)(prefixCls, mergedModes[mergedActivePickerIndex], renderExtraFooter);
    var rangesNode = (0, _getRanges.default)({
      prefixCls: prefixCls,
      components: components,
      needConfirmButton: needConfirmButton,
      okDisabled: !(0, _miscUtil.getValue)(selectedValue, mergedActivePickerIndex),
      locale: locale,
      rangeList: rangeList,
      onOk: function onOk() {
        if ((0, _miscUtil.getValue)(selectedValue, mergedActivePickerIndex)) {
          triggerChange(selectedValue);

          if (_onOk) {
            _onOk(selectedValue);
          }
        }
      }
    });

    if (picker !== 'time' && !showTime) {
      var viewDate = getViewDate(mergedActivePickerIndex);
      var nextViewDate = (0, _dateUtil.getClosingViewDate)(viewDate, picker, generateConfig);
      var currentMode = mergedModes[mergedActivePickerIndex];
      var showDoublePanel = currentMode === picker;
      var leftPanel = renderPanel(showDoublePanel ? 'left' : false, {
        pickerValue: viewDate,
        onPickerValueChange: function onPickerValueChange(newViewDate) {
          setViewDate(newViewDate, mergedActivePickerIndex);
        }
      });
      var rightPanel = renderPanel('right', {
        pickerValue: nextViewDate,
        onPickerValueChange: function onPickerValueChange(newViewDate) {
          setViewDate((0, _dateUtil.getClosingViewDate)(newViewDate, picker, generateConfig, -1), mergedActivePickerIndex);
        }
      });

      if (direction === 'rtl') {
        panels = React.createElement(React.Fragment, null, rightPanel, showDoublePanel && leftPanel);
      } else {
        panels = React.createElement(React.Fragment, null, leftPanel, showDoublePanel && rightPanel);
      }
    } else {
      panels = renderPanel();
    }

    return React.createElement("div", {
      className: "".concat(prefixCls, "-panel-container"),
      style: {
        marginLeft: panelLeft
      },
      ref: panelDivRef,
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
      }
    }, React.createElement("div", {
      className: "".concat(prefixCls, "-panels")
    }, panels), (extraNode || rangesNode) && React.createElement("div", {
      className: "".concat(prefixCls, "-footer")
    }, extraNode, rangesNode));
  }

  var rangePanel = React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-range-wrapper"), "".concat(prefixCls, "-").concat(picker, "-range-wrapper")),
    style: {
      minWidth: popupMinWidth
    }
  }, React.createElement("div", {
    className: "".concat(prefixCls, "-range-arrow"),
    style: arrowPositionStyle
  }), renderPanels()); // ============================= Icons =============================

  var suffixNode;

  if (suffixIcon) {
    suffixNode = React.createElement("span", {
      className: "".concat(prefixCls, "-suffix")
    }, suffixIcon);
  }

  var clearNode;

  if (allowClear && ((0, _miscUtil.getValue)(mergedValue, 0) && !mergedDisabled[0] || (0, _miscUtil.getValue)(mergedValue, 1) && !mergedDisabled[1])) {
    clearNode = React.createElement("span", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      onMouseUp: function onMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        var values = mergedValue;

        if (!mergedDisabled[0]) {
          values = (0, _miscUtil.updateValues)(values, null, 0);
        }

        if (!mergedDisabled[1]) {
          values = (0, _miscUtil.updateValues)(values, null, 1);
        }

        triggerChange(values, {
          forceInput: false
        });
      },
      className: "".concat(prefixCls, "-clear")
    }, clearIcon || React.createElement("span", {
      className: "".concat(prefixCls, "-clear-btn")
    }));
  }

  var inputSharedProps = {
    size: (0, _uiUtil.getInputSize)(picker, formatList[0])
  };
  var activeBarLeft = 0;
  var activeBarWidth = 0;

  if (startInputDivRef.current && endInputDivRef.current && separatorRef.current) {
    if (mergedActivePickerIndex === 0) {
      activeBarWidth = startInputDivRef.current.offsetWidth;
    } else {
      activeBarLeft = arrowLeft;
      activeBarWidth = endInputDivRef.current.offsetWidth;
    }
  }

  var activeBarPositionStyle = direction === 'rtl' ? {
    right: activeBarLeft
  } : {
    left: activeBarLeft
  }; // ============================ Return =============================

  var onContextSelect = function onContextSelect(date, type) {
    var values = (0, _miscUtil.updateValues)(selectedValue, date, mergedActivePickerIndex);

    if (type === 'submit' || type !== 'key' && !needConfirmButton) {
      // triggerChange will also update selected values
      triggerChange(values);
    } else {
      setSelectedValue(values);
    }
  };

  return React.createElement(_PanelContext.default.Provider, {
    value: {
      operationRef: operationRef,
      hideHeader: picker === 'time',
      onDateMouseEnter: onDateMouseEnter,
      onDateMouseLeave: onDateMouseLeave,
      hideRanges: true,
      onSelect: onContextSelect,
      open: mergedOpen
    }
  }, React.createElement(_PickerTrigger.default, {
    visible: mergedOpen,
    popupElement: rangePanel,
    popupStyle: popupStyle,
    prefixCls: prefixCls,
    dropdownClassName: dropdownClassName,
    dropdownAlign: dropdownAlign,
    getPopupContainer: getPopupContainer,
    transitionName: transitionName,
    range: true,
    direction: direction
  }, React.createElement("div", Object.assign({
    ref: containerRef,
    className: (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-range"), className, (_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-disabled"), mergedDisabled[0] && mergedDisabled[1]), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-focused"), mergedActivePickerIndex === 0 ? startFocused : endFocused), (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames2)),
    style: style
  }, (0, _miscUtil.default)(props)), React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-input"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-input-active"), mergedActivePickerIndex === 0)),
    ref: startInputDivRef
  }, React.createElement("input", Object.assign({
    id: id,
    disabled: mergedDisabled[0],
    readOnly: inputReadOnly || !startTyping,
    value: startText,
    onChange: function onChange(e) {
      triggerStartTextChange(e.target.value);
    },
    autoFocus: autoFocus,
    placeholder: (0, _miscUtil.getValue)(placeholder, 0) || '',
    ref: startInputRef
  }, startInputProps, inputSharedProps, {
    autoComplete: autoComplete
  }))), React.createElement("div", {
    className: "".concat(prefixCls, "-range-separator"),
    ref: separatorRef
  }, separator), React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-input"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-input-active"), mergedActivePickerIndex === 1)),
    ref: endInputDivRef
  }, React.createElement("input", Object.assign({
    disabled: mergedDisabled[1],
    readOnly: inputReadOnly || !endTyping,
    value: endText,
    onChange: function onChange(e) {
      triggerEndTextChange(e.target.value);
    },
    placeholder: (0, _miscUtil.getValue)(placeholder, 1) || '',
    ref: endInputRef
  }, endInputProps, inputSharedProps, {
    autoComplete: autoComplete
  }))), React.createElement("div", {
    className: "".concat(prefixCls, "-active-bar"),
    style: _objectSpread(_objectSpread({}, activeBarPositionStyle), {}, {
      width: activeBarWidth,
      position: 'absolute'
    })
  }), suffixNode, clearNode)));
} // Wrap with class component to enable pass generic with instance method


var RangePicker = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(RangePicker, _React$Component);

  var _super = _createSuper(RangePicker);

  function RangePicker() {
    var _this;

    (0, _classCallCheck2.default)(this, RangePicker);
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

  (0, _createClass2.default)(RangePicker, [{
    key: "render",
    value: function render() {
      return React.createElement(InnerRangePicker, Object.assign({}, this.props, {
        pickerRef: this.pickerRef
      }));
    }
  }]);
  return RangePicker;
}(React.Component);

var _default = RangePicker;
exports.default = _default;