function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import Tooltip from '../tooltip';

function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  var targetRef = React.useRef();
  React.useEffect(function () {
    refs.forEach(function (ref) {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);
  return targetRef;
}

var SliderTooltip = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var visible = props.visible;
  var innerRef = React.useRef(null);
  var tooltipRef = useCombinedRefs(ref, innerRef);
  var rafRef = React.useRef(null);

  function cancelKeepAlign() {
    window.cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }

  function keepAlign() {
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(function () {
      tooltipRef.current.forcePopupAlign();
      rafRef.current = null;
      keepAlign();
    });
  }

  React.useEffect(function () {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [visible]);
  return /*#__PURE__*/React.createElement(Tooltip, _extends({
    ref: tooltipRef
  }, props));
});
export default SliderTooltip;