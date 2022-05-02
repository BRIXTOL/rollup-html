"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var $=require("path"),q=require("fs-extra"),x=require("svgstore"),A=require("html-minifier");function k(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var _=k(q),F=k(x),H=k(A);const T=e=>{const s=Object.values(e).filter(n=>n.type==="chunk"||(typeof n.type=="string"?n.type==="asset":n.isAsset)),r={};for(const n of s){const{fileName:a}=n,i=$.extname(a).substring(1);r[i]=(r[i]||[]).concat(n)}return r};async function L(e,s={}){const r=F.default(s),n=$.resolve(e),a=_.default.readdirSync(n).filter(i=>i!==".DS_Store");for(const i of a){const o=_.default.readFileSync($.join(n,i),{encoding:"utf-8"});r.add($.parse(i).name,o)}return r.toString({inline:s.inline})}const l=e=>e?Object.keys(e).reduce((s,r)=>s+=` ${r}="${e[r]}"`,""):"",M=async({attributes:e,files:s,meta:r,links:n,publicPath:a,title:i,nodes:o,innerHTML:y,styles:f,sprite:p,minify:m})=>{const b=(s.js||[]).map(({fileName:t})=>{const c=l(e.script);return`<script src="${/^http/.test(t)?t:`${a}${t}`}"${c}><\/script>`}).join(`
`);if(f){s.css||(s.css=[]);const t=f.reduce((c,{place:v,fileName:O})=>(c[v||"before"].push({fileName:O}),c),{before:[],after:[]});t.before.length>0&&(s.css=[...t.before,...s.css]),t.after.length>0&&(s.css=[...s.css,...t.after])}const g=n.map(t=>`<link${l(t)}>`).join(`
`),u=s.css.map(({fileName:t})=>{const c=l(e.link);return`<link href="${/^http/.test(t)?t:`${a}${t}`}" rel="stylesheet"${c}>`}).join(`
`),d=r.map(t=>`<meta${l(t)}>`).join(`
`);o=o?Object.entries(o).map(([t,c])=>`<${t}${l(c)}></${t}>`).join(`
`):"";const j=p.input?await L(p.input,p.options):"",h=`
<!doctype html>
<html${l(e.html)}>
  <head>
    ${d}
    <title>${i}</title>
    ${g||""}
    ${u}
    ${b||""}
  </head>
  <body>
    ${o}
    ${y}
    ${j}
  </body>
</html>`;return m?H.default.minify(h,typeof m=="object"?m:{}):h},S=["es","esm","iife","umd"],w={attributes:{html:{lang:"en"}},fileName:"index.html",styles:null,sprite:{input:null,options:{}},nodes:null,innerHTML:"",links:null,meta:[{charset:"utf-8"}],minify:!0,publicPath:"",template:M,title:"Rollup Bundle"};var B=(e={})=>{const{attributes:s,fileName:r,meta:n,publicPath:a,template:i,title:o,links:y,styles:f,sprite:p,innerHTML:m,nodes:b,minify:g}=Object.assign({},w,e);return{name:"html",async generateBundle(u,d){!S.includes(u.format)&&!e.template&&this.warn(`plugin-html: The output format '${u.format}' is not directly supported. A custom \`template\` is probably required.
          Supported formats include:
            ${S.join(", ")}`),(u.format==="esm"||u.format==="es")&&(s.script=Object.assign({},s.script,{type:"module"}));const j=T(d),h=await i({attributes:s,bundle:d,files:j,links:y,meta:n,styles:f,sprite:p,nodes:b,innerHTML:m,publicPath:a,title:o,minify:g}),t={type:"asset",source:h,name:"Rollup HTML Asset",fileName:r};this.emitFile(t)}}};exports.default=B,exports.makeHtmlAttributes=l;
