(this.webpackJsonporr=this.webpackJsonporr||[]).push([[34],{545:function(e,a,t){"use strict";function n(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var t=[],n=!0,r=!1,l=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(t.push(s.value),!a||t.length!==a);n=!0);}catch(c){r=!0,l=c}finally{try{n||null==o.return||o.return()}finally{if(r)throw l}}return t}}(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.d(a,"a",(function(){return n}))},549:function(e,a,t){"use strict";var n=t(6),r=t(14),l=t(2),s=t.n(l),o=t(1),c=t.n(o),i=t(18),u=t.n(i),d=t(8),m={tag:d.i,className:c.a.string,cssModule:c.a.object},p=function(e){var a=e.className,t=e.cssModule,l=e.tag,o=Object(r.a)(e,["className","cssModule","tag"]),c=Object(d.f)(u()(a,"card-header"),t);return s.a.createElement(l,Object(n.a)({},o,{className:c}))};p.propTypes=m,p.defaultProps={tag:"div"},a.a=p},552:function(e,a,t){"use strict";var n=t(6),r=t(14),l=t(2),s=t.n(l),o=t(1),c=t.n(o),i=t(18),u=t.n(i),d=t(8),m={tag:d.i,className:c.a.string,cssModule:c.a.object},p=function(e){var a=e.className,t=e.cssModule,l=e.tag,o=Object(r.a)(e,["className","cssModule","tag"]),c=Object(d.f)(u()(a,"card-footer"),t);return s.a.createElement(l,Object(n.a)({},o,{className:c}))};p.propTypes=m,p.defaultProps={tag:"div"},a.a=p},558:function(e,a,t){"use strict";var n=t(6),r=t(14),l=t(2),s=t.n(l),o=t(1),c=t.n(o),i=t(18),u=t.n(i),d=t(8),m={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:d.i,responsiveTag:d.i,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},p=function(e){var a=e.className,t=e.cssModule,l=e.size,o=e.bordered,c=e.borderless,i=e.striped,m=e.dark,p=e.hover,h=e.responsive,v=e.tag,f=e.responsiveTag,y=e.innerRef,b=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),E=Object(d.f)(u()(a,"table",!!l&&"table-"+l,!!o&&"table-bordered",!!c&&"table-borderless",!!i&&"table-striped",!!m&&"table-dark",!!p&&"table-hover"),t),g=s.a.createElement(v,Object(n.a)({},b,{ref:y,className:E}));if(h){var Y=Object(d.f)(!0===h?"table-responsive":"table-responsive-"+h,t);return s.a.createElement(f,{className:Y},g)}return g};p.propTypes=m,p.defaultProps={tag:"table",responsiveTag:"div"},a.a=p},912:function(e,a,t){"use strict";t.r(a);var n=t(543),r=t.n(n),l=t(545),s=t(85),o=t(86),c=t(88),i=t(87),u=t(89),d=t(54),m="/policies-update";function p(e){try{d.server.put("".concat(m),e)}catch(a){}}var h=t(2),v=t.n(h),f=t(537),y=t(539),b=t(549),E=t(538),g=t(558),Y=t(542),D=t(552),A=t(532),M=t(559),k=t.n(M),j=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,o=new Array(n),u=0;u<n;u++)o[u]=arguments[u];return(t=Object(c.a)(this,(e=Object(i.a)(a)).call.apply(e,[this].concat(o)))).state={riskAreas:[]},t.handleChange=function(e){var a=e.target.name.split("-"),n=Object(l.a)(a,2),r=n[0],s=n[1],o=e.target.value,c=t.state.riskAreas.map((function(e){if(Number(s)===e.id){var a=e.policy?e.policy:{};a.riskAreaId=e.id,a[r]=o,e.policy=a}return e}));t.setState({riskAreas:c})},t.handleSubmit=function(e){return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return e.preventDefault(),a.prev=1,a.next=4,r.a.awrap(p(t.state.riskAreas));case 4:alert("Success !"),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(1),alert("we got some exception");case 10:case"end":return a.stop()}}),null,null,[[1,7]])},t.onItemSelect=function(e){t.setState({selectedArea:e})},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"componentDidMount",value:function(){var e,a=this;e=function(e,t){e||a.setState({riskAreas:t})},d.server.get("".concat(m)).then((function(a){e(null,a.data)})).catch((function(a){e(a)}))}},{key:"render",value:function(){var e=this,a=this.state.riskAreas;return v.a.createElement(f.a,null,v.a.createElement(y.a,{onSubmit:this.handleSubmit},v.a.createElement(b.a,null,v.a.createElement("h3",null,v.a.createElement("i",{className:"fa fa-free-code-camp","aria-hidden":"true"}),v.a.createElement("strong",{className:"ml-3"},"Policies Update"))),v.a.createElement(E.a,null,v.a.createElement(g.a,{striped:!0,responsive:!0,bordered:!0},v.a.createElement("thead",null,v.a.createElement("tr",null,v.a.createElement("th",{rowSpan:"2"},"Risk Area"),v.a.createElement("th",{rowSpan:"2"},"Adequacy"),v.a.createElement("th",{colSpan:"3",style:{textAlign:"center"}},"Policies"),v.a.createElement("th",{colSpan:"3",style:{textAlign:"center"}},"Manual"),v.a.createElement("th",{colSpan:"3",style:{textAlign:"center"}},"Others"),v.a.createElement("th",{colSpan:"1",style:{textAlign:"center"}})),v.a.createElement("tr",null,v.a.createElement("th",null,"Approval"),v.a.createElement("th",null,"Revision"),v.a.createElement("th",null,"Deadline"),v.a.createElement("th",null,"Approval"),v.a.createElement("th",null,"Revision"),v.a.createElement("th",null,"Deadline"),v.a.createElement("th",null,"Approval"),v.a.createElement("th",null,"Revision"),v.a.createElement("th",null,"Deadline"),v.a.createElement("th",null,"Remarks"))),v.a.createElement("tbody",null,a.map((function(a,t){var n=a.policy?a.policy:"",r=a.risk_estimation_ho?a.risk_estimation_ho:{};return v.a.createElement("tr",{key:a.name+t},v.a.createElement("td",null,a.name),v.a.createElement("td",null,r.policiesAndProcedure),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"policyApproval-"+a.id,onChange:e.handleChange,value:n.policyApproval?k()(n.policyApproval).format("YYYY-MM-DD"):""})),v.a.createElement("td",{className:"ml-0 mr-0"},v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"policyRevision-"+a.id,onChange:e.handleChange,value:n.policyRevision?k()(n.policyRevision).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"policyDeadline-"+a.id,onChange:e.handleChange,value:n.policyDeadline?k()(n.policyDeadline).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"manualApproval-"+a.id,onChange:e.handleChange,value:n.manualApproval?k()(n.manualApproval).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"manualRevision-"+a.id,onChange:e.handleChange,value:n.manualRevision?k()(n.manualRevision).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"manualDeadline-"+a.id,onChange:e.handleChange,value:n.manualDeadline?k()(n.manualDeadline).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"othersApproval-"+a.id,onChange:e.handleChange,value:n.othersApproval?k()(n.othersApproval).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"othersRevision-"+a.id,onChange:e.handleChange,value:n.othersRevision?k()(n.othersRevision).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement(Y.a,{type:"date",style:{width:"160px"},name:"othersDeadline-"+a.id,onChange:e.handleChange,value:n.othersDeadline?k()(n.othersDeadline).format("YYYY-MM-DD"):""})),v.a.createElement("td",null,v.a.createElement("textarea",{style:{width:"160px"},name:"remarks-"+a.id,onChange:e.handleChange,value:n.remarks?n.remarks:""})))}))))),v.a.createElement(D.a,null,v.a.createElement(A.a,{color:"danger",type:"submit"},"Submit"))))}}]),a}(h.Component);a.default=j}}]);
//# sourceMappingURL=34.1b94a9ed.chunk.js.map