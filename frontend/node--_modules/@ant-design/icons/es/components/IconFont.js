import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import Icon from './Icon';
var customCache = new Set();

function isValidCustomScriptUrl(scriptUrl) {
  return typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl);
}

function createScriptUrlElements(scriptUrls) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var currentScriptUrl = scriptUrls[index];

  if (isValidCustomScriptUrl(currentScriptUrl)) {
    var script = document.createElement('script');
    script.setAttribute('src', currentScriptUrl);
    script.setAttribute('data-namespace', currentScriptUrl);

    if (scriptUrls.length > index + 1) {
      script.onload = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };

      script.onerror = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }

    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  }
}

export default function create() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scriptUrl = options.scriptUrl,
      _options$extraCommonP = options.extraCommonProps,
      extraCommonProps = _options$extraCommonP === void 0 ? {} : _options$extraCommonP;
  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */

  if (typeof document !== 'undefined' && typeof window !== 'undefined' && typeof document.createElement === 'function') {
    if (Array.isArray(scriptUrl)) {
      // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
      createScriptUrlElements(scriptUrl.reverse());
    } else {
      createScriptUrlElements([scriptUrl]);
    }
  }

  var Iconfont = React.forwardRef(function (props, ref) {
    var type = props.type,
        children = props.children,
        restProps = _objectWithoutProperties(props, ["type", "children"]); // children > type


    var content = null;

    if (props.type) {
      content = React.createElement("use", {
        xlinkHref: "#".concat(type)
      });
    }

    if (children) {
      content = children;
    }

    return React.createElement(Icon, Object.assign({}, extraCommonProps, restProps, {
      ref: ref
    }), content);
  });
  Iconfont.displayName = 'Iconfont';
  return Iconfont;
}