(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){},27:function(e,t,a){e.exports=a(57)},57:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(24),r=a.n(i),s=a(6),c=a(7),m=a(9),o=a(8),d=a(10),u=(a(11),a(58)),w=a(61),y=a(60),g=a(12),p=a.n(g),b=a(13),h=a(14),E=a.n(h),N=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(m.a)(this,Object(o.a)(t).call(this))).onClick=function(e){document.getElementById("img01").src=e.src,document.getElementById("modal01").style.display="block",document.getElementById("caption").innerHTML=e.alt},e.componentDidMount=function(){document.getElementById("mySidebar").style.display="none",document.getElementById("myOverlay").style.display="none"},e.componentDidUpdate=function(){0===e.state.loaded?e.modalClose():e.modalOpen()},e.handleSubmit=function(){var t=Object(b.a)(p.a.mark(function t(a){var n,l;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),e.setState({loaded:1}),n=new FormData,e.state.selectedFiles&&e.state.selectedFiles.length>0&&(l=1,Object.keys(e.state.selectedFiles).forEach(function(t){l++,n.append("file".concat(l),e.state.selectedFiles[t])})),n.append("fileNumber",e.state.fileNumber),n.append("registrationNumber",e.state.registrationNumber),n.append("surveyorName",e.state.surveyorName),t.next=9,E.a.post("/upload",n).then(function(t){var a=t.data;e.setState({msgStatus:a.message,msgType:200!==a.code?"e":"ne",loaded:0})}).catch(function(t){e.setState({msgStatus:"Some Technical issue!",msgType:"e",loaded:0})});case 9:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.handleSelectedFile=function(t){e.setState({selectedFiles:t.target.files})},e.handleFileNumber=function(t){e.setState({fileNumber:t.target.value})},e.handleRegistrationNumber=function(t){e.setState({registrationNumber:t.target.value})},e.handleSurveyorName=function(t){e.setState({surveyorName:t.target.value})},e.state={selectedFiles:null,loaded:0,fileNumber:"",registrationNumber:"",surveyorName:"",msgStatus:"",msgType:""},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"modalOpen",value:function(){document.getElementById("myOverlayN").style.display="block"}},{key:"modalClose",value:function(){document.getElementById("myOverlayN").style.display="none"}},{key:"render",value:function(){return l.a.createElement("div",{className:"w3-container w3-light-grey w3-padding-32 w3-padding-large",id:"add"},l.a.createElement("div",{className:"w3-content",style:{maxWidth:"600px"}},l.a.createElement("form",{onSubmit:this.handleSubmit,encType:"multipart/form-data",id:"surveyForm"},l.a.createElement("h4",{className:"w3-center"},l.a.createElement("b",null,"REPORT ACCIDENT")),l.a.createElement("div",{className:"e"===this.state.msgType?"w3-text-red":"w3-text-green"},this.state.msgStatus),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"File Number"),"*",l.a.createElement("input",{value:this.state.fileNumber,className:"w3-input w3-border",type:"text",name:"File Number",onChange:this.handleFileNumber,pattern:"[0-9]*",maxLength:"8",required:!0})),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"Vehicle Registration Number"),"*",l.a.createElement("input",{value:this.state.registrationNumber,className:"w3-input w3-border",type:"text",name:"Registration Number",onChange:this.handleRegistrationNumber,required:!0})),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"Surveyor Code"),"*",l.a.createElement("input",{value:this.state.surveyorName,className:"w3-input w3-border",type:"text",name:"Surveyor",onChange:this.handleSurveyorName,required:!0})),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"Upload Photos"),l.a.createElement("input",{className:"w3-input w3-border",type:"file",name:"imgUploader[]",onChange:this.handleSelectedFile,multiple:!0})),l.a.createElement("button",{type:"submit",className:"w3-button w3-block w3-black w3-margin-bottom"},"Submit Report"))))}}]),t}(n.Component),v=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(m.a)(this,Object(o.a)(t).call(this))).onClick=function(e){document.getElementById("img01").src=e.src,document.getElementById("modal01").style.display="block",document.getElementById("caption").innerHTML=e.alt},e.componentDidMount=function(){document.getElementById("mySidebar").style.display="none",document.getElementById("myOverlay").style.display="none"},e.handleSubmit=function(){var t=Object(b.a)(p.a.mark(function t(a){var n,l;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),n=new FormData,e.state.selectedFiles&&e.state.selectedFiles.length>0&&(l=1,Object.keys(e.state.selectedFiles).forEach(function(t){l++,n.append("file".concat(l),e.state.selectedFiles[t])})),n.append("fileNumber",e.state.fileNumber),n.append("registrationNumber",e.state.registrationNumber),t.next=7,E.a.get("/search/"+e.state.fileNumber+"/"+e.state.registrationNumber).then(function(t){var a=t.data;e.setState({msgStatus:"",msgType:200!==a.code?"e":"ne",surveyorName:a.message.imageData,loaded:0})}).catch(function(t){e.setState({msgStatus:"Some Technical issue!",msgType:"e",loaded:0})});case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.handleSelectedFile=function(t){e.setState({selectedFiles:t.target.files})},e.handleFileNumber=function(t){e.setState({fileNumber:t.target.value})},e.handleRegistrationNumber=function(t){e.setState({registrationNumber:t.target.value})},e.handleSurveyorName=function(t){e.setState({surveyorName:t.target.value})},e.state={selectedFiles:null,loaded:0,fileNumber:"",registrationNumber:"",surveyorName:"",msgStatus:"",msgType:""},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"w3-container w3-light-grey w3-padding-32 w3-padding-large",id:"add"},l.a.createElement("div",{className:"w3-content",style:{maxWidth:"600px"}},l.a.createElement("form",{onSubmit:this.handleSubmit,encType:"multipart/form-data",id:"surveyForm"},l.a.createElement("h4",{className:"w3-center"},l.a.createElement("b",null,"SEARCH IMAGES")),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"File Number*"),l.a.createElement("input",{value:this.state.fileNumber,className:"w3-input w3-border",type:"text",name:"File Number",onChange:this.handleFileNumber,required:!0})),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"Vehicle Registration Number*"),l.a.createElement("input",{value:this.state.registrationNumber,className:"w3-input w3-border",type:"text",name:"Registration Number",onChange:this.handleRegistrationNumber,required:!0})),l.a.createElement("button",{type:"submit",className:"w3-button w3-block w3-black w3-margin-bottom"},"Search Pictures"))),l.a.createElement("div",{className:"e"===this.state.msgType?"w3-text-red":"w3-text-green"},this.state.msgStatus),l.a.createElement("div",{className:"w3-quarter"},this.state.surveyorName&&this.state.surveyorName.map(function(e){return l.a.createElement("img",{key:e.name,name:e.name,src:"data:image/jpeg;base64,".concat(e.obj),alt:""})})))}}]),t}(n.Component),f=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"showModal",value:function(e){document.getElementById("img01").src=e.src,document.getElementById("modal01").style.display="block",document.getElementById("caption").innerHTML=e.alt}},{key:"hideModal",value:function(e){document.getElementById("modal01").style.display="none"}},{key:"componentDidMount",value:function(){document.getElementById("mySidebar").style.display="none",document.getElementById("myOverlay").style.display="none"}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"w3-row w3-grayscale-min",id:"view"},l.a.createElement("div",{className:"w3-quarter"},l.a.createElement("img",{src:"/w3images/girl.jpg",style:{width:"100%"},onClick:this.showModal,alt:"Canoeing again"}),l.a.createElement("img",{src:"/w3images/boy.jpg",style:{width:"100%"},onClick:this.showModal,alt:"Quiet day at the beach. Cold, but beautiful"}),l.a.createElement("img",{src:"/w3images/girl.jpg",style:{width:"100%"},onClick:this.showModal,alt:"The Beach. Me. Alone. Beautiful"})),l.a.createElement("div",{className:"w3-quarter"},l.a.createElement("img",{src:"/w3images/girl_train.jpg",style:{width:"100%"},onClick:this.showModal,alt:"A girl, and a train passing"}),l.a.createElement("img",{src:"/w3images/man_bench.jpg",style:{width:"100%"},onClick:this.showModal,alt:"Waiting for the bus in the desert"}),l.a.createElement("img",{src:"/w3images/natureboy.jpg",style:{width:"100%"},onClick:this.showModal,alt:"Nature again.. At its finest!"})),l.a.createElement("div",{className:"w3-quarter"},l.a.createElement("img",{src:"/w3images/man_bench.jpg",style:{width:"100%"},onClick:this.showModal,alt:"Waiting for the bus in the desert"}),l.a.createElement("img",{src:"/w3images/girl_mountain.jpg",style:{width:"100%"},onClick:this.showModal,alt:"What a beautiful scenery this sunset"}),l.a.createElement("img",{src:"/w3images/closegirl.jpg",style:{width:"100%"},onClick:this.showModal,alt:"The Beach. Me. Alone. Beautiful"})),l.a.createElement("div",{className:"w3-quarter"},l.a.createElement("img",{src:"/w3images/natureboy.jpg",style:{width:"100%"},onClick:this.showModal,alt:"A boy surrounded by beautiful nature"}),l.a.createElement("img",{src:"/w3images/girl_train.jpg",style:{width:"100%"},onClick:this.showModal,alt:"A girl, and a train passing"}),l.a.createElement("img",{src:"/w3images/boy.jpg",style:{width:"100%"},onClick:this.showModal,alt:"Quiet day at the beach. Cold, but beautiful"}))),l.a.createElement("div",{className:"w3-center w3-padding-32"},l.a.createElement("div",{className:"w3-bar"},l.a.createElement("a",{href:"#a",className:"w3-bar-item w3-button w3-hover-black"},"\xab"),l.a.createElement("a",{href:"#a",className:"w3-bar-item w3-black w3-button"},"1"),l.a.createElement("a",{href:"#a",className:"w3-bar-item w3-button w3-hover-black"},"2"),l.a.createElement("a",{href:"#a",className:"w3-bar-item w3-button w3-hover-black"},"3"),l.a.createElement("a",{href:"#a",className:"w3-bar-item w3-button w3-hover-black"},"4"),l.a.createElement("a",{href:"#a",className:"w3-bar-item w3-button w3-hover-black"},"\xbb"))),l.a.createElement("div",{id:"modal01",className:"w3-modal w3-black",style:{paddingTop:0},onClick:this.hideModal},l.a.createElement("span",{className:"w3-button w3-black w3-xlarge w3-display-topright"},"\xd7"),l.a.createElement("div",{className:"w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64"},l.a.createElement("img",{id:"img01",className:"w3-image",alt:""}),l.a.createElement("p",{id:"caption"}))))}}]),t}(n.Component),k=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"onClick",value:function(e){document.getElementById("img01").src=e.src,document.getElementById("modal01").style.display="block",document.getElementById("caption").innerHTML=e.alt}},{key:"render",value:function(){return l.a.createElement("div",{className:"w3-container w3-dark-grey w3-center w3-text-light-grey w3-padding-32",id:"about"},l.a.createElement("h4",null,l.a.createElement("b",null,"About Me")),l.a.createElement("img",{src:"/w3images/avatar_hat.jpg",alt:"Me",className:"w3-image w3-padding-32",width:"600",height:"650"}),l.a.createElement("div",{className:"w3-content w3-justify",style:{maxWidth:"600px"}},l.a.createElement("h4",null,"My Name"),l.a.createElement("p",null,"Some text about me. I love taking photos of PEOPLE. I am lorem ipsum consectetur adipiscing elit, sed do"),l.a.createElement("p",null,"mail: example@example.com"),l.a.createElement("p",null,"tel: 5353 35531")))}}]),t}(n.Component),S=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"onClick",value:function(e){document.getElementById("img01").src=e.src,document.getElementById("modal01").style.display="block",document.getElementById("caption").innerHTML=e.alt}},{key:"componentDidMount",value:function(){document.getElementById("mySidebar").style.display="none",document.getElementById("myOverlay").style.display="none"}},{key:"render",value:function(){return l.a.createElement("div",{className:"w3-container w3-light-grey w3-padding-32 w3-padding-large",id:"contact"},l.a.createElement("div",{className:"w3-content",style:{maxWidth:"600px"}},l.a.createElement("h4",{className:"w3-center"},l.a.createElement("b",null,"Contact Me")),l.a.createElement("p",null,"Do you want me to photograph you? Fill out the form and fill me in with the details :) I love meeting new people!"),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"Name"),l.a.createElement("input",{className:"w3-input w3-border",type:"text",name:"Name",required:!0})),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"Email"),l.a.createElement("input",{className:"w3-input w3-border",type:"text",name:"Email",required:!0})),l.a.createElement("div",{className:"w3-section"},l.a.createElement("label",null,"Message"),l.a.createElement("input",{className:"w3-input w3-border",type:"text",name:"Message",required:!0})),l.a.createElement("button",{type:"submit",className:"w3-button w3-block w3-black w3-margin-bottom"},"Send Message")))}}]),t}(n.Component),O={marginTop:"83px"},j=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"onClick",value:function(e){document.getElementById("img01").src=e.src,document.getElementById("modal01").style.display="block",document.getElementById("caption").innerHTML=e.alt}},{key:"w3Open",value:function(){document.getElementById("mySidebar").style.display="block",document.getElementById("myOverlay").style.display="block"}},{key:"w3Close",value:function(){document.getElementById("mySidebar").style.display="none",document.getElementById("myOverlay").style.display="none"}},{key:"componentDidUpdate",value:function(){document.getElementById("mySidebar").style.display="none",document.getElementById("myOverlay").style.display="none"}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("nav",{className:"w3-sidebar w3-bar-block w3-black w3-animate-right w3-top w3-text-light-grey w3-large",style:{zIndex:3,width:"250px",fontWeight:"bold",display:"none",right:0},id:"mySidebar"},l.a.createElement("div",{onClick:this.w3Close,className:"w3-bar-item w3-button w3-center w3-padding-32"},"CLOSE"),l.a.createElement(u.a,{to:"/",className:"w3-bar-item w3-button w3-center w3-padding-16"},"ADD FILE"),l.a.createElement(u.a,{to:"/search",className:"w3-bar-item w3-button w3-center w3-padding-16"},"SEARCH FILE"),l.a.createElement(u.a,{to:"/view",className:"w3-bar-item w3-button w3-center w3-padding-16"},"VIEW FILE"),l.a.createElement(u.a,{to:"/about",className:"w3-bar-item w3-button w3-center w3-padding-16"},"ABOUT US"),l.a.createElement(u.a,{to:"/contact",className:"w3-bar-item w3-button w3-center w3-padding-16"},"CONTACT")),l.a.createElement("header",{className:"w3-container w3-top w3-white w3-xlarge w3-padding-16"},l.a.createElement("span",{className:"w3-left w3-padding"},"React JS Learning"),l.a.createElement("div",{href:"#1",className:"w3-right w3-button w3-white",onClick:this.w3Open},"\u2630")),l.a.createElement("div",{className:"w3-overlay w3-animate-opacity",onClick:this.w3Close,style:{cursor:"pointer"},title:"close side menu",id:"myOverlay"}),l.a.createElement("div",{className:"w3-overlay w3-animate-opacity",style:{cursor:"pointer"},title:"close side menu",id:"myOverlayN"}),l.a.createElement("div",{className:"w3-main w3-content",style:O},l.a.createElement(w.a,null,l.a.createElement(y.a,{exact:!0,path:"/",component:N}),l.a.createElement(y.a,{path:"/search",component:v}),l.a.createElement(y.a,{path:"/view",component:f}),l.a.createElement(y.a,{path:"/about",component:k}),l.a.createElement(y.a,{path:"/contact",component:S})),l.a.createElement("div",{className:"w3-black w3-center w3-padding-24"},"Powered by")))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=a(59);r.a.render(l.a.createElement(C.a,null,l.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,2,1]]]);
//# sourceMappingURL=main.8f9d59c5.chunk.js.map