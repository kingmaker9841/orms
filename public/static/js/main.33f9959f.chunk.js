(this.webpackJsonporr=this.webpackJsonporr||[]).push([[7],{485:function(e,t,a){e.exports=a(530)},506:function(e,t,a){},524:function(e,t,a){},530:function(e,t,a){"use strict";a.r(t);a(486),a(496),a(116),a(117),a(118),a(119),a(120),a(121),a(122),a(123),a(124),a(125),a(126),a(127),a(128),a(129),a(130),a(209),a(210),a(211),a(212),a(213),a(214),a(215),a(216),a(217),a(132),a(218),a(219),a(69),a(220),a(221),a(222),a(223),a(224),a(225),a(226),a(227),a(228),a(229),a(230),a(231),a(232),a(233),a(234),a(235),a(236),a(237),a(238),a(239),a(240),a(241),a(242),a(133),a(67),a(243),a(244),a(245),a(246),a(247),a(248),a(249),a(250),a(251),a(252),a(253),a(254),a(255),a(256),a(257),a(258),a(134),a(259),a(260),a(261),a(262),a(263),a(264),a(265),a(266),a(267),a(268),a(269),a(270),a(271),a(272),a(273),a(274),a(275),a(276),a(277),a(278),a(279),a(280),a(281),a(282),a(283),a(284),a(285),a(286),a(287),a(288),a(289),a(290),a(291),a(292),a(91),a(293),a(294),a(295),a(296),a(297),a(298),a(299),a(300),a(301),a(302),a(303),a(304),a(305),a(306),a(307),a(308),a(309),a(310),a(311),a(312),a(313),a(92),a(314),a(315),a(316),a(317),a(68),a(318),a(319),a(320),a(321),a(322),a(323),a(324),a(325),a(326),a(327),a(328),a(329),a(330),a(331),a(332),a(333),a(334),a(335),a(336),a(337),a(338),a(339),a(340),a(341),a(342),a(343),a(344),a(345),a(346),a(347),a(348),a(349),a(350),a(351),a(352),a(353),a(354),a(355),a(356),a(357),a(358),a(359),a(360),a(361),a(362),a(363),a(364),a(365),a(366),a(367),a(368),a(369),a(370),a(371),a(372),a(373),a(374),a(375),a(376),a(93),a(377),a(438),a(439),a(440),a(441),a(442),a(443),a(171),a(172),a(173),a(174),a(175),a(176),a(177),a(178),a(179),a(180),a(181),a(182),a(183),a(184),a(185),a(186),a(187),a(445),a(446),a(447),a(448),a(449),a(450),a(451),a(452),a(453),a(454),a(455),a(456),a(457),a(458),a(459),a(460),a(462),a(463),a(464),a(465),a(466),a(467),a(468),a(469),a(470),a(471),a(472),a(188),a(189),a(190),a(191),a(192),a(193),a(194),a(195),a(196),a(197),a(198),a(199),a(200),a(201),a(202),a(203),a(204),a(205),a(473),a(474),a(475),a(477),a(206),a(207),a(208),a(478),a(479),a(480),a(481),a(482),a(483),a(484),a(378),a(115),a(379),a(380),a(166),a(167),a(114);!function(){if("function"===typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var a=document.createEvent("CustomEvent");return a.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),a}e.prototype=window.Event.prototype,window.CustomEvent=e}();var n=a(2),r=a.n(n),o=a(113),l=a.n(o),c=(a(506),a(85)),s=a(86),i=a(88),m=a(87),u=a(89),d=a(162),h=a(53),p=a(54),E=(a(524),r.a.lazy((function(){return Promise.all([a.e(12),a.e(43)]).then(a.bind(null,902))}))),f=r.a.lazy((function(){return a.e(44).then(a.bind(null,878))})),g=r.a.lazy((function(){return a.e(45).then(a.bind(null,879))})),v=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={hasError:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"getPermissions",value:function(){var e=this;p.server.get("/permissions").then((function(t){e.setState({permissions:t.data})})).catch((function(e){localStorage.clear()}))}},{key:"componentDidCatch",value:function(e,t){}},{key:"componentDidMount",value:function(){this.getPermissions()}},{key:"render",value:function(){var e=this;return this.state.hasError?r.a.createElement("h1",{className:"w-100 h-100 text-center mt-5"},"Oops! Something went wrong"):this.state.permissions?r.a.createElement(d.HashRouter,null,r.a.createElement(r.a.Suspense,{fallback:r.a.createElement("div",{className:"animated fadeIn pt-3 text-center"},"Loading...")},r.a.createElement(h.g,null,r.a.createElement(h.d,{exact:!0,path:"/404",name:"Page 404",render:function(e){return r.a.createElement(f,e)}}),r.a.createElement(h.d,{exact:!0,path:"/500",name:"Page 500",render:function(e){return r.a.createElement(g,e)}}),r.a.createElement(h.d,{path:"/",name:"Home",render:function(t){return r.a.createElement(E,Object.assign({},t,{permissions:e.state.permissions}))}})))):null}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),t}(n.Component),w=a(533),b=a(534),y=a(535),k=a(536),C=a(537),S=a(538),x=a(539),O=a(540),j=a(541),N=a(432),I=a(542),L=a(532);var P=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:""},a.handleSubmit=function(e){var t;e.preventDefault(),t={email:a.state.email,password:a.state.password},p.server.post("/login",t).then((function(e){var t=e.data;t.token&&localStorage.setItem(p.TOKEN,t.token),window.location.reload()})).catch((function(e){window.alert("You cannot login to this system!")}))},a.handleChange=function(e){switch(e.target.name){case"email":a.setState({email:e.target.value});break;case"password":a.setState({password:e.target.value})}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app flex-row align-items-center"},r.a.createElement(w.a,null,r.a.createElement(b.a,{className:"justify-content-center"},r.a.createElement(y.a,{md:"8"},r.a.createElement(k.a,null,r.a.createElement(C.a,{className:"p-4"},r.a.createElement(S.a,null,r.a.createElement(x.a,{onSubmit:this.handleSubmit},r.a.createElement("h1",null,"Login"),r.a.createElement("p",{className:"text-muted"},"Sign In to your account"),r.a.createElement(O.a,{className:"mb-3"},r.a.createElement(j.a,{addonType:"prepend"},r.a.createElement(N.a,null,r.a.createElement("i",{className:"icon-user"}))),r.a.createElement(I.a,{onChange:this.handleChange,value:this.state.email,name:"email",placeholder:"Email/Username",required:!0,autoComplete:"email"})),r.a.createElement(O.a,{className:"mb-4"},r.a.createElement(j.a,{addonType:"prepend"},r.a.createElement(N.a,null,r.a.createElement("i",{className:"icon-lock"}))),r.a.createElement(I.a,{type:"password",onChange:this.handleChange,value:this.state.password,name:"password",placeholder:"Password",required:!0,autoComplete:"current-password"})),r.a.createElement(b.a,null,r.a.createElement(y.a,{xs:"6"},r.a.createElement(L.a,{color:"primary",className:"px-4"},"Login")))))))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(529);p.server.get("/isLoggedIn").then((function(e){l.a.render(r.a.createElement(v,null),document.getElementById("root"))})).catch((function(e){l.a.render(r.a.createElement(P,null),document.getElementById("root"))})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},54:function(e,t,a){var n=a(507),r={"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},o={Authorization:"Bearer "+localStorage.getItem("token")},l=n.create({baseURL:"/api",headers:r});e.exports.TOKEN="token",e.exports.header=r,e.exports.headerAuth=o,e.exports.SERVER_URL="/api",e.exports.server=l}},[[485,8,9]]]);
//# sourceMappingURL=main.33f9959f.chunk.js.map