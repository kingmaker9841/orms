(this.webpackJsonporr=this.webpackJsonporr||[]).push([[31],{545:function(e,t,a){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,r=!1,s=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(c){r=!0,s=c}finally{try{n||null==l.return||l.return()}finally{if(r)throw s}}return a}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}a.d(t,"a",(function(){return n}))},549:function(e,t,a){"use strict";var n=a(6),r=a(14),s=a(2),i=a.n(s),l=a(1),c=a.n(l),o=a(18),u=a.n(o),m=a(8),d={tag:m.i,className:c.a.string,cssModule:c.a.object},b=function(e){var t=e.className,a=e.cssModule,s=e.tag,l=Object(r.a)(e,["className","cssModule","tag"]),c=Object(m.f)(u()(t,"card-header"),a);return i.a.createElement(s,Object(n.a)({},l,{className:c}))};b.propTypes=d,b.defaultProps={tag:"div"},t.a=b},551:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(54),r=function(e){n.server.get("/all").then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}},552:function(e,t,a){"use strict";var n=a(6),r=a(14),s=a(2),i=a.n(s),l=a(1),c=a.n(l),o=a(18),u=a.n(o),m=a(8),d={tag:m.i,className:c.a.string,cssModule:c.a.object},b=function(e){var t=e.className,a=e.cssModule,s=e.tag,l=Object(r.a)(e,["className","cssModule","tag"]),c=Object(m.f)(u()(t,"card-footer"),a);return i.a.createElement(s,Object(n.a)({},l,{className:c}))};b.propTypes=d,b.defaultProps={tag:"div"},t.a=b},558:function(e,t,a){"use strict";var n=a(6),r=a(14),s=a(2),i=a.n(s),l=a(1),c=a.n(l),o=a(18),u=a.n(o),m=a(8),d={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:m.i,responsiveTag:m.i,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},b=function(e){var t=e.className,a=e.cssModule,s=e.size,l=e.bordered,c=e.borderless,o=e.striped,d=e.dark,b=e.hover,p=e.responsive,h=e.tag,f=e.responsiveTag,E=e.innerRef,v=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),k=Object(m.f)(u()(t,"table",!!s&&"table-"+s,!!l&&"table-bordered",!!c&&"table-borderless",!!o&&"table-striped",!!d&&"table-dark",!!b&&"table-hover"),a),g=i.a.createElement(h,Object(n.a)({},v,{ref:E,className:k}));if(p){var y=Object(m.f)(!0===p?"table-responsive":"table-responsive-"+p,a);return i.a.createElement(f,{className:y},g)}return g};b.propTypes=d,b.defaultProps={tag:"table",responsiveTag:"div"},t.a=b},908:function(e,t,a){"use strict";a.r(t);var n=a(545),r=a(85),s=a(86),i=a(88),l=a(87),c=a(89),o=a(2),u=a.n(o),m=a(534),d=a(535),b=a(539),p=a(537),h=a(549),f=a(542),E=a(532),v=a(538),k=a(558),g=a(552),y=a(54),j="/risk-estimation";var O=a(551),N=a(553),D=function(e){function t(){var e,a;Object(r.a)(this,t);for(var s=arguments.length,c=new Array(s),o=0;o<s;o++)c[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(c)))).state={isDisabled:!0,riskAreas:[],branchId:0,branches:[]},a.handleBranchChange=function(e){var t=e.target.value;a.setState({branchId:t},(function(){a.updateData()}))},a.handleChange=function(e){var t=e.target.name.split("-"),r=Object(n.a)(t,2),s=r[0],i=r[1],l=e.target.value,c=a.state.riskAreas.map((function(e){if(Number(i)===e.id){var t=e.risk_estimation?e.risk_estimation:{};t.riskAreaId=e.id,t[s]=l,e.risk_estimation=t}return e}));a.setState({riskAreas:c})},a.handleSubmit=function(e){var t,n,r;e.preventDefault(),t=a.state.riskAreas,n=a.state.branchId,r=function(e,t){e||window.location.reload()},y.server.put("".concat(j,"/").concat(n),t).then((function(e){r(null,e.data)})).catch((function(e){r(e)}))},a}return Object(c.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.updateData(),Object(O.a)((function(t,a){t||e.setState({branches:a.branches})}))}},{key:"updateData",value:function(){var e,t,a=this;e=this.state.branchId,t=function(e,t){e||a.setState({riskAreas:t})},y.server.get("".concat(j,"/").concat(e)).then((function(e){t(null,e.data)})).catch((function(e){t(e)}))}},{key:"render",value:function(){var e=this,t=this.props.permissions?this.props.permissions:{};return u.a.createElement("div",{className:"animated fadeIn"},u.a.createElement(m.a,null,u.a.createElement(d.a,{xs:"12",lg:"12"},u.a.createElement(b.a,{onSubmit:this.handleSubmit,onChange:this.handleChange},u.a.createElement(p.a,null,u.a.createElement(h.a,null,u.a.createElement(m.a,null,t.riskEstimation===N.VIEW_EDIT||t.riskEstimation===N.VIEW_EDIT_DELETE||t.isAdmin?u.a.createElement(u.a.Fragment,null,t.isAdmin?u.a.createElement(d.a,{md:5,xs:6},u.a.createElement(f.a,{type:"select",onChange:this.handleBranchChange},u.a.createElement("option",{value:0},"---- Your Branch ----"),this.state.branches.map((function(e){return u.a.createElement("option",{key:e.id,value:e.id},e.name)})))):null,u.a.createElement(d.a,null,u.a.createElement(E.a,{color:"info",size:"sm",className:"mr-2",onClick:function(){return e.setState({isDisabled:!e.state.isDisabled})}},u.a.createElement("i",{className:"fa fa-edit text-white"})),"Risk Estimation")):null)),u.a.createElement(v.a,{className:"table-responsive"},u.a.createElement(k.a,null,u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"S.N."),u.a.createElement("th",null,"Risk Area/Functions"),u.a.createElement("th",{style:{minWidth:"80px"}},"Previous Risk Score"),u.a.createElement("th",{style:{minWidth:"80px"}},"Likelihood"),u.a.createElement("th",{style:{minWidth:"80px"}},"Impact"),u.a.createElement("th",null,"Remarks"))),u.a.createElement("tbody",null,this.state.riskAreas.map((function(t,a){var n=t.risk_estimation?t.risk_estimation:{};return u.a.createElement("tr",{key:a},u.a.createElement("td",null,a+1),u.a.createElement("td",null,t.name),u.a.createElement("td",null,u.a.createElement(f.a,{disabled:e.state.isDisabled,type:"number",min:"0",name:"previousRiskScore-"+t.id,value:n.previousRiskScore?n.previousRiskScore:""})),u.a.createElement("td",null,u.a.createElement(f.a,{disabled:e.state.isDisabled,type:"number",min:"0",max:"5",name:"likelihood-"+t.id,value:n.likelihood?n.likelihood:""})),u.a.createElement("td",null,u.a.createElement(f.a,{disabled:e.state.isDisabled,type:"number",min:"0",max:"5",name:"impact-"+t.id,value:n.impact?n.impact:""})),u.a.createElement("td",null,u.a.createElement(f.a,{disabled:e.state.isDisabled,type:"text",name:"remarks-"+t.id,title:n.remarks?n.remarks:"",value:n.remarks?n.remarks:""})))}))))),u.a.createElement(g.a,null,this.state.isDisabled?null:t.riskEstimation===N.VIEW_EDIT||t.riskEstimation===N.VIEW_EDIT_DELETE||t.isAdmin?u.a.createElement(E.a,{type:"submit",size:"sm",color:"success"},u.a.createElement("i",{className:"fa fa-dot-circle-o"})," Submit"):null))))))}}]),t}(o.Component);t.default=D}}]);
//# sourceMappingURL=31.e944390e.chunk.js.map