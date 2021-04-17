import * as HTMLMinifier from "html-minifier";

interface HTMLOptions {
  attributes: {
    /**
     * Link Attribute inject into <head>
     *
     * @example
     * <link rel="stylesheet" href="/style.css">
     *
     * @default null
     */
    link?: object;

    /**
     * HTML Tag Attributes
     *
     * @example
     * <html lang="en">
     *
     * @default { lang: 'end'}
     */
    html?: object;
  };

  /**
   * Minify the generated HTML file.
   * If set to false, will use default htmlmin options,
   * otherwise pass the htmlmin options
   *
   * @default true
   */
  minify?: boolean | HTMLMinifier.Options;
  /**
   * File name to generate
   *
   * @default 'index.html'
   */
  fileName?: string;

  /**
   * List of addition stylesheets to be applied
   */
  styles?: {
    /**
     * The href URL of the stylesheet
     */
    fileName: string;

    /**
     * Should the styles be placed before or after
     *
     * @default 'before'
     */
    place?: "before" | "after";
  }[];

  /**
   * SVG Sprite
   *
   */
  sprite?: {
    /**
     * Input Directory where `.svg` files are contained
     *
     * @default null
     */
    input: string;

    /**
     * Options passed to SVG Store
     *
     * @see https://github.com/svgstore/svgstore#svgstore-options
     */
    options?: {
      /**
       * Remove `style` attributes from SVG definitions,
       * or a list of attributes to remove.
       *
       * @default false
       */
      cleanDefs?: boolean | string[];
      /**
       * Remove `style` attributes from SVG objects,
       * or a list of attributes to remove.
       *
       * @default false
       */
      cleanSymbols?: boolean | string[];

      /**
       * Outputs sprite as a string of XML.
       *
       * @default true
       */
      inline?: boolean;

      /**
       * A map of attributes to set on the root `<svg>` element.
       * If you set an attribute's value to null, you remove that attribute.
       *
       * @default false
       */
      svgAttrs?: boolean | object;

      /**
       * A map of attributes to set on each <symbol> element.
       * If you set an attribute's value to null, you remove that attribute.
       *
       * @default false
       */
      symbolAttrs?: boolean | object;

      /**
       * Attributes to have svgstore attempt to copy to the newly
       * created `<symbol>` tag from it's source `<svg>` tag.
       * The viewBox, aria-labelledby, and role attributes are always copied.
       *
       * @default boolean
       */
      copyAttrs?: boolean | string[];

      /**
       * Rename defs content ids to make them inherit files' names
       * so that it would help to avoid defs with same ids in the output file.
       *
       * @default false
       */
      renameDefs?: boolean;
    };
  };

  /**
   * List of single depth HTML element node to append to `<body>`.
   * You can only add single tags as its an object value.
   */
  nodes?: {
    /**
     * Property value should be the tag name, example: `div` or `main`
     */
    [tagName: string]: {
      [attributeName: string]: string;
    };
  };

  /**
   * List of Meta Tags to be appended to `<head>` element
   */
  meta?: object[];

  /**
   * Public path to be preprended to src urls
   */
  publicPath?: string;

  /**
   * Page Title
   */
  title: string;
}

/**
 * Rollup plugin to take a list of globs, copy, transform, rename or repath
 * and optionally watch for changes, syncing those over.
 */
export default function html(options: HTMLOptions): rollup.Plugin;
