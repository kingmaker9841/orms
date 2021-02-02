(this.webpackJsonporr=this.webpackJsonporr||[]).push([[36],{545:function(e,t,a){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,i=!1,r=void 0;try{for(var s,l=e[Symbol.iterator]();!(n=(s=l.next()).done)&&(a.push(s.value),!t||a.length!==t);n=!0);}catch(o){i=!0,r=o}finally{try{n||null==l.return||l.return()}finally{if(i)throw r}}return a}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}a.d(t,"a",(function(){return n}))},549:function(e,t,a){"use strict";var n=a(6),i=a(14),r=a(2),s=a.n(r),l=a(1),o=a.n(l),c=a(18),u=a.n(c),m=a(8),d={tag:m.i,className:o.a.string,cssModule:o.a.object},E=function(e){var t=e.className,a=e.cssModule,r=e.tag,l=Object(i.a)(e,["className","cssModule","tag"]),o=Object(m.f)(u()(t,"card-header"),a);return s.a.createElement(r,Object(n.a)({},l,{className:o}))};E.propTypes=d,E.defaultProps={tag:"div"},t.a=E},552:function(e,t,a){"use strict";var n=a(6),i=a(14),r=a(2),s=a.n(r),l=a(1),o=a.n(l),c=a(18),u=a.n(c),m=a(8),d={tag:m.i,className:o.a.string,cssModule:o.a.object},E=function(e){var t=e.className,a=e.cssModule,r=e.tag,l=Object(i.a)(e,["className","cssModule","tag"]),o=Object(m.f)(u()(t,"card-footer"),a);return s.a.createElement(r,Object(n.a)({},l,{className:o}))};E.propTypes=d,E.defaultProps={tag:"div"},t.a=E},558:function(e,t,a){"use strict";var n=a(6),i=a(14),r=a(2),s=a.n(r),l=a(1),o=a.n(l),c=a(18),u=a.n(c),m=a(8),d={className:o.a.string,cssModule:o.a.object,size:o.a.string,bordered:o.a.bool,borderless:o.a.bool,striped:o.a.bool,dark:o.a.bool,hover:o.a.bool,responsive:o.a.oneOfType([o.a.bool,o.a.string]),tag:m.i,responsiveTag:m.i,innerRef:o.a.oneOfType([o.a.func,o.a.string,o.a.object])},E=function(e){var t=e.className,a=e.cssModule,r=e.size,l=e.bordered,o=e.borderless,c=e.striped,d=e.dark,E=e.hover,h=e.responsive,p=e.tag,b=e.responsiveTag,f=e.innerRef,g=Object(i.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),v=Object(m.f)(u()(t,"table",!!r&&"table-"+r,!!l&&"table-bordered",!!o&&"table-borderless",!!c&&"table-striped",!!d&&"table-dark",!!E&&"table-hover"),a),k=s.a.createElement(p,Object(n.a)({},g,{ref:f,className:v}));if(h){var y=Object(m.f)(!0===h?"table-responsive":"table-responsive-"+h,a);return s.a.createElement(b,{className:y},k)}return k};E.propTypes=d,E.defaultProps={tag:"table",responsiveTag:"div"},t.a=E},903:function(e,t,a){"use strict";a.r(t);var n=a(545),i=a(85),r=a(86),s=a(88),l=a(87),o=a(89),c=a(2),u=a.n(c),m=a(534),d=a(535),E=a(537),h=a(539),p=a(549),b=a(532),f=a(538),g=a(558),v=a(542),k=a(552),y=a(54),C="/risk-estimation-ho",D="/risk-categorization",_="/risk-escalation";var I=a(553),A=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={isDisabled:!0,riskCategories:[]},a.handleChange=function(e){var t=e.target.name.split("-"),i=Object(n.a)(t,2),r=i[0],s=i[1],l=e.target.value,o=a.state.riskCategories.map((function(e,t){return t===Number(s)&&(e[r]=l),e}));a.setState({riskCategories:o})},a.handleSubmit=function(e){var t,n;e.preventDefault(),t={riskCategories:a.state.riskCategories},n=function(e,t){e||window.location.reload()},y.server.put("".concat(D),t).then((function(e){n(null,e.data)})).catch((function(e){n(e)}))},a.handleAdd=function(){var e=a.state.riskCategories;e.push({name:"",lowerLimit:"",upperLimit:""}),a.setState({riskCategories:e})},a.handleDelete=function(e){var t=a.state.riskCategories.filter((function(t,a){return a===e?0:1}));a.setState({riskCategories:t})},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"updateData",value:function(){var e,t=this;e=function(e,a){e||t.setState({riskCategories:a})},y.server.get("".concat(D)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}},{key:"componentDidMount",value:function(){this.updateData()}},{key:"render",value:function(){var e=this,t=this.props.permissions?this.props.permissions:{};return u.a.createElement(E.a,null,u.a.createElement(h.a,{onSubmit:this.handleSubmit},u.a.createElement(p.a,null,t.riskEstimationHo===I.VIEW_EDIT||t.riskEstimationHo===I.VIEW_EDIT_DELETE||t.isAdmin?u.a.createElement(b.a,{color:"info",className:"mr-2",size:"sm",onClick:function(){return e.setState({isDisabled:!e.state.isDisabled})}},u.a.createElement("i",{className:"fa fa-edit text-white"})):null,"Risk Categorization"),u.a.createElement(f.a,null,u.a.createElement(g.a,null,u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Name"),u.a.createElement("th",null,"Lower Limit"),u.a.createElement("th",null,"Upper Limit"),u.a.createElement("th",null))),u.a.createElement("tbody",null,this.state.riskCategories.map((function(a,n){return u.a.createElement("tr",{key:n},u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,name:"name-"+n,value:a.name,onChange:e.handleChange})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,name:"lowerLimit-"+n,type:"number",value:a.lowerLimit,onChange:e.handleChange})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,name:"upperLimit-"+n,type:"number",value:a.upperLimit,onChange:e.handleChange})),u.a.createElement("td",null,e.state.isDisabled?null:t.riskEstimationHo===I.VIEW_EDIT_DELETE||t.isAdmin?u.a.createElement(b.a,{size:"sm",color:"danger",onClick:function(){return e.handleDelete(n)}},u.a.createElement("i",{className:"fa fa-trash"})):null))})))),this.state.isDisabled&&(t.riskEstimationHo===I.VIEW_EDIT||t.riskEstimationHo===I.VIEW_EDIT_DELETE||t.isAdmin)?u.a.createElement(b.a,{className:"text-white",size:"sm",color:"warning",type:"button",onClick:this.handleAdd},"+"):null),u.a.createElement(k.a,null,this.state.isDisabled?null:t.riskEstimationHo===I.VIEW_EDIT||t.riskEstimationHo===I.VIEW_EDIT_DELETE||t.isAdmin?u.a.createElement(b.a,{size:"sm",color:"success",type:"submit"},u.a.createElement("i",{className:"fa fa-dot-circle-o"})," Submit"):null)))}}]),t}(u.a.Component),j=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={isDisabled:!0,riskCategories:[]},a.handleChange=function(e){var t=e.target.name.split("-"),i=Object(n.a)(t,2),r=i[0],s=i[1],l=e.target.value,o=a.state.riskCategories.map((function(e){if(e.id===Number(r)){var t=!1;e.risk_escalation_functions=e.risk_escalation_functions.map((function(e){return e.riskCategorizationFunctionId===Number(s)&&(t=!0,e.lowerLimit=l),e})),t||e.risk_escalation_functions.push({riskCategorizationId:e.id,riskCategorizationFunctionId:Number(s),lowerLimit:l})}return e}));a.setState({riskCategories:o})},a.handleSubmit=function(e){var t,n;e.preventDefault(),t={riskCategories:a.state.riskCategories},n=function(e,t){e||window.location.reload()},y.server.put("".concat(_),t).then((function(e){n(null,e.data)})).catch((function(e){n(e)}))},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e,t=this;e=function(e,a){e||t.setState({riskCategories:a})},y.server.get("".concat(_)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}},{key:"render",value:function(){var e=this,t=this.props.permissions?this.props.permissions:{};return u.a.createElement(E.a,null,u.a.createElement(h.a,{onSubmit:this.handleSubmit},u.a.createElement(p.a,null,t.riskEstimationHo===I.VIEW_EDIT||t.riskEstimationHo===I.VIEW_EDIT_DELETE||t.isAdmin?u.a.createElement(b.a,{color:"info",className:"mr-2",size:"sm",onClick:function(){return e.setState({isDisabled:!e.state.isDisabled})}},u.a.createElement("i",{className:"fa fa-edit text-white"})):null,"Risk Escalation"),u.a.createElement(f.a,null,u.a.createElement(g.a,null,u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"Category"),this.state.riskCategories.map((function(e,t){return u.a.createElement("th",{key:t},e.name)})))),u.a.createElement("tbody",null,this.state.riskCategories.map((function(t,a){return u.a.createElement("tr",{key:a},u.a.createElement("td",null,t.name),e.state.riskCategories.map((function(a,n){var i=t.risk_escalation_functions.filter((function(e){return a.id===e.riskCategorizationFunctionId?1:0}))[0];return i=i||{},u.a.createElement("td",{key:n},u.a.createElement(v.a,{name:t.id+"-"+a.id,disabled:e.state.isDisabled,onChange:e.handleChange,value:i.lowerLimit?i.lowerLimit:""}))})))}))))),u.a.createElement(k.a,null,this.state.isDisabled?null:t.riskEstimationHo===I.VIEW_EDIT||t.riskEstimationHo===I.VIEW_EDIT_DELETE||t.isAdmin?u.a.createElement(b.a,{size:"sm",color:"success",type:"submit"},u.a.createElement("i",{className:"fa fa-dot-circle-o"})," Submit"):null)))}}]),t}(u.a.Component),O=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={isDisabled:!0,riskAreas:[]},a.handleChange=function(e){var t=e.target.name.split("-"),i=Object(n.a)(t,2),r=i[0],s=i[1],l=e.target.value,o=a.state.riskAreas.map((function(e){if(Number(s)===e.id){var t=e.risk_estimation_ho?e.risk_estimation_ho:{};t.riskAreaId=e.id,t[r]=l,e.risk_estimation_ho=t}return e}));a.setState({riskAreas:o})},a.handleSubmit=function(e){var t,n;e.preventDefault(),t=a.state.riskAreas,n=function(e,t){e||window.location.reload()},y.server.put("".concat(C),t).then((function(e){n(null,e.data)})).catch((function(e){n(e)}))},a.onItemSelect=function(e){a.setState({selectedArea:e})},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e,t=this;e=function(e,a){e||t.setState({riskAreas:a})},y.server.get("".concat(C)).then((function(t){e(null,t.data)})).catch((function(t){e(t)}))}},{key:"render",value:function(){var e=this,t=this.state.riskAreas,a=["Adequately Exist and Operational","Adequately Exist but not Operational","Partially Exist","Do not Exist"],n=this.props.permissions?this.props.permissions:{};return u.a.createElement("div",{className:"animated fadeIn"},u.a.createElement(m.a,null,u.a.createElement(d.a,{xs:"12",lg:"12"},u.a.createElement(E.a,null,u.a.createElement(h.a,{onSubmit:this.handleSubmit},u.a.createElement(p.a,null,n.riskEstimationHo===I.VIEW_EDIT||n.riskEstimationHo===I.VIEW_EDIT_DELETE||n.isAdmin?u.a.createElement(b.a,{color:"info",className:"mr-2",size:"sm",onClick:function(){return e.setState({isDisabled:!e.state.isDisabled})}},u.a.createElement("i",{className:"fa fa-edit text-white"})):null,"Risk Estimation HO"),u.a.createElement(f.a,{className:"table-responsive"},u.a.createElement(g.a,null,u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"S.N."),u.a.createElement("th",null,"Risk Area/Functions"),u.a.createElement("th",{style:{minWidth:"80px"}},"Previous Risk Score"),u.a.createElement("th",{style:{minWidth:"80px"}},"Likelihood"),u.a.createElement("th",{style:{minWidth:"80px"}},"Impact"),u.a.createElement("th",{style:{minWidth:"80px"}},"Weight"),u.a.createElement("th",{style:{minWidth:"150px"}},"Policies and Procedures"),u.a.createElement("th",null,"Remarks"),u.a.createElement("th",null,"Reporting Frequencies"),u.a.createElement("th",null,"Responsibility"),u.a.createElement("th",{style:{minWidth:"120px"}},"Status"))),u.a.createElement("tbody",null,t.map((function(t,i){var r=t.risk_estimation_ho?t.risk_estimation_ho:{};return u.a.createElement("tr",{key:i},u.a.createElement("td",null,i+1),u.a.createElement("td",null,t.name),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"number",min:"0",name:"previousRiskScore-"+t.id,onChange:e.handleChange,value:r.previousRiskScore?r.previousRiskScore:""})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"number",min:"0",max:"5",name:"likelihood-"+t.id,onChange:e.handleChange,value:r.likelihood?r.likelihood:""})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"number",min:"0",max:"5",name:"impact-"+t.id,onChange:e.handleChange,value:r.impact?r.impact:""})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"number",name:"weight-"+t.id,onChange:e.handleChange,value:r.weight?r.weight:""})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"select",name:"policiesAndProcedure-"+t.id,title:r.policiesAndProcedure?r.policiesAndProcedure:"",value:r.policiesAndProcedure?r.policiesAndProcedure:"",onChange:e.handleChange},u.a.createElement("option",{value:""},"--- Select ---"),a.map((function(e){return u.a.createElement("option",{key:e},e)})))),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"text",name:"remarks-"+t.id,title:r.remarks?r.remarks:"",onChange:e.handleChange,value:r.remarks?r.remarks:""})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"text",name:"reportingFrequency-"+t.id,title:r.reportingFrequency?r.reportingFrequency:"",onChange:e.handleChange,value:r.reportingFrequency?r.reportingFrequency:""})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled,type:"text",name:"responsibility-"+t.id,title:r.responsibility?r.responsibility:"",onChange:e.handleChange,value:r.responsibility?r.responsibility:""})),u.a.createElement("td",null,u.a.createElement(v.a,{disabled:e.state.isDisabled||!n.isApprover,type:"select",name:"isActive-"+t.id,title:r.isActive?1:0,onChange:e.handleChange,value:!!r.isActive&&r.isActive},u.a.createElement("option",{value:"false"},"Inactive"),u.a.createElement("option",{value:"true"},"Active"))))}))))),u.a.createElement(k.a,null,this.state.isDisabled?null:n.riskEstimationHo===I.VIEW_EDIT||n.riskEstimationHo===I.VIEW_EDIT_DELETE||n.isAdmin?u.a.createElement(b.a,{type:"submit",size:"sm",color:"success"},u.a.createElement("i",{className:"fa fa-dot-circle-o"})," Submit"):null))))),u.a.createElement(j,this.props),u.a.createElement(A,this.props))}}]),t}(c.Component);t.default=O}}]);
//# sourceMappingURL=36.5d408f68.chunk.js.map