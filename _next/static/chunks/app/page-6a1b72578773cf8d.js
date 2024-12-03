(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{9784:(e,t,s)=>{Promise.resolve().then(s.bind(s,4307))},4307:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>P});var a=s(5155),i=s(2115),n=s(1946),l=s.n(n);function r(e){let{initialAsset:t,setInitialAsset:s,isTrading:i,startTrading:n,resetSettings:r,stopTrading:o}=e;return(0,a.jsxs)("div",{className:l().card,children:[(0,a.jsx)("h2",{className:l().title,children:"설정"}),(0,a.jsxs)("div",{className:l().formGroup,children:[(0,a.jsx)("label",{className:l().label,children:"초기 자산 ($)"}),(0,a.jsx)("input",{type:"number",className:l().input,value:t,onChange:e=>s(Number(e.target.value)),disabled:i})]}),(0,a.jsxs)("div",{className:l().buttonGroup,children:[i?(0,a.jsx)("button",{className:l().stopButton,onClick:o,children:"거래 중지"}):(0,a.jsx)("button",{className:l().startButton,onClick:n,children:"거래 시작"}),(0,a.jsx)("button",{className:l().resetButton,onClick:r,children:"초기화"})]})]})}var o=s(748),c=s.n(o);function d(e){let{feeRate:t,setFeeRate:s,leverage:n,setLeverage:l,addPosition:r,initialAsset:o,currentAsset:d,usedMargin:u}=e,[_,m]=(0,i.useState)(""),[p,x]=(0,i.useState)(""),[h,j]=(0,i.useState)("long"),N=d*n;return(0,a.jsxs)("div",{className:c().card,children:[(0,a.jsx)("h2",{className:c().title,children:"거래 입력"}),(0,a.jsxs)("div",{className:c().typeSelector,children:[(0,a.jsx)("button",{className:"".concat(c().typeButton," ").concat("long"===h?c().selectedLong:c().long),onClick:()=>j("long"),children:"롱"}),(0,a.jsx)("button",{className:"".concat(c().typeButton," ").concat("short"===h?c().selectedShort:c().short),onClick:()=>j("short"),children:"숏"})]}),(0,a.jsxs)("div",{className:c().formGroup,children:[(0,a.jsx)("label",{className:c().label,children:"레버리지"}),(0,a.jsx)("input",{type:"number",className:c().input,value:n,onChange:e=>l(Number(e.target.value))})]}),(0,a.jsxs)("div",{className:c().formGroup,children:[(0,a.jsx)("label",{className:c().label,children:"수수료율 (%)"}),(0,a.jsx)("input",{type:"number",className:c().input,value:t,onChange:e=>s(Number(e.target.value))})]}),(0,a.jsxs)("div",{className:c().formGroup,children:[(0,a.jsx)("label",{className:c().label,children:"거래 가격"}),(0,a.jsx)("input",{type:"number",className:c().input,value:_,onChange:e=>m(e.target.value)})]}),(0,a.jsxs)("div",{className:c().formGroup,children:[(0,a.jsx)("label",{className:c().label,children:"거래 금액 ($)"}),(0,a.jsx)("input",{type:"number",className:c().input,value:p,onChange:e=>x(e.target.value)})]}),(0,a.jsxs)("p",{className:c().maxInfo,children:["최대 거래 가능 금액: $",N.toFixed(2)]}),(0,a.jsxs)("p",{className:c().maxInfo,children:["사용 가능한 자산: $",d.toFixed(2)]}),(0,a.jsx)("button",{className:c().submitButton,onClick:()=>{let e=parseFloat(p),s=parseFloat(_);if(isNaN(e)||isNaN(s)){alert("거래 가격과 거래 금액을 올바르게 입력해주세요.");return}if(e<=0||s<=0){alert("거래 가격과 거래 금액은 0보다 커야 합니다.");return}let a=e/n;if(a>d){alert("거래 금액이 최대 가능 금액을 초과합니다. 최대 거래 가능 금액은 $".concat(N.toFixed(2),"입니다."));return}let i=e*t/100,l=e-i;r({price:s,amount:l,remainingAmount:l,fee:i,partialExits:[],type:h,feeRate:t,margin:a}),m(""),x("")},children:"포지션 추가"})]})}var u=s(7258),_=s.n(u);function m(e){let{onPartialExit:t}=e,[s,n]=(0,i.useState)(0),[l,r]=(0,i.useState)(0);return(0,a.jsxs)("div",{className:_().container,children:[(0,a.jsx)("h4",{className:_().title,children:"분할 청산"}),(0,a.jsxs)("div",{className:_().formGroup,children:[(0,a.jsx)("label",{className:_().label,children:"청산 가격"}),(0,a.jsx)("input",{type:"number",className:_().input,value:s,onChange:e=>n(Number(e.target.value))})]}),(0,a.jsxs)("div",{className:_().formGroup,children:[(0,a.jsx)("label",{className:_().label,children:"청산 퍼센트 (%)"}),(0,a.jsx)("input",{type:"number",className:_().input,value:l,onChange:e=>r(Number(e.target.value))})]}),(0,a.jsx)("button",{className:_().button,onClick:()=>{if(s<=0){alert("청산 가격은 0보다 커야 합니다.");return}if(l<=0||l>100){alert("청산 퍼센트는 0보다 크고 100 이하여야 합니다.");return}t(s,l),n(0),r(0)},children:"분할 청산"})]})}var p=s(5621),x=s.n(p);function h(e){let{index:t,position:s,positions:n,updatePositions:l,leverage:r,deletePosition:o,updateUsedMargin:c,setCurrentAsset:d}=e,[u,_]=(0,i.useState)(!1);(0,i.useEffect)(()=>{s.isClosed&&!s.assetUpdated&&(c(-s.margin),s.assetUpdated=!0)},[s.isClosed]);let p=()=>{let e=0;return s.partialExits.forEach(t=>{e+=t.pnl}),e-=s.fee,s.partialExits.forEach(t=>{e-=t.fee}),e},h=e=>{let a=[...n],i=a[t],r=i.partialExits[e],o={...s};o.remainingAmount+=r.amount,o.partialExits.splice(e,1),d(e=>e-r.pnl+r.fee),i.isClosed&&(c(i.margin),i.isClosed=!1,i.assetUpdated=!1),l(a)},j=e=>e*s.feeRate/100,N=(e,t,s,a)=>"long"===a?s*(t-e)/e:s*(e-t)/e;return(0,a.jsxs)("div",{className:x().card,children:[(0,a.jsxs)("div",{className:x().summary,onClick:()=>_(!u),children:[(0,a.jsxs)("h3",{className:x().title,children:["포지션 ",t+1," - ","long"===s.type?"롱":"숏"]}),(0,a.jsxs)("p",{children:["진입 가격: ",s.price]}),(0,a.jsxs)("p",{children:["상태:"," ",s.isClosed?(0,a.jsx)("span",{className:x().closed,children:"종료"}):(0,a.jsx)("span",{className:x().open,children:"진행 중"})]})]}),u&&(0,a.jsxs)("div",{className:x().details,children:[(0,a.jsxs)("p",{children:["총 금액: $",s.amount.toFixed(2)]}),(0,a.jsxs)("p",{children:["남은 금액: $",s.remainingAmount.toFixed(2)]}),(0,a.jsxs)("p",{children:["진입 수수료: $",s.fee.toFixed(2)]}),!s.isClosed&&(0,a.jsx)(m,{onPartialExit:(e,a)=>{let i=s.remainingAmount*a/100,r=j(i),o=i-r,u=N(s.price,e,o,s.type),_={...s,remainingAmount:s.remainingAmount-i,partialExits:[...s.partialExits,{price:e,amount:o,fee:r,pnl:u}]};_.remainingAmount<=0&&(_.isClosed=!0,s.assetUpdated||(c(-s.margin),_.assetUpdated=!0));let m=[...n];m[t]=_,l(m),d(e=>e+u-r)}}),(0,a.jsx)("button",{className:x().deleteButton,onClick:()=>{s.isClosed||c(-s.margin),o(t)},children:"포지션 삭제"}),s.partialExits.length>0&&(0,a.jsxs)("div",{className:x().exitHistory,children:[(0,a.jsx)("h4",{className:x().subtitle,children:"청산 내역"}),(0,a.jsxs)("table",{className:x().table,children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:"가격"}),(0,a.jsx)("th",{children:"금액 ($)"}),(0,a.jsx)("th",{children:"수수료 ($)"}),(0,a.jsx)("th",{children:"손익 ($)"}),(0,a.jsx)("th",{children:"액션"})]})}),(0,a.jsx)("tbody",{children:s.partialExits.map((e,t)=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:e.price}),(0,a.jsx)("td",{children:e.amount.toFixed(2)}),(0,a.jsx)("td",{children:e.fee.toFixed(2)}),(0,a.jsx)("td",{children:e.pnl.toFixed(2)}),(0,a.jsx)("td",{children:(0,a.jsx)("button",{className:x().deleteButton,onClick:()=>h(t),children:"삭제"})})]},t))})]})]}),s.isClosed&&(0,a.jsxs)("div",{className:x().pnlContainer,children:[(0,a.jsx)("p",{className:x().pnlLabel,children:"포지션 손익:"}),(0,a.jsxs)("p",{className:"".concat(x().pnlValue," ").concat(p()>=0?x().profit:x().loss),children:["$",p().toFixed(2)]})]})]})]})}var j=s(4466),N=s.n(j);function g(e){let{positions:t,updatePositions:s,leverage:i,updateUsedMargin:n,setCurrentAsset:l}=e,r=t.filter(e=>!e.isClosed),o=t.filter(e=>e.isClosed),c=e=>{let a=t[e];s(t.filter((t,s)=>s!==e)),n(-a.margin)};return(0,a.jsxs)("div",{className:N().container,children:[(0,a.jsx)("h2",{className:N().title,children:"포지션 목록"}),0===r.length?(0,a.jsx)("p",{className:N().emptyText,children:"오픈된 포지션이 없습니다."}):r.map((e,r)=>(0,a.jsx)(h,{index:t.indexOf(e),position:e,positions:t,updatePositions:s,leverage:i,deletePosition:c,updateUsedMargin:n,setCurrentAsset:l},r)),o.length>0&&(0,a.jsxs)("div",{className:N().closedPositions,children:[(0,a.jsx)("h3",{className:N().subtitle,children:"종료된 포지션"}),o.map((e,r)=>(0,a.jsx)(h,{index:t.indexOf(e),position:e,positions:t,updatePositions:s,leverage:i,deletePosition:c,updateUsedMargin:n,setCurrentAsset:l},r))]})]})}var b=s(6300),f=s.n(b);function v(e){let{positions:t,leverage:s,initialAsset:n,setCurrentAsset:l}=e,r=(()=>{let e=0,s=0,a=0;t.forEach(t=>{let i=0;t.partialExits.forEach(e=>{i+=e.pnl}),i-=t.fee,t.partialExits.forEach(e=>{i-=e.fee}),t.isClosed&&(e+=i,i>=0?s+=1:a+=1)});let i=s+a>0?s/(s+a)*100:0,l=n+e;return{totalPnL:e,wins:s,losses:a,winRate:i,finalAsset:l}})();return(0,i.useEffect)(()=>{l(r.finalAsset)},[r.finalAsset,l]),(0,a.jsxs)("div",{className:f().card,children:[(0,a.jsx)("h2",{className:f().title,children:"총 손익 및 통계"}),(0,a.jsxs)("div",{className:f().statItem,children:[(0,a.jsx)("span",{children:"총 손익:"}),(0,a.jsxs)("span",{className:"".concat(f().amount," ").concat(r.totalPnL>=0?f().profit:f().loss),children:["$",r.totalPnL.toFixed(2)]})]}),(0,a.jsxs)("div",{className:f().statItem,children:[(0,a.jsx)("span",{children:"승리 수:"}),(0,a.jsx)("span",{children:r.wins})]}),(0,a.jsxs)("div",{className:f().statItem,children:[(0,a.jsx)("span",{children:"패배 수:"}),(0,a.jsx)("span",{children:r.losses})]}),(0,a.jsxs)("div",{className:f().statItem,children:[(0,a.jsx)("span",{children:"승률:"}),(0,a.jsxs)("span",{children:[r.winRate.toFixed(2),"%"]})]}),(0,a.jsxs)("div",{className:f().statItem,children:[(0,a.jsx)("span",{children:"최종 자산:"}),(0,a.jsxs)("span",{children:["$",r.finalAsset.toFixed(2)]})]})]})}var I=s(5717),C=s.n(I);function P(){let[e,t]=(0,i.useState)(1e3),[s,n]=(0,i.useState)(1e3),[l,o]=(0,i.useState)(1),[c,u]=(0,i.useState)(.1),[_,m]=(0,i.useState)([]),[p,x]=(0,i.useState)(0),[h,j]=(0,i.useState)(!1);(0,i.useEffect)(()=>{let e=localStorage.getItem("backtesterData");if(e){let s=JSON.parse(e);t(s.initialAsset||1e3),n(s.currentAsset||s.initialAsset||1e3),o(s.leverage||1),u(s.feeRate||.1),m(s.positions||[]),x(s.usedMargin||0)}},[]),(0,i.useEffect)(()=>{localStorage.setItem("backtesterData",JSON.stringify({initialAsset:e,currentAsset:s,leverage:l,feeRate:c,positions:_,usedMargin:p}))},[e,s,l,c,_,p]);let N=()=>{t(1e3),n(1e3),o(1),u(.1),m([]),x(0),localStorage.removeItem("backtesterData")};return(0,a.jsxs)("div",{className:C().container,children:[(0,a.jsx)("h1",{className:C().title,children:"가상화폐 백테스트 계산기"}),(0,a.jsx)(r,{initialAsset:e,setInitialAsset:t,isTrading:h,startTrading:()=>{j(!0)},stopTrading:()=>{j(!1),N()},resetSettings:N}),h&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d,{feeRate:c,setFeeRate:u,leverage:l,setLeverage:o,addPosition:e=>{m([..._,e]),x(t=>t+e.margin),n(t=>t-e.margin)},initialAsset:e,currentAsset:s,usedMargin:p}),(0,a.jsx)(g,{positions:_,updatePositions:e=>{m(e),x(e.reduce((e,t)=>e+t.margin,0))},leverage:l,updateUsedMargin:e=>{x(t=>t+e)},setCurrentAsset:n}),(0,a.jsx)(v,{positions:_,leverage:l,initialAsset:e,currentAsset:s,setCurrentAsset:n})]})]})}},7258:e=>{e.exports={container:"PartialExitForm_container__KCSlF",title:"PartialExitForm_title__tRCw2",formGroup:"PartialExitForm_formGroup__CDk7q",label:"PartialExitForm_label__rZC28",input:"PartialExitForm_input__rVQok",button:"PartialExitForm_button__sf0YC"}},5621:e=>{e.exports={card:"PositionItem_card__5lsbc",title:"PositionItem_title__td54O",subtitle:"PositionItem_subtitle__wiwpn",exitHistory:"PositionItem_exitHistory__RIGVR",table:"PositionItem_table__J1kVq",closedMessage:"PositionItem_closedMessage__0RwP0",pnlContainer:"PositionItem_pnlContainer__h7Pbl",pnlLabel:"PositionItem_pnlLabel__t9EO6",pnlValue:"PositionItem_pnlValue__s__3h",profit:"PositionItem_profit__Z_KHz",loss:"PositionItem_loss__G9m4D",deleteButton:"PositionItem_deleteButton__hGJsD",summary:"PositionItem_summary__DnCAw",details:"PositionItem_details__Qn0s2",closed:"PositionItem_closed__IjdpQ",open:"PositionItem_open__ahyrh"}},4466:e=>{e.exports={container:"PositionList_container__c97Oa",title:"PositionList_title__xKbjA",emptyText:"PositionList_emptyText__Cp4yA",closedPositions:"PositionList_closedPositions__osWi5",subtitle:"PositionList_subtitle__kzAxQ"}},1946:e=>{e.exports={card:"Settings_card__Ga0IN",title:"Settings_title__y3jk2",formGroup:"Settings_formGroup__E6_56",label:"Settings_label__nxs_r",input:"Settings_input__vaB7U",buttonGroup:"Settings_buttonGroup__or0a6",startButton:"Settings_startButton__vi5LB",resetButton:"Settings_resetButton__i2uuc",disabled:"Settings_disabled__tQkHO",stopButton:"Settings_stopButton__3IT4h"}},6300:e=>{e.exports={card:"TotalPnL_card__mM7f7",title:"TotalPnL_title__zNXCI",statItem:"TotalPnL_statItem__pe9ya",amount:"TotalPnL_amount__4L__I",profit:"TotalPnL_profit__7asan",loss:"TotalPnL_loss__sMs1H"}},748:e=>{e.exports={card:"TradeInput_card__QCqD8",title:"TradeInput_title__HYtWc",typeSelector:"TradeInput_typeSelector__JBL0K",typeButton:"TradeInput_typeButton__wJ8CT",long:"TradeInput_long__eA_jN",short:"TradeInput_short__j0OaS",selectedLong:"TradeInput_selectedLong__TXl6X",selectedShort:"TradeInput_selectedShort__5egKX",formGroup:"TradeInput_formGroup__cBCMf",label:"TradeInput_label__D3TFi",input:"TradeInput_input__jcX_m",maxInfo:"TradeInput_maxInfo__2q_xc",submitButton:"TradeInput_submitButton__4pxvT"}},5717:e=>{e.exports={container:"page_container__jZF7q",title:"page_title__po7na",resetButton:"page_resetButton__uvLeL"}}},e=>{var t=t=>e(e.s=t);e.O(0,[633,441,517,358],()=>t(9784)),_N_E=e.O()}]);