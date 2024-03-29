import { extname, resolve, join, parse } from 'path'
import fs from 'fs-extra'
import svgstore from 'svgstore'
import htmlmin from 'html-minifier'

const getFiles = (bundle) => {

  const files = Object.values(bundle).filter(
    (file) => file.type === 'chunk' || (
      typeof file.type === 'string'
        ? file.type === 'asset'
        : file.isAsset
    )
  )
  const result = {}

  for (const file of files) {
    const { fileName } = file
    const extension = extname(fileName).substring(1)
    result[extension] = (result[extension] || []).concat(file)
  }

  return result
}

/**
 * Lifted from https://github.com/AlexxNB/rollup-plugin-svg-icons
 */
async function svgSprite (input, options = {}) {

  const sprites = svgstore(options)
  const dir = resolve(input)
  const icons = fs.readdirSync(dir).filter(i => i !== '.DS_Store')

  for (const file of icons) {
    const code = fs.readFileSync(join(dir, file), { encoding: 'utf-8' })
    sprites.add(parse(file).name, code)
  }

  return sprites.toString({ inline: options.inline })

}

export const makeHtmlAttributes = (attributes) => {

  if (!attributes) return ''

  return Object.keys(attributes).reduce((
    HTMLString
    , attr
  ) => (HTMLString += ` ${attr}="${attributes[attr]}"`), '')
}

const defaultTemplate = async (
  {
    attributes,
    files,
    meta,
    links,
    publicPath,
    title,
    nodes,
    innerHTML,
    styles,
    sprite,
    minify
  }
) => {

  const scripts = (files.js || []).map(({ fileName }) => {
    const attrs = makeHtmlAttributes(attributes.script)
    const path = /^http/.test(fileName) ? fileName : `${publicPath}${fileName}`
    return `<script src="${path}"${attrs}></script>`
  }).join('\n')

  if (styles) {

    if (!files.css) files.css = []
    const place = styles.reduce((opt, { place, fileName }) => {
      opt[place || 'before'].push({ fileName })
      return opt
    }, { before: [], after: [] })

    if (place.before.length > 0) files.css = [ ...place.before, ...files.css ]
    if (place.after.length > 0) files.css = [ ...files.css, ...place.after ]

  }

  const linked = links.map((input) => {
    return `<link${makeHtmlAttributes(input)}>`
  }).join('\n')

  const stylesheets = files.css.map(({ fileName }) => {
    const attrs = makeHtmlAttributes(attributes.link)
    const path = /^http/.test(fileName) ? fileName : `${publicPath}${fileName}`
    return `<link href="${path}" rel="stylesheet"${attrs}>`
  }).join('\n')

  const metas = meta.map((input) => (
    `<meta${makeHtmlAttributes(input)}>`
  )).join('\n')

  nodes = !nodes ? '' : Object.entries(nodes).map(([ name, attrs ]) => (
    `<${name}${makeHtmlAttributes(attrs)}></${name}>`
  )).join('\n')

  const icons = !sprite.input ? '' : await svgSprite(sprite.input, sprite.options)

  const dom = `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    ${linked || ''}
    ${stylesheets}
    ${scripts || ''}
  </head>
  <body>
    ${nodes}
    ${innerHTML}
    ${icons}
  </body>
</html>`

  if (minify) {
    return htmlmin.minify(dom, typeof minify === 'object' ? minify : {})
  }

  return dom
}

const supportedFormats = [ 'es', 'esm', 'iife', 'umd' ]

const defaults = {
  attributes: {
    html: { lang: 'en' }
  },
  fileName: 'index.html',
  styles: null,
  sprite: {
    input: null,
    options: {}
  },
  nodes: null,
  innerHTML: '',
  links: null,
  meta: [
    {
      charset: 'utf-8'
    }
  ],
  minify: true,
  publicPath: '',
  template: defaultTemplate,
  title: 'Rollup Bundle'
}

export default (options = {}) => {

  const {
    attributes,
    fileName,
    meta,
    publicPath,
    template,
    title,
    links,
    styles,
    sprite,
    innerHTML,
    nodes,
    minify
  } = Object.assign({}, defaults, options)

  return {
    name: 'html',

    async generateBundle (output, bundle) {

      if (!supportedFormats.includes(output.format) && !options.template) {
        this.warn(
          `plugin-html: The output format '${
            output.format
          }' is not directly supported. A custom \`template\` is probably required.
          Supported formats include:
            ${supportedFormats.join(', ')}`
        )
      }

      if (output.format === 'esm' || output.format === 'es') {
        attributes.script = Object.assign({}, attributes.script, {
          type: 'module'
        })
      }

      const files = getFiles(bundle)

      const source = await template({
        attributes,
        bundle,
        files,
        links,
        meta,
        styles,
        sprite,
        nodes,
        innerHTML,
        publicPath,
        title,
        minify
      })

      const htmlFile = {
        type: 'asset',
        source,
        name: 'Rollup HTML Asset',
        fileName
      }

      this.emitFile(htmlFile)
    }
  }
}
