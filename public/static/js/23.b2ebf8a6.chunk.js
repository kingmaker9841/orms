(this.webpackJsonporr=this.webpackJsonporr||[]).push([[23],{550:function(e,t,a){"use strict";a.d(t,"e",(function(){return k})),a.d(t,"f",(function(){return O})),a.d(t,"g",(function(){return S})),a.d(t,"b",(function(){return m})),a.d(t,"d",(function(){return d})),a.d(t,"l",(function(){return f})),a.d(t,"a",(function(){return v})),a.d(t,"c",(function(){return g})),a.d(t,"k",(function(){return y})),a.d(t,"j",(function(){return w})),a.d(t,"m",(function(){return x})),a.d(t,"i",(function(){return h})),a.d(t,"h",(function(){return b}));var n=a(544),r=a(543),c=a.n(r),o=a(54),u="/report",s="/risk-register-all",l="/audit-log",i=a(554),m=i.branchSummary,d=i.downloadBranchSummary,f=i.saveBranchSummary,p=a(555),h=p.getRiskTriggers,b=p.getRiskTriggerData,E=a(556),v=E.branchCategorization,g=E.downloadBranchCategorization,y=E.saveBranchCategorization,w=a(557).hoSummary;function S(e){var t;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(o.server.get("".concat(u,"/report-outputs"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function k(e){var t;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(o.server.get("".concat(s),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function O(e){o.server.get("".concat(l)).then((function(t){return e(null,t.data)})).catch((function(e){console.error("Error getting data from all risk Register!")}))}function x(e,t){var a;return c.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,c.a.awrap(o.server.post("".concat(u,"/grading"),Object(n.a)({},t,{data:e})));case 2:return a=r.sent,r.abrupt("return",a.data);case 4:case"end":return r.stop()}}))}},554:function(e,t,a){"use strict";a.r(t),a.d(t,"branchSummary",(function(){return u})),a.d(t,"downloadBranchSummary",(function(){return s})),a.d(t,"saveBranchSummary",(function(){return l}));var n=a(543),r=a.n(n),c=a(54),o="/report";function u(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.get("".concat(o,"/branch-summary"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function s(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(o,"/branch-summary/download"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function l(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(o,"/branch-summary/save"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},555:function(e,t,a){"use strict";a.r(t),a.d(t,"getRiskTriggers",(function(){return l})),a.d(t,"getRiskTriggerData",(function(){return s}));var n=a(543),r=a.n(n),c=a(54),o="report/risk-trigger",u="report/risk-trigger/data";function s(e){return r.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",c.server.get("".concat(u),{params:e}));case 1:case"end":return t.stop()}}))}function l(e){c.server.get("".concat(o)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}},556:function(e,t,a){"use strict";a.r(t),a.d(t,"branchCategorization",(function(){return u})),a.d(t,"downloadBranchCategorization",(function(){return s})),a.d(t,"saveBranchCategorization",(function(){return l}));var n=a(543),r=a.n(n),c=a(54),o="/report";function u(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.get("".concat(o,"/branch-categorization"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function s(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(o,"/branch-categorization/download"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function l(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(o,"/branch-categorization/save"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},557:function(e,t,a){"use strict";a.r(t),a.d(t,"hoSummary",(function(){return u}));var n=a(543),r=a.n(n),c=a(54),o="/report";function u(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.get("".concat(o,"/ho-summary"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},568:function(e,t,a){"use strict";a.d(t,"h",(function(){return m})),a.d(t,"e",(function(){return p})),a.d(t,"g",(function(){return d})),a.d(t,"f",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return u})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return l}));var n=a(548).bs2ad,r=a(548).ad2bs,c=a(559),o="/04/01",u="/07/01",s="/10/01",l="/01/01",i=function(e){var t=e.year,a=e.month,n=e.day;return c(t+" "+a+" "+n,"YYYY MM DD").format("YYYY-MM-DD")},m=function(){var e=r(c().format("YYYY/MM/DD")),t=e.en.year,a=f(e);return i(n(t+a))},d=function(e){var t=r(c(e).format("YYYY/MM/DD"));return f(t)},f=function(e){var t=e.en.month;return t>=10?s:t>=7?u:t>=4?o:l},p=function(e){return r(c(e).format("YYYY/MM/DD")).en}},607:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=607},906:function(e,t,a){"use strict";a.r(t);var n=a(543),r=a.n(n),c=a(85),o=a(86),u=a(88),s=a(87),l=a(89),i=a(2),m=a.n(i),d=a(537),f=a(549),p=a(538),h=a(558),b=a(552),E=a(532),v=a(784),g=a(581),y=a.n(g),w=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).downloadReport=function(){y.a.convert(document.getElementById("ho-summary"),{name:"ho-summary.xlsx"})},a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return m.a.createElement(d.a,null,m.a.createElement(f.a,null,"HO SUMMARY"),m.a.createElement(p.a,null,m.a.createElement(h.a,{responsive:!0,bordered:!0,id:"ho-summary"},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",{"data-f-bold":!0,rowSpan:"3"},"S.N."),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"3"},"Risk Area/Functions"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"3"},"Previous Risk Score (A)"),m.a.createElement("th",{"data-f-bold":!0,colSpan:"3"},"Estimated Risk (SrBL)"),m.a.createElement("th",{"data-f-bold":!0,colSpan:"5"},"Register Summary"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"3"},"Actual Risk Score (C)"),m.a.createElement("th",{"data-f-bold":!0,colSpan:"2"},"Variance"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"3"},"Remarks")),m.a.createElement("tr",null,m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Likelihood"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Impact"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Risk Score (B)"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"R. Number"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Occurrence"),m.a.createElement("th",{"data-f-bold":!0,colSpan:"3"},"Consequence"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2",className:"text-nowrap"},"(A - C)"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2",className:"text-nowrap"},"(B - C)")),m.a.createElement("tr",null,m.a.createElement("th",{"data-f-bold":!0},"Amount/Timing"),m.a.createElement("th",{"data-f-bold":!0},"Financial Impact"),m.a.createElement("th",{"data-f-bold":!0},"Non Financial Impact"))),m.a.createElement("tbody",null,this.props.hoSummary.map((function(e,t){return m.a.createElement("tr",{key:t},m.a.createElement("td",null,t+1),m.a.createElement("td",null,e.riskAreaName),m.a.createElement("td",null,e.previousRiskScore),m.a.createElement("td",null,e.estLikelihood),m.a.createElement("td",null,e.estImpact),m.a.createElement("td",null,Object(v.Number)(e.estLikelihood)*Object(v.Number)(e.estImpact)),m.a.createElement("td",null,e.riskAreaCode),m.a.createElement("td",null,e.occurrence),m.a.createElement("td",null,e.amountTiming),m.a.createElement("td",null,e.financialImpact),m.a.createElement("td",null),m.a.createElement("td",null,e.actualRiskScore),m.a.createElement("td",null,Object(v.Number)(e.previousRiskScore)-Object(v.Number)(e.actualRiskScore)),m.a.createElement("td",null,Object(v.Number)(e.estLikelihood)*Object(v.Number)(e.estImpact)-Object(v.Number)(e.actualRiskScore)),m.a.createElement("td",null))}))))),m.a.createElement(b.a,null,m.a.createElement(E.a,{className:"mx-2",color:"info",onClick:this.downloadReport},m.a.createElement("i",{className:"fa fa-download text-white"}))))}}]),t}(m.a.Component),S=a(550),k=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).downloadReport=function(){y.a.convert(document.getElementById("function-grading"),{name:"function-grading.xlsx"})},a.saveReport=function(){var e=a.props.hoSummary.map((function(e,t){return{}}));Object(S.m)(e,{startDate:a.props.startDate,type:"function"}).then((function(e){window.alert(e)})).catch((function(){window.alert("Oops! Error occurred")}))},a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return m.a.createElement(d.a,null,m.a.createElement(f.a,null,"Function Wise Grading"),m.a.createElement(p.a,null,m.a.createElement(h.a,{responsive:!0,bordered:!0,id:"function-grading"},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"S.N."),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Risk Area/Functions"),m.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Estimated"),m.a.createElement("th",{"data-f-bold":!0,colSpan:"2",className:"text-center"},"Actual")),m.a.createElement("tr",null,m.a.createElement("th",{"data-f-bold":!0},"Previous Quarter"),m.a.createElement("th",{"data-f-bold":!0},"This Quarter"))),m.a.createElement("tbody",null,this.props.hoSummary.map((function(e,t){return m.a.createElement("tr",{key:t},m.a.createElement("td",null,t+1),m.a.createElement("td",null,e.riskAreaName),m.a.createElement("td",null,e.estimatedCategory),m.a.createElement("td",null,e.previousCategory),m.a.createElement("td",null,e.actualCategory))}))))),m.a.createElement(b.a,null,m.a.createElement(E.a,{className:"mx-2",color:"info",onClick:this.downloadReport},m.a.createElement("i",{className:"fa fa-download text-white"}))))}}]),t}(m.a.Component),O=a(534),x=a(535),j=a(560),D=a(540),N=a(541),Y=a(542),C=a(568),R=a(548);a.d(t,"default",(function(){return M}));var M=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={hoSummary:[],options:{frequency:"3",status:"Approved",startDate:Object(C.h)()}},a.handleDateChange=function(e){var t,n,c,o,u,s;return r.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:t=e.target.value,n=null,l.t0=e.target.name,l.next="quarter"===l.t0?5:"year"===l.t0?8:10;break;case 5:return c=Object(C.e)(a.state.options.startDate).year,n=c+t,l.abrupt("break",11);case 8:return 4===t.length&&(o=Object(C.g)(a.state.options.startDate),n=t+o),l.abrupt("break",11);case 10:return l.abrupt("break",11);case 11:return u=n?Object(C.f)(Object(R.bs2ad)(n)):a.state.options.startDate,(s=a.state.options).startDate=u,l.next=16,r.a.awrap(a.setState({options:s}));case 16:return l.next=18,r.a.awrap(Object(S.j)(a.state.options).then((function(e){var t=e.hoSummary;a.setState({hoSummary:t})})).catch((function(e){})));case 18:case"end":return l.stop()}}))},a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(S.j)(this.state.options).then((function(t){e.setState(t)})).catch((function(e){}))}},{key:"render",value:function(){return m.a.createElement("div",{className:"animate fadeIn"},m.a.createElement(O.a,null,m.a.createElement(x.a,null),m.a.createElement(x.a,{md:4},m.a.createElement(j.a,null,"Quarter Start Date (YYYY/MM/DD)"),m.a.createElement(D.a,{className:"mb-2"},m.a.createElement(N.a,{addonType:"prepend"},m.a.createElement(Y.a,{onChange:this.handleDateChange,value:Object(C.g)(this.state.options.startDate),type:"select",name:"quarter",className:"font-italic"},m.a.createElement("option",{value:""},"Select Quarter"),m.a.createElement("option",{value:C.b},"First Quarter"),m.a.createElement("option",{value:C.d},"Second Quarter"),m.a.createElement("option",{value:C.c},"Third Quarter"),m.a.createElement("option",{value:C.a},"Fourth Quarter"))),m.a.createElement(Y.a,{type:"number",maxLength:"4",minLength:"4",className:"font-italic",placeholder:"Year",name:"year",onChange:this.handleDateChange,value:Object(C.e)(this.state.options.startDate).year})))),m.a.createElement(w,{hoSummary:this.state.hoSummary}),m.a.createElement(k,{hoSummary:this.state.hoSummary}))}}]),t}(m.a.Component)}}]);
//# sourceMappingURL=23.b2ebf8a6.chunk.js.map