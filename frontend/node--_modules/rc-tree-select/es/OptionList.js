import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import KeyCode from "rc-util/es/KeyCode";
import useMemo from "rc-util/es/hooks/useMemo";
import Tree from 'rc-tree';
import { SelectContext } from './Context';
import useKeyValueMapping from './hooks/useKeyValueMapping';
import useKeyValueMap from './hooks/useKeyValueMap';
var HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0
};

var OptionList = function OptionList(props, ref) {
  var prefixCls = props.prefixCls,
      height = props.height,
      itemHeight = props.itemHeight,
      virtual = props.virtual,
      options = props.options,
      flattenOptions = props.flattenOptions,
      multiple = props.multiple,
      searchValue = props.searchValue,
      onSelect = props.onSelect,
      onToggleOpen = props.onToggleOpen,
      open = props.open,
      notFoundContent = props.notFoundContent,
      onMouseEnter = props.onMouseEnter;

  var _React$useContext = React.useContext(SelectContext),
      checkable = _React$useContext.checkable,
      checkedKeys = _React$useContext.checkedKeys,
      halfCheckedKeys = _React$useContext.halfCheckedKeys,
      treeExpandedKeys = _React$useContext.treeExpandedKeys,
      treeDefaultExpandAll = _React$useContext.treeDefaultExpandAll,
      treeDefaultExpandedKeys = _React$useContext.treeDefaultExpandedKeys,
      onTreeExpand = _React$useContext.onTreeExpand,
      treeIcon = _React$useContext.treeIcon,
      showTreeIcon = _React$useContext.showTreeIcon,
      switcherIcon = _React$useContext.switcherIcon,
      treeLine = _React$useContext.treeLine,
      treeNodeFilterProp = _React$useContext.treeNodeFilterProp,
      loadData = _React$useContext.loadData,
      treeLoadedKeys = _React$useContext.treeLoadedKeys,
      treeMotion = _React$useContext.treeMotion,
      onTreeLoad = _React$useContext.onTreeLoad;

  var treeRef = React.useRef();
  var memoOptions = useMemo(function () {
    return options;
  }, [open, options], function (prev, next) {
    return next[0] && prev[1] !== next[1];
  });

  var _useKeyValueMap = useKeyValueMap(flattenOptions),
      _useKeyValueMap2 = _slicedToArray(_useKeyValueMap, 2),
      cacheKeyMap = _useKeyValueMap2[0],
      cacheValueMap = _useKeyValueMap2[1];

  var _useKeyValueMapping = useKeyValueMapping(cacheKeyMap, cacheValueMap),
      _useKeyValueMapping2 = _slicedToArray(_useKeyValueMapping, 2),
      getEntityByKey = _useKeyValueMapping2[0],
      getEntityByValue = _useKeyValueMapping2[1]; // ========================== Values ==========================


  var valueKeys = React.useMemo(function () {
    return checkedKeys.map(function (val) {
      var entity = getEntityByValue(val);
      return entity ? entity.key : null;
    });
  }, [checkedKeys]);
  var mergedCheckedKeys = React.useMemo(function () {
    if (!checkable) {
      return null;
    }

    return {
      checked: valueKeys,
      halfChecked: halfCheckedKeys
    };
  }, [valueKeys, halfCheckedKeys, checkable]); // ========================== Scroll ==========================

  React.useEffect(function () {
    // Single mode should scroll to current key
    if (open && !multiple && valueKeys.length) {
      var _treeRef$current;

      (_treeRef$current = treeRef.current) === null || _treeRef$current === void 0 ? void 0 : _treeRef$current.scrollTo({
        key: valueKeys[0]
      });
    }
  }, [open]); // ========================== Search ==========================

  var lowerSearchValue = String(searchValue).toLowerCase();

  var filterTreeNode = function filterTreeNode(treeNode) {
    if (!lowerSearchValue) {
      return false;
    }

    return String(treeNode[treeNodeFilterProp]).toLowerCase().includes(lowerSearchValue);
  }; // =========================== Keys ===========================


  var _React$useState = React.useState(treeDefaultExpandedKeys),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      expandedKeys = _React$useState2[0],
      setExpandedKeys = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      searchExpandedKeys = _React$useState4[0],
      setSearchExpandedKeys = _React$useState4[1];

  var mergedExpandedKeys = React.useMemo(function () {
    if (treeExpandedKeys) {
      return _toConsumableArray(treeExpandedKeys);
    }

    return searchValue ? searchExpandedKeys : expandedKeys;
  }, [expandedKeys, searchExpandedKeys, lowerSearchValue, treeExpandedKeys]);
  React.useEffect(function () {
    if (searchValue) {
      setSearchExpandedKeys(flattenOptions.map(function (o) {
        return o.key;
      }));
    }
  }, [searchValue]);

  var onInternalExpand = function onInternalExpand(keys) {
    setExpandedKeys(keys);
    setSearchExpandedKeys(keys);

    if (onTreeExpand) {
      onTreeExpand(keys);
    }
  }; // ========================== Events ==========================


  var onListMouseDown = function onListMouseDown(event) {
    event.preventDefault();
  };

  var onInternalSelect = function onInternalSelect(_, _ref) {
    var key = _ref.node.key;
    var entity = getEntityByKey(key, checkable ? 'checkbox' : 'select');

    if (entity !== null) {
      onSelect(entity.data.value, {
        selected: !checkedKeys.includes(entity.data.value)
      });
    }

    if (!multiple) {
      onToggleOpen(false);
    }
  }; // ========================= Keyboard =========================


  var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      activeKey = _React$useState6[0],
      setActiveKey = _React$useState6[1];

  var activeEntity = getEntityByKey(activeKey);
  React.useImperativeHandle(ref, function () {
    return {
      onKeyDown: function onKeyDown(event) {
        var _treeRef$current2;

        var which = event.which;

        switch (which) {
          // >>> Arrow keys
          case KeyCode.UP:
          case KeyCode.DOWN:
          case KeyCode.LEFT:
          case KeyCode.RIGHT:
            (_treeRef$current2 = treeRef.current) === null || _treeRef$current2 === void 0 ? void 0 : _treeRef$current2.onKeyDown(event);
            break;
          // >>> Select item

          case KeyCode.ENTER:
            {
              if (activeEntity !== null) {
                onInternalSelect(null, {
                  node: {
                    key: activeKey
                  },
                  selected: !checkedKeys.includes(activeEntity.data.value)
                });
              }

              break;
            }
          // >>> Close

          case KeyCode.ESC:
            {
              onToggleOpen(false);
            }
        }
      },
      onKeyUp: function onKeyUp() {}
    };
  }); // ========================== Render ==========================

  if (memoOptions.length === 0) {
    return React.createElement("div", {
      role: "listbox",
      className: "".concat(prefixCls, "-empty"),
      onMouseDown: onListMouseDown
    }, notFoundContent);
  }

  var treeProps = {};

  if (treeLoadedKeys) {
    treeProps.loadedKeys = treeLoadedKeys;
  }

  if (mergedExpandedKeys) {
    treeProps.expandedKeys = mergedExpandedKeys;
  }

  return React.createElement("div", {
    onMouseDown: onListMouseDown,
    onMouseEnter: onMouseEnter
  }, activeEntity && open && React.createElement("span", {
    style: HIDDEN_STYLE,
    "aria-live": "assertive"
  }, activeEntity.data.value), React.createElement(Tree, Object.assign({
    ref: treeRef,
    focusable: false,
    prefixCls: "".concat(prefixCls, "-tree"),
    treeData: memoOptions,
    height: height,
    itemHeight: itemHeight,
    virtual: virtual,
    multiple: multiple,
    icon: treeIcon,
    showIcon: showTreeIcon,
    switcherIcon: switcherIcon,
    showLine: treeLine,
    loadData: searchValue ? null : loadData,
    motion: treeMotion,
    // We handle keys by out instead tree self
    checkable: checkable,
    checkStrictly: true,
    checkedKeys: mergedCheckedKeys,
    selectedKeys: !checkable ? valueKeys : [],
    defaultExpandAll: treeDefaultExpandAll
  }, treeProps, {
    // Proxy event out
    onActiveChange: setActiveKey,
    onSelect: onInternalSelect,
    onCheck: onInternalSelect,
    onExpand: onInternalExpand,
    onLoad: onTreeLoad,
    filterTreeNode: filterTreeNode
  })));
};

var RefOptionList = React.forwardRef(OptionList);
RefOptionList.displayName = 'OptionList';
export default RefOptionList;