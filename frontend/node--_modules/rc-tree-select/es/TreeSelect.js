import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import generateSelector from "rc-select/es/generate";
import { getLabeledValue } from "rc-select/es/utils/valueUtil";
import { convertDataToEntities } from "rc-tree/es/utils/treeUtil";
import { conductCheck } from "rc-tree/es/utils/conductUtil";
import { INTERNAL_PROPS_MARK } from "rc-select/es/interface/generator";
import warning from "rc-util/es/warning";
import OptionList from './OptionList';
import TreeNode from './TreeNode';
import { flattenOptions, filterOptions, isValueDisabled, findValueOption, addValue, removeValue, getRawValueLabeled, toArray } from './utils/valueUtil';
import warningProps from './utils/warningPropsUtil';
import { SelectContext } from './Context';
import useTreeData from './hooks/useTreeData';
import useKeyValueMap from './hooks/useKeyValueMap';
import useKeyValueMapping from './hooks/useKeyValueMapping';
import { formatStrategyKeys, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './utils/strategyUtil';
import { fillAdditionalInfo } from './utils/legacyUtil';
import useSelectValues from './hooks/useSelectValues';
var OMIT_PROPS = ['expandedKeys', 'treeData', 'treeCheckable', 'showCheckedStrategy', 'searchPlaceholder', 'treeLine', 'treeIcon', 'showTreeIcon', 'switcherIcon', 'treeNodeFilterProp', 'filterTreeNode', 'dropdownPopupAlign', 'treeDefaultExpandAll', 'treeCheckStrictly', 'treeExpandedKeys', 'treeLoadedKeys', 'treeMotion', 'onTreeExpand', 'onTreeLoad', 'loadData', 'treeDataSimpleMode', 'treeNodeLabelProp', 'treeDefaultExpandedKeys'];
var RefSelect = generateSelector({
  prefixCls: 'rc-tree-select',
  components: {
    optionList: OptionList
  },
  // Not use generate since we will handle ourself
  convertChildrenToData: function convertChildrenToData() {
    return null;
  },
  flattenOptions: flattenOptions,
  // Handle `optionLabelProp` in TreeSelect component
  getLabeledValue: getLabeledValue,
  filterOptions: filterOptions,
  isValueDisabled: isValueDisabled,
  findValueOption: findValueOption,
  omitDOMProps: function omitDOMProps(props) {
    var cloneProps = _objectSpread({}, props);

    OMIT_PROPS.forEach(function (prop) {
      delete cloneProps[prop];
    });
    return cloneProps;
  }
});
RefSelect.displayName = 'Select';
var RefTreeSelect = React.forwardRef(function (props, ref) {
  var multiple = props.multiple,
      treeCheckable = props.treeCheckable,
      treeCheckStrictly = props.treeCheckStrictly,
      _props$showCheckedStr = props.showCheckedStrategy,
      showCheckedStrategy = _props$showCheckedStr === void 0 ? 'SHOW_CHILD' : _props$showCheckedStr,
      labelInValue = props.labelInValue,
      loadData = props.loadData,
      treeLoadedKeys = props.treeLoadedKeys,
      _props$treeNodeFilter = props.treeNodeFilterProp,
      treeNodeFilterProp = _props$treeNodeFilter === void 0 ? 'value' : _props$treeNodeFilter,
      treeNodeLabelProp = props.treeNodeLabelProp,
      treeDataSimpleMode = props.treeDataSimpleMode,
      treeData = props.treeData,
      treeExpandedKeys = props.treeExpandedKeys,
      treeDefaultExpandedKeys = props.treeDefaultExpandedKeys,
      treeDefaultExpandAll = props.treeDefaultExpandAll,
      children = props.children,
      treeIcon = props.treeIcon,
      showTreeIcon = props.showTreeIcon,
      switcherIcon = props.switcherIcon,
      treeLine = props.treeLine,
      treeMotion = props.treeMotion,
      filterTreeNode = props.filterTreeNode,
      dropdownPopupAlign = props.dropdownPopupAlign,
      onChange = props.onChange,
      onTreeExpand = props.onTreeExpand,
      onTreeLoad = props.onTreeLoad,
      onDropdownVisibleChange = props.onDropdownVisibleChange,
      onSelect = props.onSelect,
      onDeselect = props.onDeselect;
  var mergedCheckable = treeCheckable || treeCheckStrictly;
  var mergedMultiple = multiple || mergedCheckable;
  var treeConduction = treeCheckable && !treeCheckStrictly;
  var mergedLabelInValue = treeCheckStrictly || labelInValue; // ========================== Ref ==========================

  var selectRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    return {
      focus: selectRef.current.focus,
      blur: selectRef.current.blur
    };
  }); // ======================= Tree Data =======================
  // Legacy both support `label` or `title` if not set.
  // We have to fallback to function to handle this

  var getTreeNodeLabelProp = function getTreeNodeLabelProp(node) {
    if (treeNodeLabelProp) {
      return node[treeNodeLabelProp];
    }

    if (!treeData) {
      return node.title;
    }

    return node.label || node.title;
  };

  var mergedTreeData = useTreeData(treeData, children, {
    getLabelProp: getTreeNodeLabelProp,
    simpleMode: treeDataSimpleMode
  });
  var flattedOptions = React.useMemo(function () {
    return flattenOptions(mergedTreeData);
  }, [mergedTreeData]);

  var _useKeyValueMap = useKeyValueMap(flattedOptions),
      _useKeyValueMap2 = _slicedToArray(_useKeyValueMap, 2),
      cacheKeyMap = _useKeyValueMap2[0],
      cacheValueMap = _useKeyValueMap2[1];

  var _useKeyValueMapping = useKeyValueMapping(cacheKeyMap, cacheValueMap),
      _useKeyValueMapping2 = _slicedToArray(_useKeyValueMapping, 2),
      getEntityByKey = _useKeyValueMapping2[0],
      getEntityByValue = _useKeyValueMapping2[1]; // Only generate keyEntities for check conduction when is `treeCheckable`


  var _React$useMemo = React.useMemo(function () {
    if (treeConduction) {
      return convertDataToEntities(mergedTreeData);
    }

    return {
      keyEntities: null
    };
  }, [mergedTreeData, treeCheckable, treeCheckStrictly]),
      conductKeyEntities = _React$useMemo.keyEntities; // ========================= Value =========================


  var _React$useState = React.useState(props.defaultValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var mergedValue = 'value' in props ? props.value : value;
  /** Get `missingRawValues` which not exist in the tree yet */

  var splitRawValues = function splitRawValues(newRawValues) {
    var missingRawValues = [];
    var existRawValues = []; // Keep missing value in the cache

    newRawValues.forEach(function (val) {
      if (getEntityByValue(val)) {
        existRawValues.push(val);
      } else {
        missingRawValues.push(val);
      }
    });
    return {
      missingRawValues: missingRawValues,
      existRawValues: existRawValues
    };
  };

  var _React$useMemo2 = React.useMemo(function () {
    var valueHalfCheckedKeys = [];
    var newRawValues = [];
    toArray(mergedValue).forEach(function (item) {
      if (item && _typeof(item) === 'object' && 'value' in item) {
        if (item.halfChecked && treeCheckStrictly) {
          var entity = getEntityByValue(item.value);
          valueHalfCheckedKeys.push(entity ? entity.key : item.value);
        } else {
          newRawValues.push(item.value);
        }
      } else {
        newRawValues.push(item);
      }
    }); // We need do conduction of values

    if (treeConduction) {
      var _splitRawValues = splitRawValues(newRawValues),
          missingRawValues = _splitRawValues.missingRawValues,
          existRawValues = _splitRawValues.existRawValues;

      var keyList = existRawValues.map(function (val) {
        return getEntityByValue(val).key;
      });

      var _conductCheck = conductCheck(keyList, true, conductKeyEntities),
          checkedKeys = _conductCheck.checkedKeys,
          halfCheckedKeys = _conductCheck.halfCheckedKeys;

      return [[].concat(_toConsumableArray(missingRawValues), _toConsumableArray(checkedKeys.map(function (key) {
        return getEntityByKey(key).data.value;
      }))), halfCheckedKeys];
    }

    return [newRawValues, valueHalfCheckedKeys];
  }, [mergedValue, mergedMultiple, mergedLabelInValue, treeCheckable, treeCheckStrictly]),
      _React$useMemo3 = _slicedToArray(_React$useMemo2, 2),
      rawValues = _React$useMemo3[0],
      rawHalfCheckedKeys = _React$useMemo3[1];

  var selectValues = useSelectValues(rawValues, {
    treeConduction: treeConduction,
    value: mergedValue,
    showCheckedStrategy: showCheckedStrategy,
    conductKeyEntities: conductKeyEntities,
    getEntityByValue: getEntityByValue,
    getEntityByKey: getEntityByKey,
    getLabelProp: getTreeNodeLabelProp
  });

  var triggerChange = function triggerChange(newRawValues, extra, source) {
    setValue(mergedMultiple ? newRawValues : newRawValues[0]);

    if (onChange) {
      var eventValues = newRawValues;

      if (treeConduction && showCheckedStrategy !== 'SHOW_ALL') {
        var keyList = newRawValues.map(function (val) {
          var entity = getEntityByValue(val);
          return entity ? entity.key : val;
        });
        var formattedKeyList = formatStrategyKeys(keyList, showCheckedStrategy, conductKeyEntities);
        eventValues = formattedKeyList.map(function (key) {
          var entity = getEntityByKey(key);
          return entity ? entity.data.value : key;
        });
      }

      var _ref = extra || {
        triggerValue: undefined,
        selected: undefined
      },
          triggerValue = _ref.triggerValue,
          selected = _ref.selected;

      var returnValues = mergedLabelInValue ? getRawValueLabeled(eventValues, mergedValue, getEntityByValue, getTreeNodeLabelProp) : eventValues; // We need fill half check back

      if (treeCheckStrictly) {
        var halfValues = rawHalfCheckedKeys.map(function (key) {
          var entity = getEntityByKey(key);
          return entity ? entity.data.value : key;
        }).filter(function (val) {
          return !eventValues.includes(val);
        });
        returnValues = [].concat(_toConsumableArray(returnValues), _toConsumableArray(getRawValueLabeled(halfValues, mergedValue, getEntityByValue, getTreeNodeLabelProp)));
      }

      var additionalInfo = {
        // [Legacy] Always return as array contains label & value
        preValue: selectValues,
        triggerValue: triggerValue
      }; // [Legacy] Fill legacy data if user query.
      // This is expansive that we only fill when user query
      // https://github.com/react-component/tree-select/blob/fe33eb7c27830c9ac70cd1fdb1ebbe7bc679c16a/src/Select.jsx

      var showPosition = true;

      if (treeCheckStrictly || source === 'selection' && !selected) {
        showPosition = false;
      }

      fillAdditionalInfo(additionalInfo, triggerValue, newRawValues, mergedTreeData, showPosition);

      if (mergedCheckable) {
        additionalInfo.checked = selected;
      } else {
        additionalInfo.selected = selected;
      }

      onChange(mergedMultiple ? returnValues : returnValues[0], mergedLabelInValue ? null : eventValues.map(function (val) {
        var entity = getEntityByValue(val);
        return entity ? getTreeNodeLabelProp(entity.data) : null;
      }), additionalInfo);
    }
  };

  var onInternalSelect = function onInternalSelect(selectValue, option, source) {
    var eventValue = mergedLabelInValue ? selectValue : selectValue;

    if (!mergedMultiple) {
      // Single mode always set value
      triggerChange([selectValue], {
        selected: true,
        triggerValue: selectValue
      }, source);
    } else {
      var newRawValues = addValue(rawValues, selectValue); // Add keys if tree conduction

      if (treeConduction) {
        // Should keep missing values
        var _splitRawValues2 = splitRawValues(newRawValues),
            missingRawValues = _splitRawValues2.missingRawValues,
            existRawValues = _splitRawValues2.existRawValues;

        var keyList = existRawValues.map(function (val) {
          return getEntityByValue(val).key;
        });

        var _conductCheck2 = conductCheck(keyList, true, conductKeyEntities),
            checkedKeys = _conductCheck2.checkedKeys;

        newRawValues = [].concat(_toConsumableArray(missingRawValues), _toConsumableArray(checkedKeys.map(function (key) {
          return getEntityByKey(key).data.value;
        })));
      }

      triggerChange(newRawValues, {
        selected: true,
        triggerValue: selectValue
      }, source);
    }

    if (onSelect) {
      onSelect(eventValue, option);
    }
  };

  var onInternalDeselect = function onInternalDeselect(selectValue, option, source) {
    var eventValue = mergedLabelInValue ? selectValue : selectValue;
    var newRawValues = removeValue(rawValues, selectValue); // Remove keys if tree conduction

    if (treeConduction) {
      var _splitRawValues3 = splitRawValues(newRawValues),
          missingRawValues = _splitRawValues3.missingRawValues,
          existRawValues = _splitRawValues3.existRawValues;

      var keyList = existRawValues.map(function (val) {
        return getEntityByValue(val).key;
      });

      var _conductCheck3 = conductCheck(keyList, {
        checked: false,
        halfCheckedKeys: rawHalfCheckedKeys
      }, conductKeyEntities),
          checkedKeys = _conductCheck3.checkedKeys;

      newRawValues = [].concat(_toConsumableArray(missingRawValues), _toConsumableArray(checkedKeys.map(function (key) {
        return getEntityByKey(key).data.value;
      })));
    }

    triggerChange(newRawValues, {
      selected: false,
      triggerValue: selectValue
    }, source);

    if (onDeselect) {
      onDeselect(eventValue, option);
    }
  };

  var onInternalClear = function onInternalClear() {
    triggerChange([], null, 'clear');
  }; // ========================= Open ==========================


  var onInternalDropdownVisibleChange = React.useCallback(function (open) {
    if (onDropdownVisibleChange) {
      var legacyParam = {};
      Object.defineProperty(legacyParam, 'documentClickClose', {
        get: function get() {
          warning(false, 'Second param of `onDropdownVisibleChange` has been removed.');
          return false;
        }
      });
      onDropdownVisibleChange(open, legacyParam);
    }
  }, [onDropdownVisibleChange]); // ======================== Warning ========================

  if (process.env.NODE_ENV !== 'production') {
    warningProps(props);
  } // ======================== Render =========================
  // We pass some props into select props style


  var selectProps = {
    optionLabelProp: null,
    optionFilterProp: treeNodeFilterProp,
    dropdownAlign: dropdownPopupAlign,
    internalProps: {
      mark: INTERNAL_PROPS_MARK,
      onClear: onInternalClear,
      skipTriggerChange: true,
      skipTriggerSelect: true,
      onRawSelect: onInternalSelect,
      onRawDeselect: onInternalDeselect
    }
  };

  if ('filterTreeNode' in props) {
    selectProps.filterOption = filterTreeNode;
  }

  return React.createElement(SelectContext.Provider, {
    value: {
      checkable: mergedCheckable,
      loadData: loadData,
      treeLoadedKeys: treeLoadedKeys,
      onTreeLoad: onTreeLoad,
      checkedKeys: rawValues,
      halfCheckedKeys: rawHalfCheckedKeys,
      treeDefaultExpandAll: treeDefaultExpandAll,
      treeExpandedKeys: treeExpandedKeys,
      treeDefaultExpandedKeys: treeDefaultExpandedKeys,
      onTreeExpand: onTreeExpand,
      treeIcon: treeIcon,
      treeMotion: treeMotion,
      showTreeIcon: showTreeIcon,
      switcherIcon: switcherIcon,
      treeLine: treeLine,
      treeNodeFilterProp: treeNodeFilterProp
    }
  }, React.createElement(RefSelect, Object.assign({
    ref: selectRef,
    mode: mergedMultiple ? 'multiple' : null
  }, props, selectProps, {
    value: selectValues,
    // We will handle this ourself since we need calculate conduction
    labelInValue: true,
    options: mergedTreeData,
    onChange: null,
    onSelect: null,
    onDeselect: null,
    onDropdownVisibleChange: onInternalDropdownVisibleChange
  })));
}); // Use class component since typescript not support generic
// by `forwardRef` with function component yet.

var TreeSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(TreeSelect, _React$Component);

  var _super = _createSuper(TreeSelect);

  function TreeSelect() {
    var _this;

    _classCallCheck(this, TreeSelect);

    _this = _super.apply(this, arguments);
    _this.selectRef = React.createRef();

    _this.focus = function () {
      _this.selectRef.current.focus();
    };

    _this.blur = function () {
      _this.selectRef.current.blur();
    };

    return _this;
  }

  _createClass(TreeSelect, [{
    key: "render",
    value: function render() {
      return React.createElement(RefTreeSelect, Object.assign({
        ref: this.selectRef
      }, this.props));
    }
  }]);

  return TreeSelect;
}(React.Component);

TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
export default TreeSelect;