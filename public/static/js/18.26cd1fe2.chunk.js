(this.webpackJsonporr=this.webpackJsonporr||[]).push([[18],{550:function(e,t,a){"use strict";a.d(t,"e",(function(){return j})),a.d(t,"f",(function(){return T})),a.d(t,"g",(function(){return O})),a.d(t,"b",(function(){return m})),a.d(t,"d",(function(){return p})),a.d(t,"l",(function(){return d})),a.d(t,"a",(function(){return b})),a.d(t,"c",(function(){return E})),a.d(t,"k",(function(){return w})),a.d(t,"j",(function(){return y})),a.d(t,"m",(function(){return D})),a.d(t,"i",(function(){return h})),a.d(t,"h",(function(){return g}));var n=a(544),r=a(543),c=a.n(r),s=a(54),o="/report",i="/risk-register-all",l="/audit-log",u=a(554),m=u.branchSummary,p=u.downloadBranchSummary,d=u.saveBranchSummary,f=a(555),h=f.getRiskTriggers,g=f.getRiskTriggerData,v=a(556),b=v.branchCategorization,E=v.downloadBranchCategorization,w=v.saveBranchCategorization,y=a(557).hoSummary;function O(e){var t;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(s.server.get("".concat(o,"/report-outputs"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function j(e){var t;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.awrap(s.server.get("".concat(i),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function T(e){s.server.get("".concat(l)).then((function(t){return e(null,t.data)})).catch((function(e){console.error("Error getting data from all risk Register!")}))}function D(e,t){var a;return c.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,c.a.awrap(s.server.post("".concat(o,"/grading"),Object(n.a)({},t,{data:e})));case 2:return a=r.sent,r.abrupt("return",a.data);case 4:case"end":return r.stop()}}))}},554:function(e,t,a){"use strict";a.r(t),a.d(t,"branchSummary",(function(){return o})),a.d(t,"downloadBranchSummary",(function(){return i})),a.d(t,"saveBranchSummary",(function(){return l}));var n=a(543),r=a.n(n),c=a(54),s="/report";function o(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.get("".concat(s,"/branch-summary"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function i(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(s,"/branch-summary/download"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function l(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(s,"/branch-summary/save"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},555:function(e,t,a){"use strict";a.r(t),a.d(t,"getRiskTriggers",(function(){return l})),a.d(t,"getRiskTriggerData",(function(){return i}));var n=a(543),r=a.n(n),c=a(54),s="report/risk-trigger",o="report/risk-trigger/data";function i(e){return r.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",c.server.get("".concat(o),{params:e}));case 1:case"end":return t.stop()}}))}function l(e){c.server.get("".concat(s)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}},556:function(e,t,a){"use strict";a.r(t),a.d(t,"branchCategorization",(function(){return o})),a.d(t,"downloadBranchCategorization",(function(){return i})),a.d(t,"saveBranchCategorization",(function(){return l}));var n=a(543),r=a.n(n),c=a(54),s="/report";function o(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.get("".concat(s,"/branch-categorization"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function i(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(s,"/branch-categorization/download"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}function l(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.post("".concat(s,"/branch-categorization/save"),JSON.stringify(e)));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},557:function(e,t,a){"use strict";a.r(t),a.d(t,"hoSummary",(function(){return o}));var n=a(543),r=a.n(n),c=a(54),s="/report";function o(e){var t;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.awrap(c.server.get("".concat(s,"/ho-summary"),{params:e}));case 2:return t=a.sent,a.abrupt("return",t.data);case 4:case"end":return a.stop()}}))}},568:function(e,t,a){"use strict";a.d(t,"h",(function(){return m})),a.d(t,"e",(function(){return f})),a.d(t,"g",(function(){return p})),a.d(t,"f",(function(){return u})),a.d(t,"b",(function(){return s})),a.d(t,"d",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return l}));var n=a(548).bs2ad,r=a(548).ad2bs,c=a(559),s="/04/01",o="/07/01",i="/10/01",l="/01/01",u=function(e){var t=e.year,a=e.month,n=e.day;return c(t+" "+a+" "+n,"YYYY MM DD").format("YYYY-MM-DD")},m=function(){var e=r(c().format("YYYY/MM/DD")),t=e.en.year,a=d(e);return u(n(t+a))},p=function(e){var t=r(c(e).format("YYYY/MM/DD"));return d(t)},d=function(e){var t=e.en.month;return t>=10?i:t>=7?o:t>=4?s:l},f=function(e){return r(c(e).format("YYYY/MM/DD")).en}},580:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(2),r=a.n(n).a.createContext({})},607:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=607},772:function(e,t,a){"use strict";var n=a(6),r=a(31),c=a(2),s=a.n(c),o=a(579),i=a(1),l=a.n(i),u=a(18),m=a.n(u),p=a(580),d=a(8),f={tag:d.i,activeTab:l.a.any,className:l.a.string,cssModule:l.a.object},h=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={activeTab:a.props.activeTab},a}return Object(r.a)(t,e),t.getDerivedStateFromProps=function(e,t){return t.activeTab!==e.activeTab?{activeTab:e.activeTab}:null},t.prototype.render=function(){var e=this.props,t=e.className,a=e.cssModule,r=e.tag,c=Object(d.g)(this.props,Object.keys(f)),o=Object(d.f)(m()("tab-content",t),a);return s.a.createElement(p.a.Provider,{value:{activeTabId:this.state.activeTab}},s.a.createElement(r,Object(n.a)({},c,{className:o})))},t}(c.Component);Object(o.polyfill)(h),t.a=h,h.propTypes=f,h.defaultProps={tag:"div"}},773:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var n=a(6),r=a(14),c=a(2),s=a.n(c),o=a(1),i=a.n(o),l=a(18),u=a.n(l),m=a(580),p=a(8),d={tag:p.i,className:i.a.string,cssModule:i.a.object,tabId:i.a.any};function f(e){var t=e.className,a=e.cssModule,c=e.tabId,o=e.tag,i=Object(r.a)(e,["className","cssModule","tabId","tag"]),l=function(e){return Object(p.f)(u()("tab-pane",t,{active:c===e}),a)};return s.a.createElement(m.a.Consumer,null,(function(e){var t=e.activeTabId;return s.a.createElement(o,Object(n.a)({},i,{className:l(t)}))}))}f.propTypes=d,f.defaultProps={tag:"div"}},904:function(e,t,a){"use strict";a.r(t);var n=a(85),r=a(86),c=a(88),s=a(87),o=a(89),i=a(2),l=a.n(i),u=a(558),m=a(537),p=a(549),d=a(534),f=a(535),h=a(532),g=a(884),v=a(538),b=a(877),E=a(875),w=a(876),y=a(772),O=a(773),j=a(552),T=a(18),D=a.n(T),N=a(550),x=function(e){var t=e.data;return l.a.createElement(u.a,{responsive:!0,bordered:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"S.N."),l.a.createElement("th",null,"Branch Name"),t.map((function(e,t){return e.categorizationArr.map((function(e,a){return l.a.createElement("th",{key:t},a+1)}))})),l.a.createElement("th",null,"Initial"),l.a.createElement("th",null,"Screening"),l.a.createElement("th",null,"Result"),l.a.createElement("th",null,"Final"))),l.a.createElement("tbody",null,t.map((function(e,t){return l.a.createElement("tr",{key:e.id},l.a.createElement("td",null,t+1),l.a.createElement("td",null,e.name),e.categorizationArr.map((function(e,t){return l.a.createElement("td",{key:t},e.name)})),l.a.createElement("td",null,e.initial?e.initial.name:""),l.a.createElement("td",null,e.screening?e.screening.name:""),l.a.createElement("td",null,e.result?e.result.name:""),l.a.createElement("td",null,e.final?e.final.name:""))}))))},C=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).downloadReport=function(){Object(N.c)({actual:a.props.actual,previous:a.props.previous,estimated:a.props.estimated,startDate:a.props.startDate}).then((function(e){var t=e.path;window.open("/api"+"/".concat(t))})).catch((function(){}))},a.saveReport=function(){window.confirm("Do you want to save this report?")&&Object(N.k)({actual:a.props.actual,previous:a.props.previous,estimated:a.props.estimated,startDate:a.props.startDate}).then((function(e){window.alert(e.message)})).catch((function(){}))},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement(m.a,null,l.a.createElement(p.a,null,l.a.createElement(d.a,null,l.a.createElement(f.a,null,"Branch Categorization"),l.a.createElement(f.a,null,l.a.createElement(h.a,{onClick:function(){return e.props.toggleCollapse("first")},className:"float-right text-white",size:"sm",color:"info"},l.a.createElement("i",{className:"fa fa-bars"}))))),l.a.createElement(g.a,{isOpen:this.props.isOpen.first},l.a.createElement(v.a,null,l.a.createElement(b.a,{tabs:!0},l.a.createElement(E.a,null,l.a.createElement(w.a,{className:D()({active:"1"===this.props.activeTab.first}),onClick:function(){e.props.toggleTab("1","first")}},"Actual Risk Score")),l.a.createElement(E.a,null,l.a.createElement(w.a,{className:D()({active:"2"===this.props.activeTab.first}),onClick:function(){e.props.toggleTab("2","first")}},"Previous Risk Score")),l.a.createElement(E.a,null,l.a.createElement(w.a,{className:D()({active:"3"===this.props.activeTab.first}),onClick:function(){e.props.toggleTab("3","first")}},"Estimated Risk Score"))),l.a.createElement(y.a,{activeTab:this.props.activeTab.first},l.a.createElement(O.a,{tabId:"1"},l.a.createElement(x,{data:this.props.actual})),l.a.createElement(O.a,{tabId:"2"},l.a.createElement(x,{data:this.props.previous})),l.a.createElement(O.a,{tabId:"3"},l.a.createElement(x,{data:this.props.estimated}))))),l.a.createElement(j.a,null,l.a.createElement(h.a,{className:"mx-2",color:"info",onClick:this.downloadReport},l.a.createElement("i",{className:"fa fa-download text-white"}))))}}]),t}(l.a.Component),k=a(560),S=a(540),Y=a(541),z=a(542),M=a(568),R=a(581),B=a.n(R),A=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).downloadReport=function(){B.a.convert(document.getElementById("branch-categorization-summary"),{name:"branch-categorization-summary.xlsx"})},a.saveReport=function(){window.confirm("Do you want to save this report?")},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement(m.a,null,l.a.createElement(p.a,null,l.a.createElement(d.a,null,l.a.createElement(f.a,null,"Branch Categorization Summary"),l.a.createElement(f.a,null,l.a.createElement(h.a,{onClick:function(){return e.props.toggleCollapse("second")},className:"float-right text-white",size:"sm",color:"info"},l.a.createElement("i",{className:"fa fa-bars"}))))),l.a.createElement(g.a,{isOpen:this.props.isOpen.second},l.a.createElement(v.a,null,l.a.createElement(u.a,{responsive:!0,bordered:!0,id:"branch-categorization-summary"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"S.N."),l.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Branch Name"),l.a.createElement("th",{"data-f-bold":!0,rowSpan:"2"},"Estimated"),l.a.createElement("th",{"data-f-bold":!0,colSpan:"2",className:"text-center"},"Actual")),l.a.createElement("tr",null,l.a.createElement("th",{"data-f-bold":!0},"Previous Quarter"),l.a.createElement("th",{"data-f-bold":!0},"This Quarter"))),l.a.createElement("tbody",null,this.props.actual.map((function(t,a){var n=e.props.estimated[a],r=e.props.previous[a];return l.a.createElement("tr",{key:t.id},l.a.createElement("td",null,a+1),l.a.createElement("td",null,t.name),l.a.createElement("td",null,n&&n.screening?n.screening.name:""),l.a.createElement("td",null,r&&r.screening?r.screening.name:""),l.a.createElement("td",null,t.screening?t.screening.name:""))})))))),l.a.createElement(j.a,null,l.a.createElement(h.a,{className:"mx-2",color:"info",onClick:this.downloadReport},l.a.createElement("i",{className:"fa fa-download text-white"}))))}}]),t}(l.a.Component),I=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).getGrade=function(e,t){return e&&t?e.lowerLimit<t.lowerLimit?l.a.createElement("span",null,"Upgraded ",l.a.createElement("i",{className:"fa fa-lg fa-caret-up text-success"})):e.lowerLimit>t.lowerLimit?l.a.createElement("span",null,"Downgraded ",l.a.createElement("i",{className:"fa fa-lg fa-caret-down text-danger"})):"Status Quo":""},a.getGradeString=function(e,t){return e&&t?e.lowerLimit<t.lowerLimit?"Upgraded":e.lowerLimit>t.lowerLimit?"Downgraded":"Status Quo":""},a.downloadReport=function(){B.a.convert(document.getElementById("table-grading"),{name:"branch-grading.xlsx"})},a.saveReport=function(){var e=a.props.actual.map((function(e,t){var n=a.props.estimated[t],r=a.props.previous[t];return{branchId:e.id,estimatedVsActual:n?a.getGradeString(e.screening,n.screening):"",previousVsActual:r?a.getGradeString(e.screening,r.screening):""}}));Object(N.m)(e,{startDate:a.props.startDate,type:"branch"}).then((function(e){window.alert(e)})).catch((function(){window.alert("Oops! Error occurred")}))},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props.permissions;return l.a.createElement(m.a,null,l.a.createElement(p.a,null,l.a.createElement(d.a,null,l.a.createElement(f.a,null,"Branch Grading"),l.a.createElement(f.a,null,l.a.createElement(h.a,{onClick:function(){return e.props.toggleCollapse("third")},className:"float-right text-white",size:"sm",color:"info"},l.a.createElement("i",{className:"fa fa-bars"}))))),l.a.createElement(g.a,{isOpen:this.props.isOpen.third},l.a.createElement(v.a,null,l.a.createElement(u.a,{responsive:!0,bordered:!0,id:"table-grading"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{"data-f-bold":!0},"S.N."),l.a.createElement("th",{"data-f-bold":!0},"Branch Name"),l.a.createElement("th",{"data-f-bold":!0},"Actual This Qtr. V/s Estimated"),l.a.createElement("th",{"data-f-bold":!0},"Actual This Qtr. V/s Previous Quarter"))),l.a.createElement("tbody",null,this.props.actual.map((function(t,a){var n=e.props.estimated[a],r=e.props.previous[a];return l.a.createElement("tr",{key:t.id},l.a.createElement("td",null,a+1),l.a.createElement("td",null,t.name),l.a.createElement("td",null,n?e.getGrade(t.screening,n.screening):""),l.a.createElement("td",null,r?e.getGrade(t.screening,r.screening):""))})))))),l.a.createElement(j.a,null,l.a.createElement(h.a,{className:"mx-2",color:"info",onClick:this.downloadReport},l.a.createElement("i",{className:"fa fa-download text-white"})),t.isApprover?l.a.createElement(h.a,{className:"mx-2",color:"success",onClick:this.saveReport},l.a.createElement("i",{className:"fa fa-save text-white"})):null))}}]),t}(l.a.Component),Q=a(548);a.d(t,"default",(function(){return L}));var L=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(o)))).state={activeTab:{first:"1",second:"1",third:"3"},isOpen:{first:!1,second:!1,third:!1},actual:[],previous:[],estimated:[],startDate:Object(M.h)()},a.handleDateChange=function(e){var t=e.target.value,n=null;switch(e.target.name){case"quarter":n=Object(M.e)(a.state.startDate).year+t;break;case"year":if(4===t.length)n=t+Object(M.g)(a.state.startDate)}if(t){var r=n?Object(M.f)(Object(Q.bs2ad)(n)):a.state.startDate;a.setState({startDate:r},(function(){return a.updateData()}))}},a.toggleTab=function(e,t){if(a.state.activeTab[t]!==e){var n=a.state.activeTab;n[t]=e,a.setState({activeTab:n})}},a.toggleCollapse=function(e){var t=a.state.isOpen;t[e]=!t[e],a.setState({isOpen:t})},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"updateData",value:function(){var e=this;Object(N.a)({startDate:this.state.startDate}).then((function(t){e.setState(t)})).catch((function(){}))}},{key:"componentDidMount",value:function(){this.updateData()}},{key:"render",value:function(){return console.log(this.state.actual),l.a.createElement("div",{className:"animate fadeIn"},l.a.createElement(m.a,null,l.a.createElement(v.a,null,l.a.createElement(d.a,null,l.a.createElement(f.a,{md:4},l.a.createElement(k.a,null,"Quarter Start Date (YYYY/MM/DD)"),l.a.createElement(S.a,{className:"mb-2"},l.a.createElement(Y.a,{addonType:"prepend"},l.a.createElement(z.a,{onChange:this.handleDateChange,value:Object(M.g)(this.state.startDate),type:"select",name:"quarter",className:"font-italic"},l.a.createElement("option",{value:""},"Select Quarter"),l.a.createElement("option",{value:M.b},"First Quarter"),l.a.createElement("option",{value:M.d},"Second Quarter"),l.a.createElement("option",{value:M.c},"Third Quarter"),l.a.createElement("option",{value:M.a},"Fourth Quarter"))),l.a.createElement(z.a,{type:"number",maxLength:"4",minLength:"4",className:"font-italic",placeholder:"Year",name:"year",onChange:this.handleDateChange,value:Object(M.e)(this.state.startDate).year})))))),l.a.createElement(C,Object.assign({activeTab:this.state.activeTab,isOpen:this.state.isOpen,toggleTab:this.toggleTab,toggleCollapse:this.toggleCollapse},this.state,this.props)),l.a.createElement(A,Object.assign({activeTab:this.state.activeTab,isOpen:this.state.isOpen,toggleTab:this.toggleTab,toggleCollapse:this.toggleCollapse},this.state,this.props)),l.a.createElement(I,Object.assign({activeTab:this.state.activeTab,isOpen:this.state.isOpen,toggleTab:this.toggleTab,toggleCollapse:this.toggleCollapse,startDate:this.state.startDate},this.state,this.props)))}}]),t}(l.a.Component)}}]);
//# sourceMappingURL=18.26cd1fe2.chunk.js.map