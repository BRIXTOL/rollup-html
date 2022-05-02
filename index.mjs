import{extname as x,resolve as F,join as O,parse as T}from"path";import k from"fs-extra";import A from"svgstore";import H from"html-minifier";const w=s=>{const e=Object.values(s).filter(n=>n.type==="chunk"||(typeof n.type=="string"?n.type==="asset":n.isAsset)),r={};for(const n of e){const{fileName:i}=n,o=x(i).substring(1);r[o]=(r[o]||[]).concat(n)}return r};async function L(s,e={}){const r=A(e),n=F(s),i=k.readdirSync(n).filter(o=>o!==".DS_Store");for(const o of i){const c=k.readFileSync(O(n,o),{encoding:"utf-8"});r.add(T(o).name,c)}return r.toString({inline:e.inline})}const l=s=>s?Object.keys(s).reduce((e,r)=>e+=` ${r}="${s[r]}"`,""):"",M=async({attributes:s,files:e,meta:r,links:n,publicPath:i,title:o,nodes:c,innerHTML:$,styles:f,sprite:p,minify:u})=>{const y=(e.js||[]).map(({fileName:t})=>{const a=l(s.script);return`<script src="${/^http/.test(t)?t:`${i}${t}`}"${a}><\/script>`}).join(`
`);if(f){e.css||(e.css=[]);const t=f.reduce((a,{place:j,fileName:v})=>(a[j||"before"].push({fileName:v}),a),{before:[],after:[]});t.before.length>0&&(e.css=[...t.before,...e.css]),t.after.length>0&&(e.css=[...e.css,...t.after])}const b=n.map(t=>`<link${l(t)}>`).join(`
`),m=e.css.map(({fileName:t})=>{const a=l(s.link);return`<link href="${/^http/.test(t)?t:`${i}${t}`}" rel="stylesheet"${a}>`}).join(`
`),d=r.map(t=>`<meta${l(t)}>`).join(`
`);c=c?Object.entries(c).map(([t,a])=>`<${t}${l(a)}></${t}>`).join(`
`):"";const g=p.input?await L(p.input,p.options):"",h=`
<!doctype html>
<html${l(s.html)}>
  <head>
    ${d}
    <title>${o}</title>
    ${b||""}
    ${m}
    ${y||""}
  </head>
  <body>
    ${c}
    ${$}
    ${g}
  </body>
</html>`;return u?H.minify(h,typeof u=="object"?u:{}):h},S=["es","esm","iife","umd"],B={attributes:{html:{lang:"en"}},fileName:"index.html",styles:null,sprite:{input:null,options:{}},nodes:null,innerHTML:"",links:null,meta:[{charset:"utf-8"}],minify:!0,publicPath:"",template:M,title:"Rollup Bundle"};var R=(s={})=>{const{attributes:e,fileName:r,meta:n,publicPath:i,template:o,title:c,links:$,styles:f,sprite:p,innerHTML:u,nodes:y,minify:b}=Object.assign({},B,s);return{name:"html",async generateBundle(m,d){!S.includes(m.format)&&!s.template&&this.warn(`plugin-html: The output format '${m.format}' is not directly supported. A custom \`template\` is probably required.
          Supported formats include:
            ${S.join(", ")}`),(m.format==="esm"||m.format==="es")&&(e.script=Object.assign({},e.script,{type:"module"}));const g=w(d),h=await o({attributes:e,bundle:d,files:g,links:$,meta:n,styles:f,sprite:p,nodes:y,innerHTML:u,publicPath:i,title:c,minify:b}),t={type:"asset",source:h,name:"Rollup HTML Asset",fileName:r};this.emitFile(t)}}};export{R as default,l as makeHtmlAttributes};
