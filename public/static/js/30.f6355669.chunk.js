(this.webpackJsonporr=this.webpackJsonporr||[]).push([[30],{549:function(e,t,n){"use strict";var r=n(6),a=n(14),i=n(2),s=n.n(i),o=n(1),c=n.n(o),l=n(18),u=n.n(l),h=n(8),f={tag:h.i,className:c.a.string,cssModule:c.a.object},d=function(e){var t=e.className,n=e.cssModule,i=e.tag,o=Object(a.a)(e,["className","cssModule","tag"]),c=Object(h.f)(u()(t,"card-header"),n);return s.a.createElement(i,Object(r.a)({},o,{className:c}))};d.propTypes=f,d.defaultProps={tag:"div"},t.a=d},558:function(e,t,n){"use strict";var r=n(6),a=n(14),i=n(2),s=n.n(i),o=n(1),c=n.n(o),l=n(18),u=n.n(l),h=n(8),f={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:h.i,responsiveTag:h.i,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},d=function(e){var t=e.className,n=e.cssModule,i=e.size,o=e.bordered,c=e.borderless,l=e.striped,f=e.dark,d=e.hover,p=e.responsive,b=e.tag,g=e.responsiveTag,m=e.innerRef,v=Object(a.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),E=Object(h.f)(u()(t,"table",!!i&&"table-"+i,!!o&&"table-bordered",!!c&&"table-borderless",!!l&&"table-striped",!!f&&"table-dark",!!d&&"table-hover"),n),y=s.a.createElement(b,Object(r.a)({},v,{ref:m,className:E}));if(p){var w=Object(h.f)(!0===p?"table-responsive":"table-responsive-"+p,n);return s.a.createElement(g,{className:w},y)}return y};d.propTypes=f,d.defaultProps={tag:"table",responsiveTag:"div"},t.a=d},561:function(e,t,n){"use strict";n.d(t,"e",(function(){return i})),n.d(t,"f",(function(){return c})),n.d(t,"h",(function(){return s})),n.d(t,"g",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return l})),n.d(t,"a",(function(){return h})),n.d(t,"b",(function(){return f}));var r=n(54),a="/risk-areas";function i(e){r.server.get("/likelihood-impact").then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function s(e){r.server.get("".concat(a)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function o(e){r.server.get("".concat(a,"/code")).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function c(e,t){r.server.get("".concat(a,"/").concat(e)).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function l(e,t){r.server.put("".concat(a,"/").concat(e.id),e).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function u(e,t){r.server.put("".concat(a,"/code"),e).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function h(e,t){r.server.post("".concat(a),e).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}function f(e,t){r.server.delete("".concat(a,"/").concat(e)).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}},562:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return i}));var r=new(0,n(563).default)((new Date).toString().slice(0,18),10,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"),a=function(e){return r.encode(e)},i=function(e){return r.decode(e)}},563:function(e,t,n){var r,a,i;"object"==typeof globalThis?globalThis:"object"==typeof self&&self,a=[t],void 0===(i="function"===typeof(r=function(e){"use strict";function t(e){return function(e){if(Array.isArray(e))return e}(e)||r(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function n(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||r(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}e.__esModule=!0,e.unicodeSubstr=e.onlyChars=e.withoutChars=e.keepUniqueChars=e.default=void 0;var a=function(){function e(e,t,r,a){if(void 0===e&&(e=""),void 0===t&&(t=0),void 0===r&&(r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"),void 0===a&&(a="cfhistuCFHISTU"),this.salt=e,this.minLength=t,"number"!=typeof t)throw new TypeError("Hashids: Provided 'minLength' has to be a number (is "+typeof t+")");if("string"!=typeof e)throw new TypeError("Hashids: Provided 'salt' has to be a string (is "+typeof e+")");if("string"!=typeof r)throw new TypeError("Hashids: Provided alphabet has to be a string (is "+typeof r+")");var f=c(r);if(f.length<i)throw new Error("Hashids: alphabet must contain at least "+i+" unique characters, provided: "+f);this.alphabet=l(f,a);var d,b,g=u(a,f);this.seps=p(g,e),(0===n(this.seps).length||n(this.alphabet).length/n(this.seps).length>s)&&(d=Math.ceil(n(this.alphabet).length/s))>n(this.seps).length&&(b=d-n(this.seps).length,this.seps+=h(this.alphabet,0,b),this.alphabet=h(this.alphabet,b)),this.alphabet=p(this.alphabet,e);var m=Math.ceil(n(this.alphabet).length/o);n(this.alphabet).length<3?(this.guards=h(this.seps,0,m),this.seps=h(this.seps,m)):(this.guards=h(this.alphabet,0,m),this.alphabet=h(this.alphabet,m))}var r=e.prototype;return r.encode=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];var i="";return(r=Array.isArray(e)?e:[].concat(n(null!=e?[e]:[]),n(r))).length?(r.every(f)||(r=r.map((function(e){return"bigint"==typeof e||"number"==typeof e?e:E(String(e))}))),r.every(d)?this._encode(r):i):i},r.decode=function(e){return e&&"string"==typeof e&&0!==e.length?this._decode(e):[]},r.encodeHex=function(e){switch(typeof e){case"bigint":e=e.toString(16);break;case"string":if(!/^[0-9a-fA-F]+$/.test(e))return"";break;default:throw new Error("Hashids: The provided value is neither a string, nor a BigInt (got: "+typeof e+")")}var t=y(e,12,(function(e){return parseInt("1"+e,16)}));return this.encode(t)},r.decodeHex=function(e){return this.decode(e).map((function(e){return e.toString(16).slice(1)})).join("")},r._encode=function(e){var t,r=this,a=this.alphabet,i=e.reduce((function(e,t,n){return e+("bigint"==typeof t?Number(t%BigInt(n+100)):t%(n+100))}),0),s=t=n(a)[i%n(a).length],o=n(this.seps),c=n(this.guards);if(e.forEach((function(n,i){var c=s+r.salt+a;a=p(a,h(c,0));var l=b(n,a);if(t+=l,i+1<e.length){var u=l.codePointAt(0)+i,f="bigint"==typeof n?Number(n%BigInt(u)):n%u;t+=o[f%o.length]}})),n(t).length<this.minLength){var l=(i+n(t)[0].codePointAt(0))%c.length;if(n(t=c[l]+t).length<this.minLength){var u=(i+n(t)[2].codePointAt(0))%c.length;t+=c[u]}}for(var f=Math.floor(n(a).length/2);n(t).length<this.minLength;){a=p(a,a);var d=n(t=h(a,f)+t+h(a,0,f)).length-this.minLength;d>0&&(t=h(t,d/2,this.minLength))}return t},r.isValidId=function(e){var t=this;return n(e).every((function(e){return t.alphabet.includes(e)||t.guards.includes(e)||t.seps.includes(e)}))},r._decode=function(e){var r=this;if(!this.isValidId(e))throw new Error("The provided ID ("+e+") is invalid, as it contains characters that do not exist in the alphabet ("+this.guards+this.seps+this.alphabet+")");var a=m(e,(function(e){return r.guards.includes(e)})),i=n(a[3===a.length||2===a.length?1:0]);if(0===i.length)return[];var s=t(i),o=s[0],c=s.slice(1).join(""),l=m(c,(function(e){return r.seps.includes(e)})).reduce((function(e,t){var a=e.result,i=e.lastAlphabet,s=o+r.salt+i,c=p(i,h(s,0,n(i).length));return{result:[].concat(n(a),[g(t,c)]),lastAlphabet:c}}),{result:[],lastAlphabet:this.alphabet}).result;return this._encode(l)!==e?[]:l},e}();e.default=a;var i=16,s=3.5,o=12,c=function(e){return Array.from(new Set(e)).join("")};e.keepUniqueChars=c;var l=function(e,n){var r=t(e).slice(0),a=t(n).slice(0);return r.filter((function(e){return!a.includes(e)})).join("")};e.withoutChars=l;var u=function(e,n){var r=t(e).slice(0),a=t(n).slice(0);return r.filter((function(e){return a.includes(e)})).join("")};e.onlyChars=u;var h=function(e,n,r){return t(e).slice(0).slice(n,void 0===r?void 0:n+r).join("")};e.unicodeSubstr=h;var f=function(e){return"bigint"==typeof e||!Number.isNaN(Number(e))&&Math.floor(Number(e))===e},d=function(e){return"bigint"==typeof e||e>=0&&Number.isSafeInteger(e)};function p(e,r){var a,i=t(r).slice(0);if(!i.length)return e;for(var s=n(e),o=s.length-1,c=0,l=0;o>0;o--,c++){l+=a=i[c%=i.length].codePointAt(0);var u=(a+c+l)%o,h=[s[o],s[u]];s[u]=h[0],s[o]=h[1]}return s.join("")}var b=function(e,n){var r=t(n).slice(0),a="";if("bigint"==typeof e){var i=BigInt(r.length);do{a=r[Number(e%i)]+a,e/=i}while(e>BigInt(0))}else do{a=r[e%r.length]+a,e=Math.floor(e/r.length)}while(e>0);return a},g=function(e,n){var r=t(e).slice(0),a=t(n).slice(0);return r.map((function(e){var t=a.indexOf(e);if(-1===t){var n=r.join(""),i=a.join("");throw new Error("The provided ID ("+n+") is invalid, as it contains characters that do not exist in the alphabet ("+i+")")}return t})).reduce((function(e,t){if("bigint"==typeof e)return e*BigInt(a.length)+BigInt(t);var n=e*a.length+t;if(Number.isSafeInteger(n))return n;if("function"==typeof BigInt)return BigInt(e)*BigInt(a.length)+BigInt(t);throw new Error("Unable to decode the provided string, due to lack of support for BigInt numbers in the current environment")}),0)},m=function(e,r){return t(e).slice(0).reduce((function(e,t){return r(t)?[].concat(n(e),[""]):[].concat(n(e.slice(0,-1)),[e[e.length-1]+t])}),[""])},v=/^\+?[0-9]+$/,E=function(e){return v.test(e)?parseInt(e,10):NaN},y=function(e,t,n){return Array.from({length:Math.ceil(e.length/t)},(function(r,a){return n(e.slice(a*t,(a+1)*t))}))}})?r.apply(t,a):r)||(e.exports=i)},895:function(e,t,n){"use strict";n.r(t);var r=n(85),a=n(86),i=n(88),s=n(87),o=n(89),c=n(2),l=n.n(c),u=n(162),h=n(534),f=n(535),d=n(537),p=n(549),b=n(538),g=n(558),m=n(532),v=n(561),E=n(562),y=n(553),w=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={riskAreas:[]},n.handleDelete=function(e){window.confirm("Do you want to delete the Risk Area? The action is irreversible!")&&Object(v.b)(e,(function(e,t){e||window.location.reload()}))},n}return Object(o.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(v.h)((function(t,n){t||e.setState({riskAreas:n})}))}},{key:"render",value:function(){var e=this,t=this.props.permissions?this.props.permissions:{};return l.a.createElement("div",{className:"animated fadeIn"},t.riskArea===y.VIEW_EDIT||t.riskArea===y.VIEW_EDIT_DELETE||t.isAdmin?l.a.createElement(l.a.Fragment,null,l.a.createElement(u.Link,{className:"btn btn-success btn-sm mb-2",to:"/risk-areas/add"},"Add Risk Area"),l.a.createElement(u.Link,{className:"btn btn-warning btn-sm mb-2 ml-2 text-white",to:"/risk-areas/code"},"Risk Area Codes")):null,l.a.createElement(h.a,null,l.a.createElement(f.a,{xs:"12",lg:"12"},l.a.createElement(d.a,null,l.a.createElement(p.a,null,l.a.createElement("i",{className:"fa fa-layer-group"})," RiskAreas"),l.a.createElement(b.a,{className:"table-responsive"},l.a.createElement(g.a,null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"S.N."),l.a.createElement("th",null,"Name"),l.a.createElement("th",null,"Created"),l.a.createElement("th",null,"Updated"),l.a.createElement("th",null,"Status"),l.a.createElement("th",null))),l.a.createElement("tbody",null,this.state.riskAreas.map((function(n,r){return l.a.createElement("tr",{key:r},l.a.createElement("td",null,r+1),l.a.createElement("td",null,n.name),l.a.createElement("td",null,n.createdAt),l.a.createElement("td",null,n.updatedAt),l.a.createElement("td",null,n.isActive?l.a.createElement("span",{className:"text-white btn btn-sm btn-success"},"Active"):l.a.createElement("span",{className:"text-white btn btn-sm btn-warning"},"Inactive")),l.a.createElement("td",null,t.riskArea===y.VIEW_EDIT||t.riskArea===y.VIEW_EDIT_DELETE||t.isAdmin?l.a.createElement(u.Link,{className:"btn btn-info btn-sm text-white mr-2",to:"/risk-areas/"+Object(E.a)(n.id)},l.a.createElement("i",{className:"fa fa-edit"})):null,t.riskArea===y.VIEW_EDIT_DELETE||t.isAdmin?l.a.createElement(m.a,{size:"sm",color:"danger",onClick:function(){return e.handleDelete(n.id)}},l.a.createElement("i",{className:"fa fa-trash"})):null))})))))))))}}]),t}(c.Component);t.default=w}}]);
//# sourceMappingURL=30.f6355669.chunk.js.map