(function(g){var window=this;var iya=function(a,b,c,d){var e=b.gc();g.S(a.element,"ytp-suggestion-set",!!e.videoId);var f=b.getPlaylistId();d=b.nd(c,d?d:"mqdefault.jpg");var k=b instanceof g.FP?g.nX(b.lengthSeconds):null,l=!!f;f=l&&"RD"==g.GR(f).type;var m=b instanceof g.FP?b.xa:null;c={title:b.title,author:b.author,author_and_views:e.shortViewCount?b.author+" \u2022 "+e.shortViewCount:b.author,watch:g.T("YTP_WATCH_VIDEO_OR_PLAYLIST",{TITLE:b.title},b.title),duration:k,url:b.un(c),is_live:m,is_list:l,is_mix:f,background:d?"background-image: url("+
d+")":""};b instanceof g.IR&&(c.playlist_length=b.getLength());a.update(c)},g7=function(a,b){g.mX.call(this,{H:"div",
ca:["html5-endscreen","ytp-player-content",b||"base-endscreen"]});this.o=a;this.N=!1},h7=function(a){var b={H:"span",
M:"ytp-upnext-top",K:[{H:"span",M:"ytp-upnext-header",K:[g.T("YTP_PLAYLIST_UP_NEXT")]},{H:"span",M:"ytp-upnext-title",K:["{{title}}"]},{H:"span",M:"ytp-upnext-author",K:["{{author}}"]}]},c={href:"{{url}}","aria-label":g.T("YTP_AUTOPLAY_NEXT")};b={H:"div",M:"ytp-upnext",R:{"aria-label":"{{watch}}"},K:[{H:"div",M:"ytp-cued-thumbnail-overlay-image",R:{style:"{{background}}"}},b,{H:"a",M:"ytp-upnext-autoplay-icon",R:c,K:[{H:"svg",R:{height:"100%",version:"1.1",viewBox:"0 0 98 98",width:"100%"},K:[{H:"circle",
M:"ytp-svg-autoplay-circle",R:{cx:"49",cy:"49",fill:"#000","fill-opacity":"0.8",r:"48"}},{H:"circle",M:"ytp-svg-autoplay-ring",R:{cx:"-49",cy:"49","fill-opacity":"0",r:"46.5",stroke:"#FFFFFF","stroke-dasharray":"293","stroke-dashoffset":"-293","stroke-width":"4",transform:"rotate(-90)"}},{H:"polygon",M:"ytp-svg-autoplay-triangle",R:{fill:"#fff",points:"32,27 72,49 32,71"}}]}]},{H:"span",M:"ytp-upnext-bottom",K:[{H:"span",M:"ytp-upnext-cancel"},{H:"span",M:"ytp-upnext-paused",K:[g.T("YTP_AUTOPLAY_PAUSED_3")]}]}]};
g.Y.call(this,b);this.B=null;b=this.sa["ytp-upnext-cancel"];this.B=new g.Y({H:"button",ca:["ytp-upnext-cancel-button","ytp-button"],R:{tabindex:"0","aria-label":g.T("YTP_AUTOPLAY_CANCEL")},K:[g.T("YTP_CANCEL")]});g.M(this,this.B);this.B.W("click",this.PN,this);this.B.za(b);this.o=a;this.J=this.sa["ytp-svg-autoplay-ring"];this.F=this.D=this.A=this.C=null;this.G=new g.ot(this.Jm,5E3,this);g.M(this,this.G);this.I=0;this.P(this.sa["ytp-upnext-autoplay-icon"],"click",this.WP);this.lA();this.P(a,"autonavvisibility",
this.lA);this.P(a,"mdxnowautoplaying",this.lP);this.P(a,"mdxautoplaycanceled",this.mP);this.P(a,"mdxautoplayupnext",this.DC);3==this.o.Va()&&(a=(a=g.kW(g.fW(this.o)))?a.lH():null)&&this.DC(a)},jya=function(a,b){a.C=b;
iya(a,b,g.X(a.o),"hqdefault.jpg")},i7=function(a,b){a.A||(g.rG("a11y-announce",g.T("YTP_PLAYLIST_UP_NEXT")+" "+a.C.title),a.I=g.DG(),a.A=new g.ot((0,g.z)(a.Kp,a,b),25),a.Kp(b));
g.Gp(a.element,"ytp-upnext-autoplay-paused")},k7=function(a){j7(a);
a.I=g.DG();a.Kp();g.R(a.element,"ytp-upnext-autoplay-paused")},j7=function(a){a.A&&(a.A.dispose(),a.A=null)},l7=function(a,b){b=void 0===b?!1:b;
var c=g.X(a.o);if(c.experiments.g("autonav_notifications")&&b&&window.Notification&&window.document.hasFocus){var d=window.Notification.permission;g.tW(a.o,"xwebnotifications",{permission:d});"default"==d?window.Notification.requestPermission():"granted"!=d||window.document.hasFocus()||(d=a.C.gc(),a.Jm(),a.D=new window.Notification(g.T("YTP_PLAYLIST_UP_NEXT"),{body:d.title,icon:d.nd(c)}),a.F=a.P(a.D,"click",a.MP),a.G.start())}j7(a);a.o.xj(!1,b)},kya=function(a){g7.call(this,a,"subscribecard-endscreen");
var b=a.ga();this.A=new g.Y({H:"div",M:"ytp-subscribe-card",K:[{H:"img",M:"ytp-author-image",R:{src:b.profilePicture}},{H:"div",M:"ytp-subscribe-card-right",K:[{H:"div",M:"ytp-author-name",K:[b.author]},{H:"div",M:"html5-subscribe-button-container"}]}]});g.M(this,this.A);this.A.za(this.element);this.B=new g.o1(g.T("YTP_SUBSCRIBE"),null,g.T("YTP_UNSUBSCRIBE"),null,!0,!1,b.El,b.subscribed,"trailer-endscreen",null,null,a);g.M(this,this.B);this.B.za(this.A.sa["html5-subscribe-button-container"]);this.hide()},
m7=function(a){var b=g.X(a);
b=b.A&&!b.D;g.Y.call(this,{H:"a",M:"ytp-videowall-still",R:{href:"{{url}}",target:b?"_blank":"","aria-label":"{{watch}}","data-is-live":"{{is_live}}","data-is-list":"{{is_list}}","data-is-mix":"{{is_mix}}"},K:[{H:"div",M:"ytp-videowall-still-image",R:{style:"{{background}}"}},{H:"span",M:"ytp-videowall-still-info",K:[{H:"span",M:"ytp-videowall-still-info-bg",K:[{H:"span",M:"ytp-videowall-still-info-content",R:g.$K||g.bf?{style:"will-change: opacity"}:void 0,K:[{H:"span",M:"ytp-videowall-still-info-title",
K:["{{title}}"]},{H:"span",M:"ytp-videowall-still-info-author",K:["{{author_and_views}}"]},{H:"span",M:"ytp-videowall-still-info-live",K:[g.T("YTP_LIVE")]},{H:"span",M:"ytp-videowall-still-info-duration",K:["{{duration}}"]}]}]}]},{H:"span",ca:["ytp-videowall-still-listlabel-regular","ytp-videowall-still-listlabel"],K:[{H:"span",M:"ytp-videowall-still-listlabel-icon"},g.T("YTP_PLAYLIST"),{H:"span",M:"ytp-videowall-still-listlabel-length",K:[" (",{H:"span",K:["{{playlist_length}}"]},")"]}]},{H:"span",
ca:["ytp-videowall-still-listlabel-mix","ytp-videowall-still-listlabel"],K:[{H:"span",M:"ytp-videowall-still-listlabel-mix-icon"},g.T("YTP_MIX"),{H:"span",M:"ytp-videowall-still-listlabel-length",K:[" (50+)"]}]}]});this.B=b;this.o=a;this.A=null;this.W("click",this.C);this.W("keypress",this.D);if(g.X(a).aa){a=a.app.da;b=this.element;g.H(a.g,b);g.pb(a.g,b);var c=String(a.G++);b.setAttribute("data-visual-id",c);g.Xe(this,(0,g.z)(a.F,a,b))}},n7=function(a){g7.call(this,a,"videowall-endscreen");
this.ba=a;this.G=0;this.B=[];this.I=this.D=this.C=null;this.J=this.U=!1;this.F=new g.ZF(this);g.M(this,this.F);this.L=new g.ot(g.Ea(g.R,this.element,"ytp-show-tiles"),0);g.M(this,this.L);var b=new g.Y({H:"button",ca:["ytp-button","ytp-endscreen-previous"],R:{"aria-label":g.T("YTP_PREVIOUS")},K:[g.aE()]});g.M(this,b);b.za(this.element);b.W("click",this.yK,this);this.O=new g.OW({H:"div",M:"ytp-endscreen-content"});g.M(this,this.O);this.O.za(this.element);b=new g.Y({H:"button",ca:["ytp-button","ytp-endscreen-next"],
R:{"aria-label":g.T("YTP_NEXT")},K:[g.bE()]});g.M(this,b);b.za(this.element);b.W("click",this.xK,this);this.A=new h7(a);g.M(this,this.A);g.GW(this.o,this.A.element,4);this.hide()},o7=function(a){return g.HW(a.o)&&a.Op()&&!a.I},lya=function(a){return(0,g.J)(a.suggestions,function(a){return g.r_(a)})},p7=function(a){var b=a.Yr();
b!=a.U&&(a.U=b,a.o.V("autonavvisibility"))},q7=function(a){g.hX.call(this,a);
g.WD({});this.o=null;this.A=new g.ZF(this);g.M(this,this.A);this.B=g.X(a);mya(a)?this.o=new n7(this.g):this.B.ia?this.o=new kya(this.g):this.o=new g7(this.g);g.M(this,this.o);g.GW(this.g,this.o.element,4);this.xB();this.A.P(a,"videodatachange",this.xB,this);this.A.P(a,"crn_endscreen",this.ZJ,this);this.A.P(a,"crx_endscreen",this.aK,this)},mya=function(a){a=g.X(a);
return a.fd&&!a.ia};g.p(g7,g.mX);g7.prototype.create=function(){this.N=!0};
g7.prototype.destroy=function(){this.N=!1};
g7.prototype.Op=function(){return!1};
g7.prototype.Yr=function(){return!1};g.p(h7,g.Y);g.h=h7.prototype;g.h.Jm=function(){this.D&&(this.G.stop(),this.Ba(this.F),this.F=null,this.D.close(),this.D=null)};
g.h.lA=function(){g.UW(this,g.gW(this.o))};
g.h.MP=function(){window.focus();this.Jm()};
g.h.hide=function(){g.Y.prototype.hide.call(this)};
g.h.Kp=function(a){a=a||g.X(this.o).experiments.o("autoplay_time")||1E4;var b=Math.min(g.DG()-this.I,a);a=Math.min(b/a,1);this.J.setAttribute("stroke-dashoffset",-293*(a+1));1<=a&&3!=this.o.Va()?l7(this,!0):this.A&&this.A.start()};
g.h.WP=function(a){!g.Pd(this.B.element,g.PF(a))&&g.e_(a,this.o)&&l7(this)};
g.h.PN=function(){g.uW(this.o,"autonavcancel");g.iW(this.o,!0)};
g.h.lP=function(a){this.o.Va();this.show();i7(this,a)};
g.h.DC=function(a){this.o.Va();this.C&&this.C.gc().videoId==a.gc().videoId||jya(this,a)};
g.h.mP=function(){this.o.Va();j7(this);this.hide()};
g.h.X=function(){j7(this);this.Jm();g.Y.prototype.X.call(this)};g.p(kya,g7);g.p(m7,g.Y);m7.prototype.Nj=function(){var a=this.A.gc().videoId,b=this.A.getPlaylistId();g.Y1(this.o.app,a,this.A.Td,b,void 0,void 0,void 0)};
m7.prototype.C=function(a){g.KW(this.o,this.element);g.e_(a,this.o,this.B,this.A.Td||void 0)&&this.Nj()};
m7.prototype.D=function(a){switch(a.keyCode){case 13:case 32:g.UF(a)||(this.Nj(),g.TF(a))}};g.p(n7,g7);g.h=n7.prototype;g.h.create=function(){g7.prototype.create.call(this);var a=this.o.ga();a&&(this.C=lya(a),this.D=a);this.rh();this.F.P(this.o,"appresize",this.rh);this.F.P(this.o,"videodatachange",this.zK);this.F.P(this.o,"autonavchange",this.Qy);this.F.P(this.o,"autonavcancel",this.wK);this.F.P(this.element,"transitionend",this.dR)};
g.h.destroy=function(){g.aG(this.F);g.Ze(this.B);this.B=[];this.C=null;g7.prototype.destroy.call(this);g.Gp(this.element,"ytp-show-tiles");this.L.stop()};
g.h.Op=function(){return 1!=this.D.autonavState};
g.h.show=function(){g7.prototype.show.call(this);g.Gp(this.element,"ytp-show-tiles");g.X(this.o).isMobile?g.qt(this.L):this.L.start();(this.J||this.I&&this.I!=this.D.clientPlaybackNonce)&&g.iW(this.o,!1);var a=o7(this);g.HW(this.o)&&g.X(this.o).experiments.g("ui_logging")&&g.tW(this.o,"end",{cancelButtonShow:a?"1":"0",state:this.Op()?"enabled":"disabled"});a?(p7(this),2==this.D.autonavState?g.X(this.o).experiments.g("fast_autonav_in_background")&&3==this.o.vh()?l7(this.A,!0):i7(this.A):3==this.D.autonavState&&
k7(this.A)):(g.iW(this.o,!0),p7(this))};
g.h.hide=function(){g7.prototype.hide.call(this);k7(this.A);p7(this)};
g.h.dR=function(a){g.PF(a)==this.element&&this.rh()};
g.h.rh=function(){if(this.C&&this.C.length){g.R(this.element,"ytp-endscreen-paginate");var a=g.Fh(this.element),b=a.width/a.height,c=96/54,d=2,e=2,f=Math.max(a.width/96,2),k=Math.max(a.height/54,2),l=this.C.length,m=Math.pow(2,2);var n=l*m+(Math.pow(2,2)-m);n+=Math.pow(2,2)-m;for(n-=m;0<n&&(d<f||e<k);){var q=d/2,r=e/2,w=d<=f-2&&n>=r*m,B=e<=k-2&&n>=q*m;if((q+1)/r*c/b>b/(q/(r+1)*c)&&B)n-=q*m,e+=2;else if(w)n-=r*m,d+=2;else if(B)n-=q*m,e+=2;else break}c=!1;n>=3*m&&6>=l*m-n&&(4<=e||4<=d)&&(c=!0);m=96*
d;n=54*e;b=m/n<b?a.height/n:a.width/m;b=Math.min(b,2);m*=b;n*=b;m*=g.Zc(a.width/m||1,1,1.21);n*=g.Zc(a.height/n||1,1,1.21);m=Math.floor(Math.min(a.width,m));n=Math.floor(Math.min(a.height,n));a=this.O.element;g.Eh(a,m,n);g.mh(a,{marginLeft:m/-2+"px",marginTop:n/-2+"px"});jya(this.A,this.C[0]);g.S(this.element,"ytp-endscreen-takeover",o7(this));p7(this);m+=4;n+=4;for(f=b=0;f<d;f++)for(k=0;k<e;k++)if(q=b,r=0,c&&f>=d-2&&k>=e-2?r=1:0==k%2&&0==f%2&&(2>k&&2>f?0==k&&0==f&&(r=2):r=2),q=g.$c(q+this.G,l),0!=
r){w=this.B[b];w||(w=new m7(this.o),this.B[b]=w,a.appendChild(w.element));B=Math.floor(n*k/e);var D=Math.floor(m*f/d),I=Math.floor(n*(k+r)/e)-B-4,U=Math.floor(m*(f+r)/d)-D-4;g.th(w.element,D,B);g.Eh(w.element,U,I);g.mh(w.element,"transitionDelay",(k+f)/20+"s");g.S(w.element,"ytp-videowall-still-mini",1==r);g.S(w.element,"ytp-videowall-still-large",2<r);r=w;q=this.C[q];r.A=q;iya(r,q,g.X(r.o),g.Ep(r.element,"ytp-videowall-still-large")?"hqdefault.jpg":"mqdefault.jpg");w=q.Td;q=r.o;g.X(q).aa&&(q=q.app.da,
r=r.element,w=w&&w.itct,B=r.getAttribute("data-visual-id"),g.H(q.g,r),g.IW(q,"onLogServerVeCreated",{id:B,tracking_params:w}));b++}g.S(this.element,"ytp-endscreen-paginate",b<l);for(d=this.B.length-1;d>=b;d--)e=this.B[d],g.Hd(e.element),g.Ye(e);this.B.length=b}};
g.h.zK=function(){var a=this.o.ga();this.D!=a&&(this.G=0,this.C=lya(a),this.D=a,this.rh())};
g.h.xK=function(){this.G+=this.B.length;this.rh()};
g.h.yK=function(){this.G-=this.B.length;this.rh()};
g.h.sJ=function(){return!!this.A.A};
g.h.Qy=function(a){1==a?(this.J=!1,this.I=this.D.clientPlaybackNonce,j7(this.A),this.g&&this.rh()):(this.J=!0,this.g&&o7(this)&&(2==a?i7(this.A):3==a&&k7(this.A)))};
g.h.wK=function(a){if(a){for(a=0;a<this.B.length;a++)g.LW(this.ba,this.B[a].element,!0);this.Qy(1)}else this.I=null,this.J=!1;this.rh()};
g.h.Yr=function(){return this.g&&o7(this)};g.p(q7,g.hX);g.h=q7.prototype;g.h.My=function(){var a=this.g.ga(),b=!(!a.suggestions||!a.suggestions.length);b=!mya(this.g)||b;a=g.YP(a,"ypc_module");var c=g.Z1(this.g.app);return b&&!a&&!c};
g.h.Ly=function(){return this.o.Yr()};
g.h.pJ=function(){return this.Ly()?this.o.sJ():!1};
g.h.X=function(){g.CW(this.g,"endscreen");g.hX.prototype.X.call(this)};
g.h.load=function(){g.hX.prototype.load.call(this);this.o.show();g.X(this.g).ia&&.01>Math.random()&&g.tW(this.g,"end",{trailerEndscreenShow:1})};
g.h.unload=function(){g.hX.prototype.unload.call(this);this.o.hide();this.o.destroy()};
g.h.ZJ=function(a){this.My()&&(this.o.N||this.o.create(),"load"==a.getId()&&this.load())};
g.h.aK=function(a){"load"==a.getId()&&this.loaded&&this.unload()};
g.h.xB=function(){g.CW(this.g,"endscreen");var a=Math.max(1E3*(this.g.ga().lengthSeconds-10),0);a=new g.CR(a,0x8000000000000,{id:"preload",namespace:"endscreen"});var b=new g.CR(0x8000000000000,0x8000000000000,{id:"load",priority:6,namespace:"endscreen"});g.zW(this.g,[a,b])};g.UZ.endscreen=q7;})(_yt_player);