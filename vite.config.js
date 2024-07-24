import minifyHtml from "@minify-html/node";
import { defineConfig } from "vite";
import path from "node:path";

const MinifyHtmlPlugin = () => {
  return {
    name: "minify-html",
    enforce: "post",
    apply: "build",
    transformIndexHtml: (html) => {
      return (minifyHtml.minify(Buffer.from(html), {
        keep_comments: true,
        keep_ssi_comments: true,
        remove_processing_instructions: false,
        preserve_chevron_percent_template_syntax: true,
        preserve_brace_template_syntax: true,
        do_not_minify_doctype: true,
        keep_html_and_head_opening_tags: true,
        keep_closing_tags: true,
        ensure_spec_compliant_unquoted_attribute_values: true,
        keep_spaces_between_attributes: true,
        minify_css: true,
        minify_js: true,
        remove_bangs: false,
      })).toString();
    },
  };
};

const SRC = "src";
const DIST = "dist";

export default defineConfig({
  root: path.resolve(SRC),
  build: {
    minify: "terser",
    outDir: path.resolve(DIST),
    emptyOutDir: true,
  },
  plugins: [
    MinifyHtmlPlugin(),
  ],
});