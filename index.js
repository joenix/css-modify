export default class CSS {
  constructor(prefix = "") {
    if (prefix.constructor !== String) {
      prefix = "";
    }
    this.$prefix = prefix;
    this.$element = document.documentElement;
    this.$attrs = this.$element.attributeStyleMap;
    this.$compt = this.$element.computedStyleMap;
    this.$sign = "css-modify";
    this.$sheet = this._sign(this.$sign);

    return this;
  }

  _prefix(key) {
    return `--${key}`;
  }

  _sign(id) {
    return (
      document.querySelector(`#${id}`) ||
      (style => (
        Object.assign(style, { id, type: "text/css" }),
        document.head.appendChild(style),
        style.sheet || style.styleSheet
      ))(document.createElement("style"))
    );
  }

  modify(vars, value) {
    value === undefined
      ? Object.keys(vars).forEach(name => this.set(name, vars[name]))
      : this.set(vars, value);
  }

  set(key, value) {
    value === undefined
      ? this.delete(key)
      : this.$attrs.set(this._prefix(key), value);
  }

  get(key) {
    return this.$attrs.get(this._prefix(key));
  }

  delete(prop) {
    this.$attrs.delete(this._prefix(prop));
  }

  clear(prop) {
    vars === undefined ? this.$attrs.clear() : this.delete(prop);
  }

  has(prop) {
    return this.$attrs.has(this._prefix(prop));
  }

  css(json) {
    return Object.keys(json)
      .map(selector => `${selector}{${this.of(json[selector])}}`)
      .join("\n");
  }

  of(json) {
    return Object.keys(json)
      .map(rule => `${rule}:${json[rule]}`)
      .join(";");
  }

  style(css) {
    this.$sheet.insertRule(this.css(css));
  }
}
