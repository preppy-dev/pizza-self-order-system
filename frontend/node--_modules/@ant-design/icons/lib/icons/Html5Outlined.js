"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Html5Outlined = _interopRequireDefault(require("@ant-design/icons-svg/lib/asn/Html5Outlined"));

var _AntdIcon = _interopRequireDefault(require("../components/AntdIcon"));

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY
var Html5Outlined = function Html5Outlined(props, ref) {
  return React.createElement(_AntdIcon.default, Object.assign({}, props, {
    ref: ref,
    icon: _Html5Outlined.default
  }));
};

Html5Outlined.displayName = 'Html5Outlined';

var _default = React.forwardRef(Html5Outlined);

exports.default = _default;