(this["webpackJsonpboi-bag-of-crafting"]=this["webpackJsonpboi-bag-of-crafting"]||[]).push([[0],{12:function(t,E,e){},13:function(t,E,e){},15:function(t,E,e){"use strict";e.r(E);var n=e(1),a=e.n(n),c=e(3),i=e.n(c),R=(e(12),e(4)),o=e(5),A=e(7),T=e(6),_=(e(13),{EMPTY:0,RED_HEART:1,SOUL_HEART:2,BLACK_HEART:3,ETERNAL_HEART:4,GOLD_HEART:5,BONE_HEART:6,ROTTEN_HEART:7,PENNY:8,NICKEL:9,DIME:10,LUCKY_PENNY:11,KEY:12,GOLDEN_KEY:13,CHARGED_KEY:14,BOMB:15,GOLDEN_BOMB:16,GIGA_BOMB:17,MICRO_BATTERY:18,LIL_BATTERY:19,MEGA_BATTERY:20,CARD:21,PILL:22,RUNE:23,DICE_SHARD:24,CRACKED_KEY:25}),s={EMPTY:"EMPTY",RED_HEART:"RED_HEART",SOUL_HEART:"SOUL_HEART",BLACK_HEART:"BLACK_HEART",ETERNAL_HEART:"ETERNAL_HEART",GOLD_HEART:"GOLD_HEART",BONE_HEART:"BONE_HEART",ROTTEN_HEART:"ROTTEN_HEART",PENNY:"PENNY",NICKEL:"NICKEL",DIME:"DIME",LUCKY_PENNY:"LUCKY_PENNY",KEY:"KEY",GOLDEN_KEY:"GOLDEN_KEY",CHARGED_KEY:"CHARGED_KEY",BOMB:"BOMB",GOLDEN_BOMB:"GOLDEN_BOMB",GIGA_BOMB:"GIGA_BOMB",MICRO_BATTERY:"MICRO_BATTERY",LIL_BATTERY:"LIL_BATTERY",MEGA_BATTERY:"MEGA_BATTERY",CARD:"CARD",PILL:"PILL",RUNE:"RUNE",DICE_SHARD:"DICE_SHARD",CRACKED_KEY:"CRACKED_KEY"},r=[s.RED_HEART,s.SOUL_HEART,s.BLACK_HEART,s.KEY,s.BOMB,s.PENNY,s.NICKEL,s.DIME,s.CARD,s.PILL,s.RUNE,s.MICRO_BATTERY,s.LIL_BATTERY],O=[s.ETERNAL_HEART,s.GOLD_HEART,s.BONE_HEART,s.ROTTEN_HEART,s.LUCKY_PENNY,s.CHARGED_KEY,s.GOLDEN_BOMB,s.GIGA_BOMB,s.DICE_SHARD,s.CRACKED_KEY,s.MEGA_BATTERY],B=function(t){var E=2*t,e=2*Math.floor(E/16);return"".concat(-E%16-.1,"rem ").concat(-e-.1,"rem")},N=e(0),L=function(t,E){return t.map((function(t,e){var n=function(t){return _[t]}(t),a="componentButton component-".concat(n);return Object(N.jsx)("div",{className:"component",children:Object(N.jsx)("button",{className:a,style:{backgroundPosition:"".concat(B(n))},onClick:function(){E(t,e)}},"componentName-".concat(e))})}))},C=function(t){Object(A.a)(e,t);var E=Object(T.a)(e);function e(t){var n;return Object(R.a)(this,e),(n=E.call(this,t)).state={bagItems:[]},n}return Object(o.a)(e,[{key:"addItemToBag",value:function(t){var E=this.state.bagItems;E.length>=8&&E.shift(),E.push(t),this.setState({bagItems:E})}},{key:"removeItemFromBag",value:function(t){var E=this.state.bagItems;E.splice(t,1),this.setState({bagItems:E})}},{key:"render",value:function(){var t=this;return Object(N.jsx)("div",{className:"app",children:Object(N.jsxs)("div",{id:"boi-crafting-ui",className:"craftingContainer",children:[Object(N.jsx)("div",{id:"boi-component-page1",className:"componentPage",children:L(r,(function(E){t.addItemToBag(E)}))}),Object(N.jsx)("div",{id:"boi-crafting-page",className:"craftingPage",children:Object(N.jsx)("div",{id:"boi-crafting-page-item-list",className:"craftingPageItems",children:L(this.state.bagItems,(function(E,e){t.removeItemFromBag(e)}))})}),Object(N.jsx)("div",{id:"boi-component-page2",className:"componentPage",children:L(O,(function(E){t.addItemToBag(E)}))})]})})}}]),e}(n.Component),I=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,16)).then((function(E){var e=E.getCLS,n=E.getFID,a=E.getFCP,c=E.getLCP,i=E.getTTFB;e(t),n(t),a(t),c(t),i(t)}))};i.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsx)(C,{})}),document.getElementById("root")),I()}},[[15,1,2]]]);
//# sourceMappingURL=main.a25367ba.chunk.js.map