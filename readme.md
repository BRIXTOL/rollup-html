## @brixtol/rollup-html

Hard fork of the [@rollup/plugin-html](https://github.com/rollup/plugins/tree/master/packages/html) plugin with some minor adjustment to better fit the monorepo development environment.

### Why?

We need some additional control over the generated HTML, minor adjustments to source.

## Install

```cli
pnpm add @brixtol/rollup-html --save-dev
```

## Usage

```js
import html from '@brixtol/rollup-html';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    html({
      title: 'App Title',
      attributes: {
        html: { lang: 'en' }
      },
      styles: [
        {
          fileName: 'https://use.typekit.net/xxx.css',
          place: 'before'
        }
      ],
      sprite: {
        input: './src/svg/files',
        options: {
          cleanDefs: true,
          inline: true,
          svgAttrs: {
            class: 'd-none',
            style: 'position: absolute; height: 0 !important; width: !important;'
          }
        }
      },
      publicPath: '/',
      minify: {
        collapseWhitespace: true,
        html5: true,
        collapseInlineTagWhitespace: true
      },
      nodes: {
        div: {
          id: 'app'
        }
      },
      innerHTML: `
          <form name="contact-form" netlify netlify-honeypot="bot-field" hidden>
          <input type="text"  name="name">
          <input type="email" name="email">
          <input type="tel" name="phone">
          <textarea name="message"></textarea>
          </form>
        `,
      links: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: 'image/png',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'mask-icon',
          color: '#4c4c4c',
          href: '/safari-pinned-tab.svg'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        }
      ],
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'minimum-scale=1, initial-scale=1, width=device-width'
        },
        {
          name: 'description',
          content: 'Some Description'
        },
        {
          name: 'google-site-verification',
          content: 'xxxxx'
        },
        {
          name: 'msapplication-TileColor',
          content: '#ffffff'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    })
  ]
};
```

---

We [♡](https://www.brixtoltextiles.com/discount/4D3V3L0P3RS]) open source!
