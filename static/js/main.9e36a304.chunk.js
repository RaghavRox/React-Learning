(this.webpackJsonplearningapp=this.webpackJsonplearningapp||[]).push([[0],{20:function(e,t,n){"use strict";n.r(t);var a=n(10),r=n(7),c=n.n(r),i=n(15),s=n(11),o=n(12),u=n(14),d=n(13),l=n(6),f=n.n(l),p=n(19),h=n.n(p),j=n(16),b=(n(29),n(27),n(2)),v={apiKey:"AIzaSyBTp6wE7s53_l8p_NlK85MawnVkaE-Nskw",authDomain:"react-learning-b601c.firebaseapp.com",projectId:"react-learning-b601c",storageBucket:"react-learning-b601c.appspot.com",messagingSenderId:"204682177164",appId:"1:204682177164:web:feef8528c6d49558ef29a9",measurementId:"G-N7KP9MCCZ7"},O=null,C=new RTCPeerConnection({iceServers:[{urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]}],iceCandidatePoolSize:10}),g=null,w=new MediaStream,x=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).vidRef=f.a.createRef(),a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.startStream()}},{key:"startStream",value:function(){var e=Object(i.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia({video:!0,audio:!1});case 2:(g=e.sent).getTracks().forEach((function(e){C.addTrack(e,g)})),this.vidRef.current.srcObject=g,this.vidRef.current.play();case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(b.jsx)("div",{children:Object(b.jsx)("video",{ref:this.vidRef,width:"360",height:"240"})})}}]),n}(f.a.Component),m=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).vidRef=f.a.createRef(),a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.startStream()}},{key:"startStream",value:function(){var e=Object(i.a)(c.a.mark((function e(){var t=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.ontrack=function(e){e.streams[0].getTracks().forEach((function(e){w.addTrack(e)}))},setInterval((function(){t.vidRef.current.srcObject=w,t.vidRef.current.play()}),1e3);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(b.jsx)("div",{children:Object(b.jsx)("video",{ref:this.vidRef,width:"360",height:"240"})})}}]),n}(f.a.Component),y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var r;return Object(s.a)(this,n),(r=t.call(this,e)).state={output:null},r.generateCall=r.generateCall.bind(Object(a.a)(r)),r}return Object(o.a)(n,[{key:"generateCall",value:function(){var e=Object(i.a)(c.a.mark((function e(){var t,n,a,r,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=O.collection("calls").doc(),n=t.collection("offerCandidates"),a=t.collection("answerCandidates"),this.setState({output:t.id}),C.onicecandidate=function(e){e.candidate&&n.add(e.candidate.toJSON())},e.next=7,C.createOffer();case 7:return r=e.sent,e.next=10,C.setLocalDescription(r);case 10:return i={sdp:r.sdp,type:r.type},e.next=13,t.set({offer:i});case 13:t.onSnapshot((function(e){var t=e.data();if(!C.currentRemoteDescription&&(null===t||void 0===t?void 0:t.answer)){var n=new RTCSessionDescription(t.answer);C.setRemoteDescription(n)}})),a.onSnapshot((function(e){e.docChanges().forEach((function(e){if("added"===e.type){var t=new RTCIceCandidate(e.doc.data());C.addIceCandidate(t)}}))}));case 15:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)("output",{children:this.state.output}),Object(b.jsx)("button",{onClick:this.generateCall,children:" GenerateCall"})]})}}]),n}(f.a.Component),k=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var r;return Object(s.a)(this,n),(r=t.call(this,e)).state={id:null},r.handleChange=r.handleChange.bind(Object(a.a)(r)),r.answerCall=r.answerCall.bind(Object(a.a)(r)),r}return Object(o.a)(n,[{key:"handleChange",value:function(e){this.setState({id:e.target.value})}},{key:"answerCall",value:function(){var e=Object(i.a)(c.a.mark((function e(){var t,n,a,r,i,s,o,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.id,n=O.collection("calls").doc(t),a=n.collection("answerCandidates"),r=n.collection("offerCandidates"),C.onicecandidate=function(e){e.candidate&&a.add(e.candidate.toJSON())},e.next=7,n.get();case 7:return i=e.sent.data(),s=i.offer,e.next=11,C.setRemoteDescription(new RTCSessionDescription(s));case 11:return e.next=13,C.createAnswer();case 13:return o=e.sent,e.next=16,C.setLocalDescription(o);case 16:return u={type:o.type,sdp:o.sdp},e.next=19,n.update({answer:u});case 19:r.onSnapshot((function(e){e.docChanges().forEach((function(e){if(console.log(e),"added"===e.type){var t=e.doc.data();C.addIceCandidate(new RTCIceCandidate(t))}}))}));case 20:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{type:"text",value:this.state.id,onChange:this.handleChange}),Object(b.jsx)("button",{onClick:this.answerCall,children:"Answer call"})]})}}]),n}(f.a.Component),R=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"componentDidMount",value:function(){j.a.apps.length||j.a.initializeApp(v),O=j.a.firestore()}},{key:"render",value:function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)(x,{}),Object(b.jsx)("br",{}),Object(b.jsx)(m,{}),Object(b.jsx)("br",{}),Object(b.jsx)(y,{}),Object(b.jsx)("br",{}),Object(b.jsx)(k,{})]})}}]),n}(f.a.Component);h.a.render(Object(b.jsx)(R,{}),document.getElementById("root"))},27:function(e,t,n){}},[[20,1,2]]]);
//# sourceMappingURL=main.9e36a304.chunk.js.map