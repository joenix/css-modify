# css-modify

> simple modify css var

## Install

```js
npm i -s css-modify
```

## Import

```js
import cssModify from "css-modify";
```

## Use

```js
const css = new cssModify();

css.modify("primary", "blue");
```

```css
.sample {
  color: var(--primary);
}
```

## Extention

```js
css.style({ h1: { color: "red" } });
```
