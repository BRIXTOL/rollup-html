## @brixtol/rollup-html

Hard fork of the [@rollup/plugin-html](https://github.com/rollup/plugins/tree/master/packages/html) plugin with some minor adjustment to better fit the monorepo development environment.

### Why?

We need some additional control over the generated HTML, minor adjustments to source.

## Install

```cli
pnpm i @brixtol/rollup-html --save-dev
```

> This package is not available on the public NPM registery

## Usage

```js
import { plugins } from "@brixtol/rollup-html";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [
    html({
      scripts: Boolean
    })
  ]
};
```


---

We [♡](https://www.brixtoltextiles.com/discount/4D3V3L0P3RS]) open source!
