(this.webpackJsonporr=this.webpackJsonporr||[]).push([[14],{546:function(e,t,a){"use strict";function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return r}))},549:function(e,t,a){"use strict";var r=a(6),n=a(14),c=a(2),s=a.n(c),o=a(1),u=a.n(o),i=a(18),l=a.n(i),d=a(8),f={tag:d.i,className:u.a.string,cssModule:u.a.object},p=function(e){var t=e.className,a=e.cssModule,c=e.tag,o=Object(n.a)(e,["className","cssModule","tag"]),u=Object(d.f)(l()(t,"card-header"),a);return s.a.createElement(c,Object(r.a)({},o,{className:u}))};p.propTypes=f,p.defaultProps={tag:"div"},t.a=p},550:function(e,t,a){"use strict";a.d(t,"e",(function(){return O})),a.d(t,"f",(function(){return j})),a.d(t,"g",(function(){return w})),a.d(t,"b",(function(){return d})),a.d(t,"d",(function(){return f})),a.d(t,"l",(function(){return p})),a.d(t,"a",(function(){return v})),a.d(t,"c",(function(){return y})),a.d(t,"k",(function(){return E})),a.d(t,"j",(function(){return k})),a.d(t,"m",(function(){return x})),a.d(t,"i",(function(){return g})),a.d(t,"h",(function(){return h}));var r=a(544),n=a(543),c=a.n(n),s=a(54),o="/report",u="/risk-register-all",i="/audit-log",l=a(554),d=l.branchSummary,f=l.downloadBranchSummary,p=l.saveBranchSummary,m=a(555),g=m.getRiskTriggers,h=m.getRiskTriggerData,b=a(556),v=b.branchCategorization,y=b.downloadBranchCategorization,E=b.saveBranchCategorization,k=a(557).hoSummary;function w(e){var t;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(s.server.get("".concat(o,"/report-outputs"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function O(e){var t;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(s.server.get("".concat(u),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function j(e){s.server.get("".concat(i)).then((function(t){return e(null,t.data)})).catch((function(e){console.error("Error getting data from all risk Register!")}))}function x(e,t){var a;return c.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.a.awrap(s.server.post("".concat(o,"/grading"),Object(r.a)({},t,{data:e})));case 2:return a=n.sent,n.abrupt("return",a.data);case 4:case"end":return n.stop()}}))}},552:function(e,t,a){"use strict";var r=a(6),n=a(14),c=a(2),s=a.n(c),o=a(1),u=a.n(o),i=a(18),l=a.n(i),d=a(8),f={tag:d.i,className:u.a.string,cssModule:u.a.object},p=function(e){var t=e.className,a=e.cssModule,c=e.tag,o=Object(n.a)(e,["className","cssModule","tag"]),u=Object(d.f)(l()(t,"card-footer"),a);return s.a.createElement(c,Object(r.a)({},o,{className:u}))};p.propTypes=f,p.defaultProps={tag:"div"},t.a=p},554:function(e,t,a){"use strict";a.r(t),a.d(t,"branchSummary",(function(){return o})),a.d(t,"downloadBranchSummary",(function(){return u})),a.d(t,"saveBranchSummary",(function(){return i}));var r=a(543),n=a.n(r),c=a(54),s="/report";function o(e){var t;return n.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.awrap(c.server.get("".concat(s,"/branch-summary"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function u(e){var t;return n.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.awrap(c.server.post("".concat(s,"/branch-summary/download"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function i(e){var t;return n.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.awrap(c.server.post("".concat(s,"/branch-summary/save"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},555:function(e,t,a){"use strict";a.r(t),a.d(t,"getRiskTriggers",(function(){return i})),a.d(t,"getRiskTriggerData",(function(){return u}));var r=a(543),n=a.n(r),c=a(54),s="report/risk-trigger",o="report/risk-trigger/data";function u(e){return n.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",c.server.get("".concat(o),{params:e}));case 1:case"end":return t.stop()}}))}function i(e){c.server.get("".concat(s)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}},556:function(e,t,a){"use strict";a.r(t),a.d(t,"branchCategorization",(function(){return o})),a.d(t,"downloadBranchCategorization",(function(){return u})),a.d(t,"saveBranchCategorization",(function(){return i}));var r=a(543),n=a.n(r),c=a(54),s="/report";function o(e){var t;return n.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.awrap(c.server.get("".concat(s,"/branch-categorization"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function u(e){var t;return n.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.awrap(c.server.post("".concat(s,"/branch-categorization/download"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function i(e){var t;return n.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.awrap(c.server.post("".concat(s,"/branch-categorization/save"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},557:function(e,t,a){"use strict";a.r(t),a.d(t,"hoSummary",(function(){return o}));var r=a(543),n=a.n(r),c=a(54),s="/report";function o(e){var t;return n.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.awrap(c.server.get("".concat(s,"/ho-summary"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},558:function(e,t,a){"use strict";var r=a(6),n=a(14),c=a(2),s=a.n(c),o=a(1),u=a.n(o),i=a(18),l=a.n(i),d=a(8),f={className:u.a.string,cssModule:u.a.object,size:u.a.string,bordered:u.a.bool,borderless:u.a.bool,striped:u.a.bool,dark:u.a.bool,hover:u.a.bool,responsive:u.a.oneOfType([u.a.bool,u.a.string]),tag:d.i,responsiveTag:d.i,innerRef:u.a.oneOfType([u.a.func,u.a.string,u.a.object])},p=function(e){var t=e.className,a=e.cssModule,c=e.size,o=e.bordered,u=e.borderless,i=e.striped,f=e.dark,p=e.hover,m=e.responsive,g=e.tag,h=e.responsiveTag,b=e.innerRef,v=Object(n.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),y=Object(d.f)(l()(t,"table",!!c&&"table-"+c,!!o&&"table-bordered",!!u&&"table-borderless",!!i&&"table-striped",!!f&&"table-dark",!!p&&"table-hover"),a),E=s.a.createElement(g,Object(r.a)({},v,{ref:b,className:y}));if(m){var k=Object(d.f)(!0===m?"table-responsive":"table-responsive-"+m,a);return s.a.createElement(h,{className:k},E)}return E};p.propTypes=f,p.defaultProps={tag:"table",responsiveTag:"div"},t.a=p},568:function(e,t,a){"use strict";a.d(t,"h",(function(){return d})),a.d(t,"e",(function(){return m})),a.d(t,"g",(function(){return f})),a.d(t,"f",(function(){return l})),a.d(t,"b",(function(){return s})),a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return i}));var r=a(548).bs2ad,n=a(548).ad2bs,c=a(559),s="/04/01",o="/07/01",u="/10/01",i="/01/01",l=function(e){var t=e.year,a=e.month,r=e.day;return c(t+" "+a+" "+r,"YYYY MM DD").format("YYYY-MM-DD")},d=function(){var e=n(c().format("YYYY/MM/DD")),t=e.en.year,a=p(e);return l(r(t+a))},f=function(e){var t=n(c(e).format("YYYY/MM/DD"));return p(t)},p=function(e){var t=e.en.month;return t>=10?u:t>=7?o:t>=4?s:i},m=function(e){return n(c(e).format("YYYY/MM/DD")).en}},569:function(e,t,a){"use strict";var r=a(6),n=a(14),c=a(2),s=a.n(c),o=a(1),u=a.n(o),i=a(18),l=a.n(i),d=a(8),f={children:u.a.node,row:u.a.bool,check:u.a.bool,inline:u.a.bool,disabled:u.a.bool,tag:d.i,className:u.a.string,cssModule:u.a.object},p=function(e){var t=e.className,a=e.cssModule,c=e.row,o=e.disabled,u=e.check,i=e.inline,f=e.tag,p=Object(n.a)(e,["className","cssModule","row","disabled","check","inline","tag"]),m=Object(d.f)(l()(t,!!c&&"row",u?"form-check":"form-group",!(!u||!i)&&"form-check-inline",!(!u||!o)&&"disabled"),a);return"fieldset"===f&&(p.disabled=o),s.a.createElement(f,Object(r.a)({},p,{className:m}))};p.propTypes=f,p.defaultProps={tag:"div"},t.a=p},607:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=607},610:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return u}));var r=a(54),n="/branches",c="/provinces";function s(e){r.server.get("".concat(n)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function o(e){r.server.get("".concat(c)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}function u(e,t){r.server.put("".concat(n),e).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}},899:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var r=a(543),n=a.n(r),c=a(544),s=a(85),o=a(86),u=a(88),i=a(87),l=a(89),d=a(2),f=a.n(d),p=a(550),m=a(610),g=a(537),h=a(549),b=a(538),v=a(534),y=a(535),E=a(560),k=a(540),w=a(541),O=a(542),j=a(569),x=a(558),N=a(552),D=a(532),S=a(568),T=a(548),M=a(581),Y=a.n(M),C=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={options:{branchId:"",riskTrigger:"Staff Negligence",startDate:Object(S.h)()},riskTriggerData:[],riskTriggers:[],branches:[]},a.handleChange=function(e){var t,r;return n.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return t=e.target,(r=Object(c.a)({},a.state.options))[t.name]=t.value,s.next=5,n.a.awrap(a.setState({options:r}));case 5:return s.next=7,n.a.awrap(Object(p.h)(a.state.options).then((function(e){var t=e.data;a.setState({riskTriggerData:t})})).catch((function(e){})));case 7:case"end":return s.stop()}}))},a.handleDateChange=function(e){var t,r,c,s,o,u;return n.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:t=e.target.value,r=null,i.t0=e.target.name,i.next="quarter"===i.t0?5:"year"===i.t0?8:10;break;case 5:return c=Object(S.e)(a.state.options.startDate).year,r=c+t,i.abrupt("break",11);case 8:return 4===t.length&&(s=Object(S.g)(a.state.options.startDate),r=t+s),i.abrupt("break",11);case 10:return i.abrupt("break",11);case 11:return o=r?Object(S.f)(Object(T.bs2ad)(r)):a.state.options.startDate,(u=a.state.options).startDate=o,i.next=16,n.a.awrap(a.setState({options:u}));case 16:return i.next=18,n.a.awrap(Object(p.h)(a.state.options).then((function(e){var t=e.data;a.setState({riskTriggerData:t})})).catch((function(e){})));case 18:case"end":return i.stop()}}))},a.downloadReport=function(){Y.a.convert(document.getElementById("risk-trigger"),{name:"risk-trigger.xlsx"})},a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(p.h)(this.state.options).then((function(t){var a=t.data;e.setState({riskTriggerData:a})})).catch((function(e){})),Object(p.i)((function(t,a){t&&alert("some error occurred!"),e.setState({riskTriggers:a})})),Object(m.b)((function(t,a){t&&alert("some error occurred!"),e.setState({branches:a})}))}},{key:"render",value:function(){var e=this.state,t=e.riskTriggerData,a=e.riskTriggers,r=e.branches,n=this.props.permissions;return f.a.createElement(f.a.Fragment,null,f.a.createElement(g.a,null,f.a.createElement(h.a,null),f.a.createElement(b.a,null,f.a.createElement(v.a,null,f.a.createElement(y.a,{md:4},f.a.createElement(E.a,null,"Quarter Start Date (YYYY/MM/DD)"),f.a.createElement(k.a,{className:"mb-2"},f.a.createElement(w.a,{addonType:"prepend"},f.a.createElement(O.a,{onChange:this.handleDateChange,value:Object(S.g)(this.state.options.startDate),type:"select",name:"quarter",className:"font-italic"},f.a.createElement("option",{value:""},"Select Quarter"),f.a.createElement("option",{value:S.b},"First Quarter"),f.a.createElement("option",{value:S.d},"Second Quarter"),f.a.createElement("option",{value:S.c},"Third Quarter"),f.a.createElement("option",{value:S.a},"Fourth Quarter"))),f.a.createElement(O.a,{type:"number",maxLength:"4",minLength:"4",className:"font-italic",placeholder:"Year",name:"year",onChange:this.handleDateChange,value:Object(S.e)(this.state.options.startDate).year}))),f.a.createElement(y.a,null," ",f.a.createElement(j.a,null,f.a.createElement(E.a,{for:"trigger"},"Risk Trigger"),f.a.createElement(O.a,{type:"select",name:"riskTrigger",id:"trigger",onChange:this.handleChange},f.a.createElement("option",{value:""},"---Please Select ---"),a.map((function(e,t){return f.a.createElement("option",{key:t},e.name)}))))),f.a.createElement(y.a,null,n.isApprover||n.isAdmin?f.a.createElement(j.a,null,f.a.createElement(E.a,{for:"branches"},"Branch"),f.a.createElement(O.a,{type:"select",name:"branchId",id:"branches",onChange:this.handleChange},f.a.createElement("option",{value:""},"---Your Branch---"),r.map((function(e){return f.a.createElement("option",{key:e.id,value:e.id},e.name)})))):"")),f.a.createElement(x.a,{bordered:!0,striped:!0,id:"risk-trigger"},f.a.createElement("thead",null,f.a.createElement("tr",null,f.a.createElement("th",{rowSpan:"2",className:"text-center"},"Particular"," "),f.a.createElement("th",{colSpan:"2",className:"text-center"}," ","Related Staffs"),f.a.createElement("th",{rowSpan:"2",className:"text-center"},"Remarks")),f.a.createElement("tr",null,f.a.createElement("th",{className:"text-center"},"Inputer"),f.a.createElement("th",{className:"text-center"},"Authorizer"))),f.a.createElement("tbody",null,t.map((function(e){var t=e.relatedStaff.split("/");return f.a.createElement("tr",{key:e.riskAreaParticular+e.remarks},f.a.createElement("td",null,e.riskAreaParticular),f.a.createElement("td",null,t[0]?t[0]:""),f.a.createElement("td",null,t[1]?t[1]:""),f.a.createElement("td",null,e.remarks))}))))),f.a.createElement(N.a,null,f.a.createElement(D.a,{className:"mx-2",color:"info",onClick:this.downloadReport},f.a.createElement("i",{className:"fa fa-download text-white"})))))}}]),t}(d.Component)}}]);
//# sourceMappingURL=14.17e72edd.chunk.js.map