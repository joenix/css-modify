import compatible from "./compatible";

let proxy;

export default class CSS {
  constructor(prefix = "") {
    if (prefix.constructor !== String) {
      prefix = "";
    }

    proxy = this;

    proxy.$prefix = prefix;
    proxy.$element = compatible(document.documentElement);
    proxy.$attrs = proxy.$element.attributeStyleMap;
    proxy.$compt = proxy.$element.computedStyleMap;
    proxy.$sign = "css-modify";
    proxy.$sheet = proxy._sign(proxy.$sign);

    return this;
  }

  _prefix(key) {
    return `--${key}`;
  }

  _sign(id, node) {
    node =
      document.querySelector(`#${id}`) ||
      (style => (
        Object.assign(style, { id, type: "text/css" }),
        document.head.appendChild(style)
      ))(document.createElement("style"));
    return node.sheet || node.styleSheet;
  }

  modify(vars, value) {
    value === undefined
      ? Object.keys(vars).forEach(name => proxy.set(name, vars[name]))
      : proxy.set(vars, value);
  }

  set(key, value) {
    value === undefined
      ? proxy.delete(key)
      : proxy.$attrs.set(proxy._prefix(key), value);
  }

  get(key) {
    return proxy.$attrs.get(proxy._prefix(key));
  }

  delete(prop) {
    proxy.$attrs.delete(proxy._prefix(prop));
  }

  clear(prop) {
    vars === undefined ? proxy.$attrs.clear() : proxy.delete(prop);
  }

  has(prop) {
    return proxy.$attrs.has(proxy._prefix(prop));
  }

  css(json) {
    return Object.keys(json)
      .map(selector => `${selector}{${proxy.of(json[selector])}}`)
      .join("\n");
  }

  of(json) {
    return Object.keys(json)
      .map(rule => `${rule}:${json[rule]}`)
      .join(";");
  }

  clean() {
    const { $sheet, clean } = proxy;

    if (!$sheet.cssRules.length) {
      return;
    }

    $sheet[$sheet.deleteRule ? "deleteRule" : "removeRule"](0), proxy.clean();
  }

  style(css) {
    proxy.$sheet.insertRule(proxy.css(css), proxy.$sheet.length);
  }
}
