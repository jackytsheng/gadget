(this["webpackJsonpgaget.jiajinzheng.com"]=this["webpackJsonpgaget.jiajinzheng.com"]||[]).push([[0],{29:function(n,e,t){n.exports=t(41)},34:function(n,e,t){},41:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),i=t(13),o=t.n(i),c=(t(34),t(20)),l=t(4),u=t(2),d=t(3);function f(){var n=Object(u.a)(["\n  margin-top:50px;\n  height: 150px;\n  border: solid black 1px;\n  width: 150px;\n  border-radius:50%;\n"]);return f=function(){return n},n}var h=d.a.div(f()),s=function(){return a.a.createElement(h,null)};function m(){var n=Object(u.a)(["\n  height: 50px;\n  border: solid black 1px;\n  width: 300px;\n  margin: 30px 0;\n"]);return m=function(){return n},n}var v=d.a.div(m()),p=function(){return a.a.createElement(v,null)};function g(){var n=Object(u.a)(["\n  height:300px;\n  border: solid black 1px;\n  width:300px;\n"]);return g=function(){return n},n}var b=d.a.div(g()),x=function(){var n=Object(l.f)();return console.log(n.pathname),a.a.createElement(l.a,{path:n},a.a.createElement(b,null))};function E(){var n=Object(u.a)(["\n  display:flex;\n  flex-direction:column;\n  justify-content:space-evenly;\n  align-items:center;\n"]);return E=function(){return n},n}var j=d.a.section(E()),O=function(){return a.a.createElement(j,null,a.a.createElement(s,null),a.a.createElement(p,null),a.a.createElement(x,{header:"Current Header"}))},w=t(15),k=t(16),y=t(17),C=t(19),S=t(18);function G(){var n=Object(u.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n\n  @media (max-width: 850px) {\n    flex-direction: column;\n  }\n"]);return G=function(){return n},n}var z=d.a.div(G()),M=function(n){var e=n.children;return a.a.createElement(z,null,e)};function _(){var n=Object(u.a)(["\n  position:absolute;\n  top:0;\n  bottom:0;\n  left:0;\n  right:0;\n"]);return _=function(){return n},n}var B=d.a.div(_()),I=function(n){var e=n.children;return a.a.createElement(B,null,e)};function J(){var n=Object(u.a)(["\n  display: grid;\n  width:100%;\n  height:100%;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(9, 1fr);\n"]);return J=function(){return n},n}function W(){var n=Object(u.a)(["\n  width: 80%;\n  height: 80%;\n  border-radius:2px;\n  border: 2px solid ",";\n  font-weight: 700;\n  text-align: center;\n  font-size: 20px;\n  background-color: ",";\n"]);return W=function(){return n},n}var D=d.a.input(W(),(function(n){return n.borderColor}),(function(n){return n.bg}));D.defaultProps={bg:"white",borderColor:"black"};var N=d.a.div(J()),q=function(n){Object(C.a)(t,n);var e=Object(S.a)(t);function t(n){var r;return Object(w.a)(this,t),(r=e.call(this,n)).state={error:""},r}return Object(k.a)(t,[{key:"gridGenerator",value:function(){for(var n=this,e=[],t=function(t){for(var r=[],i=function(e){r.push(a.a.createElement(M,{key:"Grid_Wrapper_(".concat(t,",").concat(e,")")},a.a.createElement(D,{onChange:function(r){n.props.handleChange(r,t,e)},borderColor:n.state.error?"#db6f93":null,bg:Math.floor(e/3)%2===0&&Math.floor(t/3)%2===0||Math.floor(e/3)%2===1&&Math.floor(t/3)%2===1?null:"#dedde5",key:"Grid_ID_(".concat(t,",").concat(e,")"),required:!0,type:"text",maxLength:"1"})))},o=0;o<9;o++)i(o);e.push(r)},r=0;r<9;r++)t(r);return e}},{key:"render",value:function(){return a.a.createElement(M,null,a.a.createElement(I,null,a.a.createElement(N,null,this.gridGenerator())))}}]),t}(a.a.Component),H=t(55);function L(){var n=Object(u.a)(["\n  display:flex;\n  flex-direction:column;\n  justify-content:center;\n  align-items:center;\n"]);return L=function(){return n},n}function P(){var n=Object(u.a)(["\n  width: 415px;\n  font-size: 20px;\n"]);return P=function(){return n},n}function Z(){var n=Object(u.a)(["\n  width:415px;\n  margin-bottom:20px;\n  font-size:50px;\n  font-weight:700;\n"]);return Z=function(){return n},n}function $(){var n=Object(u.a)(["\n  width: 415px;\n  height: 400px;\n  margin-bottom:20px;\n  border-radius: 5px;\n"]);return $=function(){return n},n}var A=d.a.div($()),F=d.a.div(Z()),K=d.a.div(P()),Q=d.a.div(L()),R=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],T=function(n){Object(C.a)(t,n);var e=Object(S.a)(t);function t(n){var r;return Object(w.a)(this,t),(r=e.call(this,n)).state={grid:R},r.handleChange=r.handleChange.bind(Object(y.a)(r)),r}return Object(k.a)(t,[{key:"registerNumberOnGrid",value:function(n,e,t){R[n][e]=t,this.setState({grid:R})}},{key:"handleChange",value:function(n,e,t){n.preventDefault();var r=(n.target.value?n.target:{value:0}).value;this.validate(r)&&this.registerNumberOnGrid(e,t,parseInt(r))}},{key:"validate",value:function(n){var e=this;return/[0-9]/.test(n)?(this.setState({error:""}),!0):(this.setState({error:"".concat(n," is not a valid number")},(function(){return console.log(e.state.error)})),!1)}},{key:"render",value:function(){var n=this;return a.a.createElement(M,null,a.a.createElement(Q,null,a.a.createElement(F,null,"Sudoku Solver"),a.a.createElement(K,null,"By Jiajin Zheng")),a.a.createElement(Q,null,a.a.createElement(A,null,a.a.createElement(q,{handleChange:this.handleChange})),a.a.createElement(H.a,{variant:"contained",color:"default",onClick:function(e){return console.log(n.state.grid)}},"Solve")))}}]),t}(a.a.Component);function U(){var n=Object(u.a)(["\n  position:fixed;\n  min-height:100vh;\n  top:0;\n  bottom:0;\n  left:0;\n  right:0;\n"]);return U=function(){return n},n}var V=d.a.div(U()),X=function(n){var e=n.children;return a.a.createElement(V,null,e)},Y=function(){return a.a.createElement(c.a,{basename:"/"},a.a.createElement(l.c,null,a.a.createElement(l.a,{path:"/",exact:!0},a.a.createElement(X,null,a.a.createElement(O,null))),a.a.createElement(l.a,{path:"/sudokusolver",exact:!0},a.a.createElement(X,null,a.a.createElement(T,null)))))},nn=function(){return a.a.createElement(Y,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(nn,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.6495e05f.chunk.js.map