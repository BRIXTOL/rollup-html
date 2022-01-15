"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("path"),t=require("fs-extra"),n=require("svgstore"),s=require("html-minifier");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=i(t),l=i(n),a=i(s);const o=e=>e?Object.keys(e).reduce(((t,n)=>t+` ${n}="${e[n]}"`),""):"",u=["es","esm","iife","umd"],c={attributes:{html:{lang:"en"}},fileName:"index.html",styles:null,sprite:{input:null,options:{}},nodes:null,innerHTML:"",links:null,meta:[{charset:"utf-8"}],minify:!0,publicPath:"",template:async({attributes:t,files:n,meta:s,links:i,publicPath:u,title:c,nodes:m,innerHTML:p,styles:f,sprite:d,minify:y})=>{const h=(n.js||[]).map((({fileName:e})=>{const n=o(t.script);return`<script src="${/^http/.test(e)?e:`${u}${e}`}"${n}><\/script>`})).join("\n");if(f){n.css||(n.css=[]);const e=f.reduce(((e,{place:t,fileName:n})=>(e[t||"before"].push({fileName:n}),e)),{before:[],after:[]});e.before.length>0&&(n.css=[...e.before,...n.css]),e.after.length>0&&(n.css=[...n.css,...e.after])}const b=i.map((e=>`<link${o(e)}>`)).join("\n"),$=n.css.map((({fileName:e})=>{const n=o(t.link);return`<link href="${/^http/.test(e)?e:`${u}${e}`}" rel="stylesheet"${n}>`})).join("\n"),j=s.map((e=>`<meta${o(e)}>`)).join("\n");m=m?Object.entries(m).map((([e,t])=>`<${e}${o(t)}></${e}>`)).join("\n"):"";const g=d.input?await async function(t,n={}){const s=l.default(n),i=e.resolve(t),a=r.default.readdirSync(i).filter((e=>".DS_Store"!==e));for(const t of a){const n=r.default.readFileSync(e.join(i,t),{encoding:"utf-8"});s.add(e.parse(t).name,n)}return s.toString({inline:n.inline})}(d.input,d.options):"",k=`\n<!doctype html>\n<html${o(t.html)}>\n  <head>\n    ${j}\n    <title>${c}</title>\n    ${b||""}\n    ${$}\n    ${h||""}\n  </head>\n  <body>\n    ${m}\n    ${p}\n    ${g}\n  </body>\n</html>`;return y?a.default.minify(k,"object"==typeof y?y:{}):k},title:"Rollup Bundle"};exports.default=(t={})=>{const{attributes:n,fileName:s,meta:i,publicPath:r,template:l,title:a,links:o,styles:m,sprite:p,innerHTML:f,nodes:d,minify:y}=Object.assign({},c,t);return{name:"html",async generateBundle(c,h){u.includes(c.format)||t.template||this.warn(`plugin-html: The output format '${c.format}' is not directly supported. A custom \`template\` is probably required.\n          Supported formats include:\n            ${u.join(", ")}`),"esm"!==c.format&&"es"!==c.format||(n.script=Object.assign({},n.script,{type:"module"}));const b=(t=>{const n=Object.values(t).filter((e=>"chunk"===e.type||("string"==typeof e.type?"asset"===e.type:e.isAsset))),s={};for(const t of n){const{fileName:n}=t,i=e.extname(n).substring(1);s[i]=(s[i]||[]).concat(t)}return s})(h),$={type:"asset",source:await l({attributes:n,bundle:h,files:b,links:o,meta:i,styles:m,sprite:p,nodes:d,innerHTML:f,publicPath:r,title:a,minify:y}),name:"Rollup HTML Asset",fileName:s};this.emitFile($)}}},exports.makeHtmlAttributes=o;