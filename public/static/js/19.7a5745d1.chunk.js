(this.webpackJsonporr=this.webpackJsonporr||[]).push([[19],{544:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var r=a(546);function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},545:function(e,t,a){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],r=!0,n=!1,i=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(a.push(l.value),!t||a.length!==t);r=!0);}catch(s){n=!0,i=s}finally{try{r||null==c.return||c.return()}finally{if(n)throw i}}return a}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}a.d(t,"a",(function(){return r}))},547:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return n}));var r=function(e){for(var t={},a=e.target,r=0;r<a.length;r++){var n=a.elements[r],i=n.name,l=n.value,c=n.type;if(l)switch(c){case"checkbox":t[i]=n.checked;break;default:t[i]=l}}return t},n=function(e){e&&Object.keys(e).forEach((function(t){var a=e[t],r=document.getElementById(t);r&&(r.checked=a,r.value=a)}))}},560:function(e,t,a){"use strict";var r=a(6),n=a(14),i=a(2),l=a.n(i),c=a(1),s=a.n(c),o=a(18),u=a.n(o),d=a(8),m=s.a.oneOfType([s.a.number,s.a.string]),h=s.a.oneOfType([s.a.string,s.a.number,s.a.shape({size:m,order:m,offset:m})]),p={children:s.a.node,hidden:s.a.bool,check:s.a.bool,size:s.a.string,for:s.a.string,tag:d.i,className:s.a.string,cssModule:s.a.object,xs:h,sm:h,md:h,lg:h,xl:h,widths:s.a.array},f={tag:"label",widths:["xs","sm","md","lg","xl"]},g=function(e,t,a){return!0===a||""===a?e?"col":"col-"+t:"auto"===a?e?"col-auto":"col-"+t+"-auto":e?"col-"+a:"col-"+t+"-"+a},k=function(e){var t=e.className,a=e.cssModule,i=e.hidden,c=e.widths,s=e.tag,o=e.check,m=e.size,h=e.for,p=Object(n.a)(e,["className","cssModule","hidden","widths","tag","check","size","for"]),f=[];c.forEach((function(t,r){var n=e[t];if(delete p[t],n||""===n){var i,l=!r;if(Object(d.d)(n)){var c,s=l?"-":"-"+t+"-";i=g(l,t,n.size),f.push(Object(d.f)(u()(((c={})[i]=n.size||""===n.size,c["order"+s+n.order]=n.order||0===n.order,c["offset"+s+n.offset]=n.offset||0===n.offset,c))),a)}else i=g(l,t,n),f.push(i)}}));var k=Object(d.f)(u()(t,!!i&&"sr-only",!!o&&"form-check-label",!!m&&"col-form-label-"+m,f,!!f.length&&"col-form-label"),a);return l.a.createElement(s,Object(r.a)({htmlFor:h},p,{className:k}))};k.propTypes=p,k.defaultProps=f,t.a=k},561:function(e,t,a){"use strict";a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return s})),a.d(t,"h",(function(){return l})),a.d(t,"g",(function(){return c})),a.d(t,"d",(function(){return u})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return m}));var r=a(54),n="/risk-areas";function i(e){r.server.get("/likelihood-impact").then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function l(e){r.server.get("".concat(n)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function c(e){r.server.get("".concat(n,"/code")).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function s(e,t){r.server.get("".concat(n,"/").concat(e)).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function o(e,t){r.server.put("".concat(n,"/").concat(e.id),e).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function u(e,t){r.server.put("".concat(n,"/code"),e).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function d(e,t){r.server.post("".concat(n),e).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function m(e,t){r.server.delete("".concat(n,"/").concat(e)).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}},562:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return i}));var r=new(0,a(563).default)((new Date).toString().slice(0,18),10,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"),n=function(e){return r.encode(e)},i=function(e){return r.decode(e)}},563:function(e,t,a){var r,n,i;"object"==typeof globalThis?globalThis:"object"==typeof self&&self,n=[t],void 0===(i="function"===typeof(r=function(e){"use strict";function t(e){return function(e){if(Array.isArray(e))return e}(e)||r(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||r(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}e.__esModule=!0,e.unicodeSubstr=e.onlyChars=e.withoutChars=e.keepUniqueChars=e.default=void 0;var n=function(){function e(e,t,r,n){if(void 0===e&&(e=""),void 0===t&&(t=0),void 0===r&&(r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"),void 0===n&&(n="cfhistuCFHISTU"),this.salt=e,this.minLength=t,"number"!=typeof t)throw new TypeError("Hashids: Provided 'minLength' has to be a number (is "+typeof t+")");if("string"!=typeof e)throw new TypeError("Hashids: Provided 'salt' has to be a string (is "+typeof e+")");if("string"!=typeof r)throw new TypeError("Hashids: Provided alphabet has to be a string (is "+typeof r+")");var m=s(r);if(m.length<i)throw new Error("Hashids: alphabet must contain at least "+i+" unique characters, provided: "+m);this.alphabet=o(m,n);var h,f,g=u(n,m);this.seps=p(g,e),(0===a(this.seps).length||a(this.alphabet).length/a(this.seps).length>l)&&(h=Math.ceil(a(this.alphabet).length/l))>a(this.seps).length&&(f=h-a(this.seps).length,this.seps+=d(this.alphabet,0,f),this.alphabet=d(this.alphabet,f)),this.alphabet=p(this.alphabet,e);var k=Math.ceil(a(this.alphabet).length/c);a(this.alphabet).length<3?(this.guards=d(this.seps,0,k),this.seps=d(this.seps,k)):(this.guards=d(this.alphabet,0,k),this.alphabet=d(this.alphabet,k))}var r=e.prototype;return r.encode=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var i="";return(r=Array.isArray(e)?e:[].concat(a(null!=e?[e]:[]),a(r))).length?(r.every(m)||(r=r.map((function(e){return"bigint"==typeof e||"number"==typeof e?e:E(String(e))}))),r.every(h)?this._encode(r):i):i},r.decode=function(e){return e&&"string"==typeof e&&0!==e.length?this._decode(e):[]},r.encodeHex=function(e){switch(typeof e){case"bigint":e=e.toString(16);break;case"string":if(!/^[0-9a-fA-F]+$/.test(e))return"";break;default:throw new Error("Hashids: The provided value is neither a string, nor a BigInt (got: "+typeof e+")")}var t=v(e,12,(function(e){return parseInt("1"+e,16)}));return this.encode(t)},r.decodeHex=function(e){return this.decode(e).map((function(e){return e.toString(16).slice(1)})).join("")},r._encode=function(e){var t,r=this,n=this.alphabet,i=e.reduce((function(e,t,a){return e+("bigint"==typeof t?Number(t%BigInt(a+100)):t%(a+100))}),0),l=t=a(n)[i%a(n).length],c=a(this.seps),s=a(this.guards);if(e.forEach((function(a,i){var s=l+r.salt+n;n=p(n,d(s,0));var o=f(a,n);if(t+=o,i+1<e.length){var u=o.codePointAt(0)+i,m="bigint"==typeof a?Number(a%BigInt(u)):a%u;t+=c[m%c.length]}})),a(t).length<this.minLength){var o=(i+a(t)[0].codePointAt(0))%s.length;if(a(t=s[o]+t).length<this.minLength){var u=(i+a(t)[2].codePointAt(0))%s.length;t+=s[u]}}for(var m=Math.floor(a(n).length/2);a(t).length<this.minLength;){n=p(n,n);var h=a(t=d(n,m)+t+d(n,0,m)).length-this.minLength;h>0&&(t=d(t,h/2,this.minLength))}return t},r.isValidId=function(e){var t=this;return a(e).every((function(e){return t.alphabet.includes(e)||t.guards.includes(e)||t.seps.includes(e)}))},r._decode=function(e){var r=this;if(!this.isValidId(e))throw new Error("The provided ID ("+e+") is invalid, as it contains characters that do not exist in the alphabet ("+this.guards+this.seps+this.alphabet+")");var n=k(e,(function(e){return r.guards.includes(e)})),i=a(n[3===n.length||2===n.length?1:0]);if(0===i.length)return[];var l=t(i),c=l[0],s=l.slice(1).join(""),o=k(s,(function(e){return r.seps.includes(e)})).reduce((function(e,t){var n=e.result,i=e.lastAlphabet,l=c+r.salt+i,s=p(i,d(l,0,a(i).length));return{result:[].concat(a(n),[g(t,s)]),lastAlphabet:s}}),{result:[],lastAlphabet:this.alphabet}).result;return this._encode(o)!==e?[]:o},e}();e.default=n;var i=16,l=3.5,c=12,s=function(e){return Array.from(new Set(e)).join("")};e.keepUniqueChars=s;var o=function(e,a){var r=t(e).slice(0),n=t(a).slice(0);return r.filter((function(e){return!n.includes(e)})).join("")};e.withoutChars=o;var u=function(e,a){var r=t(e).slice(0),n=t(a).slice(0);return r.filter((function(e){return n.includes(e)})).join("")};e.onlyChars=u;var d=function(e,a,r){return t(e).slice(0).slice(a,void 0===r?void 0:a+r).join("")};e.unicodeSubstr=d;var m=function(e){return"bigint"==typeof e||!Number.isNaN(Number(e))&&Math.floor(Number(e))===e},h=function(e){return"bigint"==typeof e||e>=0&&Number.isSafeInteger(e)};function p(e,r){var n,i=t(r).slice(0);if(!i.length)return e;for(var l=a(e),c=l.length-1,s=0,o=0;c>0;c--,s++){o+=n=i[s%=i.length].codePointAt(0);var u=(n+s+o)%c,d=[l[c],l[u]];l[u]=d[0],l[c]=d[1]}return l.join("")}var f=function(e,a){var r=t(a).slice(0),n="";if("bigint"==typeof e){var i=BigInt(r.length);do{n=r[Number(e%i)]+n,e/=i}while(e>BigInt(0))}else do{n=r[e%r.length]+n,e=Math.floor(e/r.length)}while(e>0);return n},g=function(e,a){var r=t(e).slice(0),n=t(a).slice(0);return r.map((function(e){var t=n.indexOf(e);if(-1===t){var a=r.join(""),i=n.join("");throw new Error("The provided ID ("+a+") is invalid, as it contains characters that do not exist in the alphabet ("+i+")")}return t})).reduce((function(e,t){if("bigint"==typeof e)return e*BigInt(n.length)+BigInt(t);var a=e*n.length+t;if(Number.isSafeInteger(a))return a;if("function"==typeof BigInt)return BigInt(e)*BigInt(n.length)+BigInt(t);throw new Error("Unable to decode the provided string, due to lack of support for BigInt numbers in the current environment")}),0)},k=function(e,r){return t(e).slice(0).reduce((function(e,t){return r(t)?[].concat(a(e),[""]):[].concat(a(e.slice(0,-1)),[e[e.length-1]+t])}),[""])},b=/^\+?[0-9]+$/,E=function(e){return b.test(e)?parseInt(e,10):NaN},v=function(e,t,a){return Array.from({length:Math.ceil(e.length/t)},(function(r,n){return a(e.slice(n*t,(n+1)*t))}))}})?r.apply(t,n):r)||(e.exports=i)},564:function(e,t,a){"use strict";function r(e,t){if(e&&t){var a=e.filter((function(e){return Number(e.likelihoodId)===t?1:0}))[0];return a||{}}return{}}function n(e,t){if(e&&t){var a=e.filter((function(e){return Number(e.impactId)===t?1:0}))[0];return a||{}}return{}}function i(e,t){if(e&&t){var a=e.filter((function(e){return e.likelihoodId===t?1:0}))[0];return a||{}}return{}}function l(e,t){if(e&&t){var a=e.filter((function(e){return e.impactId===t?1:0}))[0];return a||{}}return{}}a.r(t),a.d(t,"populateLikelihoodTable",(function(){return r})),a.d(t,"populateImpactTable",(function(){return n})),a.d(t,"populateInstanceImpactTable",(function(){return l})),a.d(t,"populateInstanceLikelihoodTable",(function(){return i})),a.d(t,"splitText",(function(){return c}));var c="|||"},569:function(e,t,a){"use strict";var r=a(6),n=a(14),i=a(2),l=a.n(i),c=a(1),s=a.n(c),o=a(18),u=a.n(o),d=a(8),m={children:s.a.node,row:s.a.bool,check:s.a.bool,inline:s.a.bool,disabled:s.a.bool,tag:d.i,className:s.a.string,cssModule:s.a.object},h=function(e){var t=e.className,a=e.cssModule,i=e.row,c=e.disabled,s=e.check,o=e.inline,m=e.tag,h=Object(n.a)(e,["className","cssModule","row","disabled","check","inline","tag"]),p=Object(d.f)(u()(t,!!i&&"row",s?"form-check":"form-group",!(!s||!o)&&"form-check-inline",!(!s||!c)&&"disabled"),a);return"fieldset"===m&&(h.disabled=c),l.a.createElement(m,Object(r.a)({},h,{className:p}))};h.propTypes=m,h.defaultProps={tag:"div"},t.a=h},616:function(e,t,a){"use strict";var r=a(544),n=a(545),i=a(2),l=a.n(i),c=a(534),s=a(535),o=a(558),u=a(542),d=a(564),m=function(e){var t=e.riskParticular,a=e.index;return l.a.createElement(c.a,null,l.a.createElement(s.a,{lg:6},l.a.createElement(o.a,{striped:!0,responsive:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{style:{minWidth:"150px"}},"Likelihood"),l.a.createElement("th",{style:{minWidth:"150px"}},"Lower Limit"),l.a.createElement("th",{style:{minWidth:"150px"}},"Upper Limit"))),l.a.createElement("tbody",null,e.likelihoods.map((function(r,n){var i=Object(d.populateLikelihoodTable)(t.risk_area_likelihood_rules,r.id);return l.a.createElement("tr",{key:n},l.a.createElement("td",{key:r.name+n},r.name),l.a.createElement("td",null,l.a.createElement(u.a,{name:t.type+"-"+a+"-likelihood-lower-"+r.id,key:r.id,value:i.lowerLimit?Number(i.lowerLimit).toLocaleString("en"):"",onChange:e.onChange})),l.a.createElement("td",null,l.a.createElement(u.a,{name:t.type+"-"+a+"-likelihood-upper-"+r.id,key:r.id,value:i.upperLimit?Number(i.upperLimit).toLocaleString("en"):"",onChange:e.onChange})))}))))),l.a.createElement(s.a,{lg:6},l.a.createElement(o.a,{striped:!0,responsive:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{style:{minWidth:"150px"}},"Impact"),l.a.createElement("th",{style:{minWidth:"150px"}},"Lower Limit"),l.a.createElement("th",{style:{minWidth:"150px"}},"Upper Limit"))),l.a.createElement("tbody",null,e.impacts.map((function(r,n){var i=Object(d.populateImpactTable)(t.risk_area_impact_rules,r.id);return l.a.createElement("tr",{key:n},l.a.createElement("td",{key:r.name+n},r.name),l.a.createElement("td",{key:r.id},l.a.createElement(u.a,{value:i.lowerLimit?Number(i.lowerLimit).toLocaleString("en"):"",name:t.type+"-"+a+"-impact-lower-"+r.id,key:r.id,onChange:e.onChange})),l.a.createElement("td",null,l.a.createElement(u.a,{value:i.upperLimit?Number(i.upperLimit).toLocaleString("en"):"",name:t.type+"-"+a+"-impact-upper-"+r.id,key:r.id,onChange:e.onChange})))}))))))},h=a(537),p=a(549),f=a(532),g=a(538),k=a(540),b=a(541),E=a(564).splitText,v=function(e){var t=Object(i.useState)({}),a=Object(n.a)(t,2),d=a[0],m=a[1],v=function(t,a,r,n){var i={target:{name:a}};null!==t?n=n.map((function(e,a){return a===t?r:e})):n.push(""),i.target.value=n.join(E),e.handleRiskParticularNameChange(i)},y=e.riskParticulars,_=e.riskInstanceRules;return l.a.createElement(h.a,null,l.a.createElement(p.a,null,l.a.createElement(c.a,null,l.a.createElement(s.a,null,l.a.createElement("strong",null,"Risk Rule Instance")),l.a.createElement(s.a,null,l.a.createElement(f.a,{size:"sm",className:"text-white",color:"danger",onClick:function(){e.deleteRiskParticularTable("instance",null),m({})}},l.a.createElement("i",{className:"fa fa-trash"}))))),l.a.createElement(g.a,null,l.a.createElement(c.a,null,l.a.createElement(s.a,{lg:6},l.a.createElement(o.a,{striped:!0,responsive:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"col"},"Likelihood"),l.a.createElement("th",{scope:"col"},"Lower Limit"),l.a.createElement("th",{scope:"col"},"Upper Limit"))),l.a.createElement("tbody",null,e.likelihoods.map((function(t,a){var r=_.filter((function(e){return Number(e.likelihoodId)===t.id?1:0}))[0];return r=r||{},l.a.createElement("tr",{key:a},l.a.createElement("td",null,t.name),l.a.createElement("td",null,l.a.createElement(u.a,{name:"instance-"+a+"-likelihood-lower-"+t.id,key:t.id,value:r.lowerLimit?r.lowerLimit:"",onChange:e.onChange})),l.a.createElement("td",null,l.a.createElement(u.a,{name:"instance-"+a+"-likelihood-upper-"+t.id,key:t.id,value:r.upperLimit?r.upperLimit:"",onChange:e.onChange})))}))))),l.a.createElement(s.a,{lg:6},l.a.createElement(o.a,{striped:!0,responsive:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"col"},"Impact"),l.a.createElement("th",{scope:"col"},"Instance"))),l.a.createElement("tbody",null,e.impacts.map((function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("th",{key:t.name+a},t.name),l.a.createElement("td",{key:t.id},y.map((function(a,n){var i=a.risk_area_impact_rules[0]?a.risk_area_impact_rules[0]:{},c="name-"+n,s=a.name.split(E);return"instance"===a.type&&i.impactId===t.id?(d[t.id]||(d[t.id]=!0,m(Object(r.a)({},d))),l.a.createElement(l.a.Fragment,{key:n},l.a.createElement(k.a,{className:"mb-2"},l.a.createElement(b.a,{addonType:"prepend"},l.a.createElement(f.a,{color:"primary",type:"button"},"Code")),l.a.createElement(u.a,{type:"text",className:"font-italic",style:{width:150},name:"code-"+n,value:a.code?a.code:"",onChange:e.handleRiskParticularCodeChange,placeholder:"Enter Risk Particular Code",required:!0})),s.map((function(t,a){return l.a.createElement(k.a,{className:"mb-2",key:a},l.a.createElement(u.a,{required:!0,className:t?"font-weight-bold":"",key:"riskParticularName"+n,name:c,value:t,placeholder:"Detail of Error",onChange:function(e){return v(a,c,e.target.value,s)}}),l.a.createElement(b.a,{addonType:"append"},l.a.createElement(f.a,{type:"button",color:"danger",onClick:function(){return function(t,a,r){var n={target:{name:a}};r=r.filter((function(e,a){return a===t?0:1})),n.target.value=r.join(E),e.handleRiskParticularNameChange(n)}(a,c,s)}},l.a.createElement("i",{className:"fa fa-trash"}))))})),l.a.createElement(f.a,{className:"text-white",color:"warning",size:"sm",onClick:function(){v(null,c,"",s)}},"+"))):null})),d[t.id]?null:l.a.createElement(f.a,{id:"impact-add-button"+t.id,key:a,color:"primary",className:"ml-1",onClick:function(a){e.handleAddImpact(t.id),a.target.display="none"}},"+")))}))))))))},y=a(560),_=a(552),A=function(e){var t=e.riskTriggers;return l.a.createElement(h.a,null,l.a.createElement(p.a,{className:"font-weight-bold"},"Risk Triggers"),l.a.createElement(g.a,null,l.a.createElement(o.a,null,l.a.createElement("tbody",null,t.map((function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,l.a.createElement(y.a,{htmlFor:"trigger-"+a},l.a.createElement("strong",null,a+1))),l.a.createElement("td",null,l.a.createElement(u.a,{id:"trigger-"+a,key:a,valid:!0,name:a,value:t.name,onChange:e.handleTriggerChange,required:!0})),l.a.createElement("td",null,l.a.createElement(f.a,{color:"primary",onClick:function(){return e.deleteRiskTrigger(a)}},l.a.createElement("i",{className:"fa fa-trash"}))))}))))),l.a.createElement(_.a,null,l.a.createElement(f.a,{color:"info",className:"font-weight-bold text-white",onClick:e.addRiskTrigger},"+")))},C=function(e){var t=e.riskTracedBy;return l.a.createElement(h.a,null,l.a.createElement(p.a,{className:"font-weight-bold"},"Traced By"),l.a.createElement(g.a,null,l.a.createElement(o.a,null,l.a.createElement("tbody",null,t.map((function(t,a){return l.a.createElement("tr",{key:a},l.a.createElement("td",null,l.a.createElement(y.a,{htmlFor:"tracedBy-"+a},l.a.createElement("strong",null,a+1))),l.a.createElement("td",null,l.a.createElement(u.a,{id:"tracedBy-"+a,key:a,valid:!0,name:a,value:t.name,onChange:e.handleRiskTracedByChange,required:!0})),l.a.createElement("td",null,l.a.createElement(f.a,{color:"primary",onClick:function(){return e.deleteRiskTracedBy(a)}},l.a.createElement("i",{className:"fa fa-trash"}))))}))))),l.a.createElement(_.a,null,l.a.createElement(f.a,{color:"info",className:"font-weight-bold text-white",onClick:e.addRiskTracedBy},"+")))},w=a(539),N=a(569),R=a(884),T=a(564).splitText;t.a=function(e){var t=Object(i.useState)({}),a=Object(n.a)(t,2),o=a[0],d=a[1],E=function(t,a,r,n){var i={target:{name:a}};null!==t?n=n.map((function(e,a){return a===t?r:e})):n.push(""),i.target.value=n.join(T),e.handleRiskParticularNameChange(i)},I=e.riskArea,j=I&&I.risk_area_particulars?I.risk_area_particulars:[],O=I&&I.risk_area_likelihood_instance_rules?I.risk_area_likelihood_instance_rules:[],P=I&&I.risk_area_triggers?I.risk_area_triggers:[],L=I&&I.risk_area_traced_bies?I.risk_area_traced_bies:[];return l.a.createElement("div",{className:"animated fadeIn"},l.a.createElement(c.a,null,l.a.createElement(s.a,{lg:12},l.a.createElement(w.a,{id:e.formId,onSubmit:e.handleSubmit},l.a.createElement(h.a,null,l.a.createElement(p.a,null,l.a.createElement("strong",null,l.a.createElement("i",{className:"icon-briefcase pr-2"}),e.title)),l.a.createElement(g.a,null,l.a.createElement(N.a,null,l.a.createElement(y.a,{htmlFor:"name"},"Name"),I?l.a.createElement(u.a,{type:"text",name:"name",id:"name",value:I.name?I.name:"",onChange:e.handleRiskAreaChange,placeholder:"Enter Risk Area Name",required:!0}):l.a.createElement(u.a,{type:"text",name:"name",id:"name",placeholder:"Enter Risk Area Name",required:!0})),l.a.createElement(c.a,null,l.a.createElement(s.a,{md:6},l.a.createElement(N.a,null,l.a.createElement(y.a,{htmlFor:"code"},"Code"),I?l.a.createElement(u.a,{type:"text",name:"code",id:"code",value:I.code?I.code:"",onChange:e.handleRiskAreaChange,placeholder:"Enter Risk Area Code",required:!0}):l.a.createElement(u.a,{type:"text",name:"code",id:"code",placeholder:"Enter Risk Area Code",required:!0}))),l.a.createElement(s.a,{md:6},l.a.createElement(N.a,null,l.a.createElement(y.a,{htmlFor:"isActive"},"Status"),I?l.a.createElement(u.a,{type:"select",name:"isActive",id:"isActive",value:I.isActive?I.isActive:"",disabled:!e.permissions.isApprover||!e.permissions.isApprover,onChange:e.handleRiskAreaChange,required:!0},l.a.createElement("option",{value:"false"},"Inactive"),l.a.createElement("option",{value:"true"},"Active")):l.a.createElement(u.a,{type:"select",name:"isActive",id:"isActive",disabled:!e.permissions.isApprover||!e.permissions.isApprover,required:!0},l.a.createElement("option",{value:"false"},"Inactive"),l.a.createElement("option",{value:"true"},"Active")))))),l.a.createElement(_.a,null,l.a.createElement(f.a,{id:"submit-button-risk-area-form",type:"submit",size:"sm",color:"success"},l.a.createElement("i",{className:"fa fa-dot-circle-o"}),"Submit"),l.a.createElement(f.a,{className:"ml-2",type:"reset",size:"sm",color:"danger"},l.a.createElement("i",{className:"fa fa-ban"})," Reset"))),e.isEdit?l.a.createElement(l.a.Fragment,null,j.map((function(t,a){var n="name-"+a,i=t.name.split(T);return"range"===t.type?l.a.createElement(h.a,{key:a},l.a.createElement(p.a,null,l.a.createElement(c.a,null,l.a.createElement(s.a,{md:6},l.a.createElement(k.a,{className:"mb-2"},l.a.createElement(b.a,{addonType:"prepend"},l.a.createElement(f.a,{color:"primary",type:"button"},"Code")),l.a.createElement(u.a,{type:"text",className:"font-italic",style:{width:150},name:"code-"+a,value:t.code?t.code:"",onChange:e.handleRiskParticularCodeChange,placeholder:"Enter Risk Particular Code",required:!0})),i.map((function(t,r){return l.a.createElement(k.a,{className:"mb-2",key:r},l.a.createElement(u.a,{required:!0,className:t?"font-weight-bold":"",key:"riskParticularName"+a,name:n,value:t,placeholder:"Detail of Error",onChange:function(e){return E(r,n,e.target.value,i)}}),l.a.createElement(b.a,{addonType:"append"},l.a.createElement(f.a,{type:"button",color:"danger",onClick:function(){return function(t,a,r){var n={target:{name:a}};r=r.filter((function(e,a){return a===t?0:1})),n.target.value=r.join(T),e.handleRiskParticularNameChange(n)}(r,n,i)}},l.a.createElement("i",{className:"fa fa-trash"}))))})),l.a.createElement(f.a,{className:"text-white",color:"warning",size:"sm",onClick:function(){E(null,n,"",i)}},"+")),l.a.createElement(s.a,null),l.a.createElement(s.a,{md:4},l.a.createElement(c.a,null,l.a.createElement(u.a,{value:t.baseUnitId,onChange:e.handleRiskParticularNameChange,name:"baseUnitId-"+a,type:"select"},e.baseUnits.map((function(e){return l.a.createElement("option",{key:e.id,value:e.id},e.type)})))),l.a.createElement(c.a,{className:"justify-content-end"},l.a.createElement(f.a,{className:"text-white btn-sm m-1",color:"info",onClick:function(){o[a]=!o[a],d(Object(r.a)({},o))}},l.a.createElement("i",{className:"fa fa-bars"})),l.a.createElement(f.a,{size:"sm",className:"text-white btn-sm m-1",color:"danger",onClick:function(){e.deleteRiskParticularTable("range",a)}},l.a.createElement("i",{className:"fa fa-trash"})))))),l.a.createElement(R.a,{isOpen:o[a]},l.a.createElement(g.a,null,l.a.createElement(m,{key:"riskRule"+a,index:a,likelihoods:e.likelihoods,impacts:e.impacts,riskParticular:t,onChange:e.handleChangeRiskRule})))):null})),l.a.createElement(c.a,{className:"mb-2"},l.a.createElement(s.a,{xs:5},l.a.createElement(u.a,{type:"select",id:"type",disabled:e.instanceVisible},l.a.createElement("option",{value:"range"},"Range"),e.instanceVisible?null:l.a.createElement("option",{value:"instance"},"Instance"))),l.a.createElement(s.a,{xs:4},l.a.createElement(f.a,{color:"info",className:"text-white",onClick:e.addRiskAreaParticularTable},"+"))),l.a.createElement(R.a,{isOpen:e.instanceVisible},l.a.createElement(v,{deleteRiskParticularTable:e.deleteRiskParticularTable,key:j.id,likelihoods:e.likelihoods,impacts:e.impacts,onChange:e.handleChangeRiskRule,handleRiskParticularNameChange:e.handleRiskParticularNameChange,handleRiskParticularCodeChange:e.handleRiskParticularCodeChange,handleAddImpact:e.handleAddImpact,riskAreaId:I.id,riskInstanceRules:O,riskParticulars:j})),l.a.createElement("hr",null),l.a.createElement(A,{key:P.id,riskTriggers:P,handleTriggerChange:e.handleTriggerChange,addRiskTrigger:e.addRiskTrigger,deleteRiskTrigger:e.deleteRiskTrigger}),l.a.createElement("hr",null),l.a.createElement(C,{riskTracedBy:L,handleRiskTracedByChange:e.handleRiskTracedByChange,addRiskTracedBy:e.addRiskTracedBy,deleteRiskTracedBy:e.deleteRiskTracedBy})):null))))}},898:function(e,t,a){"use strict";a.r(t);var r=a(544),n=a(545),i=a(85),l=a(86),c=a(88),s=a(87),o=a(89),u=a(2),d=a.n(u),m=a(547),h=a(561),p=a(616),f=a(562),g=function(e){function t(){var e,a;Object(i.a)(this,t);for(var l=arguments.length,o=new Array(l),u=0;u<l;u++)o[u]=arguments[u];return(a=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={id:null,riskArea:{},isEdit:!0,likelihoods:[],impacts:[],baseUnits:[]},a.handleSubmit=function(e){e.preventDefault(),document.getElementById("submit-button-risk-area-form").disabled=!0;var t=a.state.riskArea;Object(h.c)(t,(function(e,t){e||window.location.reload()}))},a.handleRiskAreaChange=function(e){var t=a.state.riskArea;t[e.target.name]=e.target.value,a.setState({riskArea:t})},a.handleChangeRiskRule=function(e){var t=a.state.riskArea,r=e.target.name,i=String(e.target.value).split(",").join(""),l=r.split("-"),c=Object(n.a)(l,5),s=c[0],o=c[1],u=c[2],d=c[3],m=c[4];if("range"===s&&(t.risk_area_particulars=t.risk_area_particulars.map((function(e,t){var a=e;if(t===Number(o))if("likelihood"===u){var r=!1;a.risk_area_likelihood_rules=a.risk_area_likelihood_rules.map((function(e){var t=e;return Number(t.likelihoodId)===Number(m)&&(r=!0,"lower"===d?t.lowerLimit=i:"upper"===d&&(t.upperLimit=i)),t})),r||a.risk_area_likelihood_rules.push({riskAreaParticularId:Number(a.id),likelihoodId:m,lowerLimit:"lower"===d?i:null,upperLimit:"upper"===d?i:null})}else if("impact"===u){var n=!1;a.risk_area_impact_rules=a.risk_area_impact_rules.map((function(e){return Number(e.impactId)===Number(m)&&(n=!0,"lower"===d?e.lowerLimit=i:"upper"===d&&(e.upperLimit=i)),e})),n||a.risk_area_impact_rules.push({riskAreaParticularId:Number(a.id),impactId:m,lowerLimit:"lower"===d?i:null,upperLimit:"upper"===d?i:null})}return a}))),"instance"===s){var h=!1;t.risk_area_likelihood_instance_rules=t.risk_area_likelihood_instance_rules.map((function(e){return"likelihood"===u&&e.likelihoodId===Number(m)&&(h=!0,"lower"===d&&(e.lowerLimit=i),"upper"===d&&(e.upperLimit=i)),e})),h||t.risk_area_likelihood_instance_rules.push({riskAreaId:Number(t.id),likelihoodId:Number(m),lowerLimit:"lower"===d?i:null,upperLimit:"upper"===d?i:null})}a.setState({riskArea:t})},a.addRiskAreaParticularTable=function(e){var t=a.state.riskArea,r=document.getElementById("type").value;"range"===r?t.risk_area_particulars.push({name:"",type:"range",riskAreaId:t.id,risk_area_likelihood_rules:[],risk_area_impact_rules:[]}):"instance"===r&&(a.state.instanceVisible?window.alert("You cannot have multiple instance tables"):a.setState({instanceVisible:!0})),a.setState({riskArea:t})},a.deleteRiskParticularTable=function(e,t){var r=a.state.riskArea;"range"===e?r.risk_area_particulars=r.risk_area_particulars.filter((function(e,a){return a===Number(t)?0:1})):"instance"===e&&(r.risk_area_particulars=r.risk_area_particulars.filter((function(t,a){return t.type===e?0:1})),r.risk_area_likelihood_instance_rules=[],a.setState({instanceVisible:!1})),a.setState({riskArea:r})},a.addRiskTracedBy=function(e){e.preventDefault();var t=a.state.riskArea;t.risk_area_traced_bies.push({name:"",riskAreaId:t.id}),a.setState({riskArea:t})},a.deleteRiskTracedBy=function(e){var t=Object(r.a)({},a.state.riskArea),n=t.risk_area_traced_bies;-1!==e&&(n.splice(e,1),a.setState({riskArea:t}))},a.handleRiskTracedByChange=function(e){var t=a.state.riskArea,r=e.target.name,n=e.target.value;t.risk_area_traced_bies=t.risk_area_traced_bies.map((function(e,t){return t===Number(r)&&(e.name=n),e})),a.setState({riskArea:t})},a.addRiskTrigger=function(e){e.preventDefault();var t=a.state.riskArea;t.risk_area_triggers.push({name:"",riskAreaId:t.id}),a.setState({riskArea:t})},a.handleTriggerChange=function(e){var t=a.state.riskArea,r=e.target.name,n=e.target.value;t.risk_area_triggers=t.risk_area_triggers.map((function(e,t){return t===Number(r)&&(e.name=n),e})),a.setState({riskArea:t})},a.deleteRiskTrigger=function(e){var t=a.state.riskArea,r=t.risk_area_triggers;-1!==e&&(r.splice(e,1),t.risk_area_triggers=r,a.setState({riskArea:t}))},a.handleRiskParticularNameChange=function(e){var t=a.state.riskArea,r=e.target.name.split("-"),i=Object(n.a)(r,2),l=i[0],c=i[1],s=e.target.value;t.risk_area_particulars=t.risk_area_particulars.map((function(e,t){return Number(c)===t?(e[l]=s,e):e})),a.setState({riskArea:t})},a.handleRiskParticularCodeChange=function(e){var t=a.state.riskArea,r=e.target.name.split("-"),i=Object(n.a)(r,2)[1],l=e.target.value;t.risk_area_particulars=t.risk_area_particulars.map((function(e,t){return Number(i)===t?(e.code=l,e):e})),a.setState({riskArea:t})},a.handleAddImpact=function(e){var t=a.state.riskArea;t.risk_area_particulars.push({name:"",type:"instance",riskAreaId:t.id,risk_area_likelihood_rules:[],risk_area_impact_rules:[{impactId:Number(e)}]}),a.setState({riskArea:t})},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=Object(f.b)(this.props.match.params.id);Number(t)?(Object(h.e)((function(t,a){t||e.setState(a)})),Object(h.f)(t,(function(t,a){t||e.setState({riskArea:a,instanceVisible:a.risk_area_likelihood_instance_rules.length>0},(function(){Object(m.b)(e.state.riskArea)}))}))):this.props.history.push("/risk-areas")}},{key:"render",value:function(){return d.a.createElement(p.a,Object.assign({title:"Edit Risk Area",formId:"edit-risk-area-form",isEdit:this.state.isEdit,riskArea:this.state.riskArea,handleRiskAreaChange:this.handleRiskAreaChange,handleSubmit:this.handleSubmit,addRiskTracedBy:this.addRiskTracedBy,deleteRiskTracedBy:this.deleteRiskTracedBy,handleRiskTracedByChange:this.handleRiskTracedByChange,addRiskTrigger:this.addRiskTrigger,deleteRiskTrigger:this.deleteRiskTrigger,handleTriggerChange:this.handleTriggerChange,handleRiskParticularNameChange:this.handleRiskParticularNameChange,handleRiskParticularCodeChange:this.handleRiskParticularCodeChange,handleChangeRiskRule:this.handleChangeRiskRule,handleAddImpact:this.handleAddImpact,instanceVisible:this.state.instanceVisible,addRiskAreaParticularTable:this.addRiskAreaParticularTable,deleteRiskParticularTable:this.deleteRiskParticularTable,likelihoods:this.state.likelihoods?this.state.likelihoods:[],impacts:this.state.impacts?this.state.impacts:[],baseUnits:this.state.baseUnits?this.state.baseUnits:[]},this.props))}}]),t}(u.Component);t.default=g}}]);
//# sourceMappingURL=19.7a5745d1.chunk.js.map