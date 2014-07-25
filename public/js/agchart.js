!function(){"use strict";var t="undefined"!=typeof window?window:global;if("function"!=typeof t.require){var e={},i={},n=function(t,e){return{}.hasOwnProperty.call(t,e)},r=function(t,e){var i,n,r=[];i=/^\.\.?(\/|$)/.test(e)?[t,e].join("/").split("/"):e.split("/");for(var o=0,a=i.length;a>o;o++)n=i[o],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},o=function(t){return t.split("/").slice(0,-1).join("/")},a=function(e){return function(i){var n=o(e),a=r(n,i);return t.require(a,e)}},s=function(t,e){var n={id:t,exports:{}};return i[t]=n,e(n.exports,a(t),n),n.exports},l=function(t,o){var a=r(t,".");if(null==o&&(o="/"),n(i,a))return i[a].exports;if(n(e,a))return s(a,e[a]);var l=r(a,"./index");if(n(i,l))return i[l].exports;if(n(e,l))return s(l,e[l]);throw new Error('Cannot find module "'+t+'" from "'+o+'"')},c=function(t,i){if("object"==typeof t)for(var r in t)n(t,r)&&(e[r]=t[r]);else e[t]=i},d=function(){var t=[];for(var i in e)n(e,i)&&t.push(i);return t};t.require=l,t.require.define=c,t.require.register=c,t.require.list=d,t.require.brunch=!0}}(),require.register("agchart/app",function(t,e,i){var n,r,o;i.exports=o={},n={config:e("agchart/config"),tools:e("agchart/utils/tools"),scale:e("agchart/utils/scale"),domain:e("agchart/utils/domain"),palette:e("agchart/utils/palette"),design:e("agchart/utils/design"),effectsPoint:e("agchart/effects/point"),title:e("agchart/components/title"),tooltip:e("agchart/components/tooltip"),logo:e("agchart/components/logo"),legend:e("agchart/components/legend"),cross:e("agchart/components/cross"),axis:e("agchart/components/axis"),grid:e("agchart/components/grid"),label:e("agchart/components/label"),plugin:e("agchart/components/plugin")},o.Main=r=function(){function t(t){this._CONF=new n.config.Main(t.config).get(),this._PALETTE=new n.palette.Main(this._CONF.point.color),this._SVG=void 0,this._CLASS={tooltip:void 0,title:void 0},this._SERIES=n.tools.prepareSeries({series:t.series,palette:this._PALETTE,confPoint:this._CONF.point}),"auto"===this._CONF.canvas.padding&&(this._CONF.canvas.padding=n.design.computePadding(this._CONF.point)),this._DOMAIN=n.domain.computeDomain(t.series),n.domain.fixDomain({domain:this._DOMAIN,confDomain:this._CONF.domain}),this._SCALE=n.scale.computeScales({confCanvas:this._CONF.canvas,confAxis:this._CONF.axis,confGrid:this._CONF.grid,domain:this._DOMAIN}),this.initSVG(this._CONF.canvas)}return t.prototype.toString=function(){console.log("Canvas in "+this._CONF.selector),console.log("Config",this._CONF),console.log("Classes:",this._CLASS),console.log("Series:",this._SERIES)},t.prototype.initSVG=function(t){if(null==t.selector)throw new Error("No selector defined");return $(t.selector).css({position:"relative"}),this._SVG=d3.select(t.selector).append("svg").attr("fill",t.bgcolor).attr("width",t.width).attr("height",t.height),this._CLASS.tooltip=new n.tooltip.Main(this._CONF.canvas.selector),this._CLASS.plugin=new n.plugin.Main(this._CONF.canvas.selector),this._CLASS.logo=new n.logo.Main(this._SVG),this._CLASS.gridX=new n.grid.Main(this._SVG),this._CLASS.gridY=new n.grid.Main(this._SVG),this._CLASS.labelX=new n.label.Main(this._SVG),this._CLASS.labelY=new n.label.Main(this._SVG),this._CLASS.axisX=new n.axis.Main(this._SVG),this._CLASS.axisY=new n.axis.Main(this._SVG),this._CLASS.cross=new n.cross.Main(this._SVG),this._CLASS.legend=new n.legend.Main(this._SVG),this._CLASS.title=new n.title.Main(this._SVG)},t.prototype.renderPoints=function(){var t,e,i,r,o,a,s,l,c,d,f,u;if(s=this,a=this._CONF,o=this._SVG,d=this._CLASS.tooltip.getDOM().root,f=this._CLASS.tooltip.show,c=this._CLASS.tooltip.hide,l=a.tooltip.callback,u=a.tooltip.template,"string"==typeof l&&(l=this._CLASS.tooltip.getCallback(l)),"string"==typeof u&&(u=this._CLASS.tooltip.getTemplate(u)),e=this._SCALE.x,t=this._SCALE.y,i=this._SVG.selectAll(".series").data(this._SERIES).enter().append("g").attr("class","series").attr("id",function(t,e){return""+e}).attr("title",function(t){return t.name}),("line"===a.canvas.render||"dotline"===a.canvas.render)&&(r=d3.svg.line().interpolate("linear").x(function(t){return e(t.x)}).y(function(e){return t(e.y)}),i.append("path").attr("class","line").attr("d",function(t){return r(t.data)}).attr("stroke",function(t){return t.data[0].config.color}).attr("fill","none").attr("stroke-width",a.line.stroke.width)),"dot"===a.canvas.render||"dotline"===a.canvas.render)return i.selectAll(".circle").data(function(t){return t.data}).enter().append("circle").attr("cx",function(t){return e(t.x)}).attr("cy",function(e){return t(e.y)}).attr("data-x",function(t){return t.x}).attr("data-y",function(t){return t.y}).attr("data-color",function(t){return t.config.color}).attr("r",function(t){return t.config.r}).attr("stroke",function(t){if("empty"===a.point.mode)return t.config.color;if("fill"===a.point.mode)return a.canvas.bgcolor;throw new Error("Unknown point mode '"+a.point.mode+"'")}).attr("fill",function(t){if("empty"===a.point.mode)return a.canvas.bgcolor;if("fill"===a.point.mode)return t.config.color;throw new Error("Unknown point mode '"+a.point.mode+"'")}).attr("stroke-width",function(t){var e,i,n;return null!=(e=null!=(i=t.config)&&null!=(n=i.stroke)?n.width:void 0)?e:a.point.stroke.width}).on("mouseover",function(t){var e,i;return i=a.point.onMouseover,"string"==typeof i&&(i=n.effectsPoint[i].onMouseover),i({canvas:o,circleNode:this,data:t}),e=l({format:a.tooltip.format,canvas:o,tooltipNode:d,circleNode:this,data:t}),d.html(u(e)),f(this,{canvas:{width:a.canvas.width,height:a.canvas.height},tooltip:{alwaysInside:a.tooltip.alwaysInside}},d,t),a.point.fadeOnMouseover?($(o.node()).find(".series").not("[data-hide='true']").not("[id="+t.serie+"]").fadeTo(5,.15),$(this).show()):void 0}).on("mouseout",function(t){var e;return e=a.point.onMouseout,"string"==typeof e&&(e=n.effectsPoint[e].onMouseout),e({canvas:o,circleNode:this,data:t}),c(d),a.point.fadeOnMouseover?$(o.node()).find(".series").not("[id="+t.serie+"]").not("[data-hide='true']").fadeTo(1,1):void 0});throw new Error("Unknown render value '"+o.render+"'")},t.prototype.render=function(){return null==this._SVG&&(this._SVG=this.createSVG()),this._CLASS.logo.render({confCanvas:this._CONF.canvas,confLogo:this._CONF.logo,style:this._CONF.style.logo}),this._CLASS.gridX.render({scale:this._SCALE.x,confCanvas:this._CONF.canvas,confGrid:this._CONF.grid.x,style:this._CONF.style.grid.x}),this._CLASS.gridY.render({scale:this._SCALE.y,confCanvas:this._CONF.canvas,confGrid:this._CONF.grid.y,style:this._CONF.style.grid.y}),this._CLASS.axisX.render({confAxis:this._CONF.axis.x,confCanvas:this._CONF.canvas,style:this._CONF.style.axis.x}),this._CLASS.axisY.render({confAxis:this._CONF.axis.y,confCanvas:this._CONF.canvas,style:this._CONF.style.axis.y}),this._CLASS.labelX.render({confCanvas:this._CONF.canvas,confLabel:this._CONF.canvas.label.x,style:this._CONF.style.label.x}),this._CLASS.labelY.render({confCanvas:this._CONF.canvas,confLabel:this._CONF.canvas.label.y,style:this._CONF.style.label.y}),this.renderPoints(),this._CLASS.title.render({confCanvas:this._CONF.canvas,confTitle:this._CONF.canvas.title,style:this._CONF.style.title}),this._CONF.legends.show&&this._CLASS.legend.render({svg:this._SVG,confCanvas:this._CONF.canvas,series:this._SERIES,confLegends:this._CONF.legends}),this._CLASS.cross.render({svg:this._SVG,confCanvas:this._CONF.canvas,confCross:this._CONF.canvas.cross,style:this._CONF.style.cross}),this._CLASS.cross.renderValue({svg:this._SVG,scale:this._SCALE,confCanvas:this._CONF.canvas,confCrossV:this._CONF.canvas.crossValue,style:this._CONF.style.crossValue.x}),this._CLASS.plugin.render({context:this,confCanvas:this._CONF.canvas,iconsFolder:this._CONF.pluginsIconsFolder,confPlugins:this._CONF.plugins,style:this._CONF.style.plugins})},t}()}),require.register("agchart/components/axis",function(t,e,i){var n,r,o;i.exports=o={},n={style:e("agchart/utils/style")},o.Main=r=function(){function t(t){this._AXIS=t.append("line")}return t.prototype.getDOM=function(){return{root:this._AXIS}},t.prototype.render=function(t){var e,i;switch(e=t.confAxis,i=t.confCanvas,new n.style.Main(this._AXIS).apply(t.style),e.orient){case"bottom":return this._AXIS.attr("x1",i.padding[0]).attr("y1",i.height-i.padding[1]).attr("x2",i.width-i.padding[0]).attr("y2",i.height-i.padding[1]);case"top":return this._AXIS.attr("x1",i.padding[0]).attr("y1",i.padding[1]).attr("x2",i.width-i.padding[0]).attr("y2",i.padding[1]);case"left":return this._AXIS.attr("x1",i.padding[0]).attr("y1",i.padding[1]).attr("x2",i.padding[0]).attr("y2",i.height-i.padding[1]);case"right":return this._AXIS.attr("x1",i.width-i.padding[0]).attr("y1",i.padding[1]).attr("x2",i.width-i.padding[0]).attr("y2",i.height-i.padding[1]);default:throw new Error("Unknown orientation: ",e.orient)}},t}()}),require.register("agchart/components/cross",function(t,e,i){var n,r,o;i.exports=o={},n={style:e("agchart/utils/style")},o.Main=r=function(){function t(t){this._CROSSPANEL=t.append("g"),this._CROSSX=this._CROSSPANEL.append("line"),this._CROSSY=this._CROSSPANEL.append("line"),this._VALUE=this._CROSSPANEL.append("g").style("opacity",0)}return t.prototype.getDOM=function(){return{root:this._CROSSPANEL,crossX:this._CROSSX,crossY:this._CROSSY,value:this._VALUE}},t.prototype.render=function(t){var e,i,r,o,a,s,l,c,d,f,u;return e=t.confCanvas,l=t.style,a=e.padding[0],s=e.padding[1],d=e.width,i=e.height,r=t.confCross.x.offset,o=t.confCross.y.offset,f=this._CROSSX,u=this._CROSSY,new n.style.Main(this._CROSSX).apply(l.x).attr("x1",-d).attr("y1",s).attr("x2",-d).attr("y2",i-s),new n.style.Main(this._CROSSY).apply(l.y).attr("x1",a).attr("y1",-i).attr("x2",d-a).attr("y2",-i),c=null,t.svg.on("mousemove.cross",function(){var e,n;return clearTimeout(c),f.transition().style("opacity",1),u.transition().style("opacity",1),e=d3.mouse(this)[0],n=d3.mouse(this)[1],t.confCross.x.show&&e>=a+r&&d-a+r>=e&&f.attr("x1",e-r).attr("x2",e-r),t.confCross.y.show&&n>=s+o&&i-s+o>=n&&u.attr("y1",n-o).attr("y2",n-o),c=setTimeout(function(){return u.transition().duration(500).style("opacity",0),f.transition().duration(500).style("opacity",0)},2e3)})},t.prototype.renderValue=function(t){var e,i,r,o,a,s;return r=t.style,i=this._VALUE.append("rect"),new n.style.Main(i).apply(r.background),o=this._VALUE.append("text"),new n.style.Main(o).apply(r.text).text("AgChartPile"),a=o.node().getBBox(),t.confCrossV.x.show?(s=null,e=this._VALUE,t.svg.on("mousemove.crossValue",function(){var n,r,l,c;switch(e.transition().duration(300).style("opacity",1),clearTimeout(s),n=d3.mouse(this)[0],n<t.confCanvas.padding[0]?n=t.confCanvas.padding[0]:n>t.confCanvas.width-t.confCanvas.padding[0]&&(n=t.confCanvas.width-t.confCanvas.padding[0]),l=n,n<t.confCanvas.padding[0]+a.width/2?l=t.confCanvas.padding[0]+a.width/2:n>t.confCanvas.width-t.confCanvas.padding[0]-a.width/2&&(l=t.confCanvas.width-t.confCanvas.padding[0]-a.width/2),o.attr("y",a.height-.25*a.height).attr("x",a.width/2),i.attr("width",a.width).attr("height",a.height),c=t.scale.x.invert(n),t.confCrossV.x.orient){case"top":r=t.confCanvas.padding[1];break;case"bottom":r=t.confCanvas.height-t.confCanvas.padding[1]}return o.text(t.confCrossV.x.format(c)),e.attr("transform","translate("+(l-a.width/2)+", "+r+")"),e.attr("cy",d3.mouse(this)[1]),s=setTimeout(function(){return e.transition().duration(500).style("opacity",0)},2e3)})):void 0},t}()}),require.register("agchart/components/grid",function(t,e,i){var n,r,o;i.exports=o={},n={style:e("agchart/utils/style")},o.Main=r=function(){function t(t){this._GRID=t.append("g")}return t.prototype.getDOM=function(){return{root:this._GRID}},t.prototype.render=function(t){var e,i,r,o,a,s,l,c;switch(e=t.confCanvas,i=t.confGrid,a=t.style,l=i.tick.size,"auto"===l&&(l="bottom"===i.orient||"top"===i.orient?e.height-2*e.padding[1]:-e.width+2*e.padding[0]),i.orient){case"bottom":c="translate(0, "+e.padding[1]+")";break;case"top":c="translate(0, "+(e.height-e.padding[1])+")";break;case"right":c="translate("+(e.width-e.padding[0])+", 0)";break;case"left":c="translate("+e.padding[0]+", 0)";break;default:throw c="",new Error("Unknown orientation: ",i.orient)}return r=d3.svg.axis().scale(t.scale).orient(i.orient).tickSize(l),"auto"!==i.tick.freq&&r.ticks(i.tick.freq),null!=i.format&&(r.tickFormat(d3.time.format(i.format)),r.ticks(d3.time.months.utc,"auto"===i.tick.freq?1:i.tick.freq)),this._GRID.attr("transform",c).attr("class","axis "+a["class"]).call(r),o=this._GRID.selectAll("line"),new n.style.Main(o).apply(a.tick),s=this._GRID.selectAll("text"),new n.style.Main(s).apply(a.text),this._GRID.selectAll("path").style("display","none")},t}()}),require.register("agchart/components/label",function(t,e,i){var n,r,o;i.exports=o={},n={style:e("agchart/utils/style")},o.Main=r=function(){function t(t){this._LABEL=t.append("text")}return t.prototype.getDOM=function(){return{root:this._LABEL}},t.prototype.render=function(t){var e,i,r,o,a,s;switch(e=t.confCanvas,i=t.confLabel,o=t.style,r=i.offset||0,new n.style.Main(this._LABEL).apply(o).text(i.text),a=this._LABEL.node().getBBox(),i.orient){case"bottom":s="translate("+e.width/2+",          "+(e.height-e.padding[1]+a.height+r)+")";break;case"top":s="translate("+e.width/2+", "+(e.padding[1]-r)+")";break;case"left":s="rotate(-90) translate("+-e.height/2+", "+(e.padding[0]+10)+")";break;case"right":s="translate("+(e.width-e.padding[0])+", "+e.padding[1]/2+")";break;default:throw s="",new Error("Unknown orientation: ",i.orient)}return this._LABEL.attr("transform",s)},t}()}),require.register("agchart/components/legend",function(t,e,i){var n,r;i.exports=r={},r.Main=n=function(){function t(t){this._LEGENDS=t.append("g"),this._HIDEALL=!1}return t.prototype.getDOM=function(){return{root:this._LEGENDS}},t.prototype.render=function(t){var e,i,n,r,o,a,s,l,c,d,f,u,h,p,g,y,v,x,m,_,w,b,S;for(o=t.confCanvas,a=t.confLegends,i=t.series,e=o.selector,v=a.rect.width,g=a.rect.height,_=a.text.width,y=a.margin,c=a.text.size,w=o.width-2*o.padding[0],h=o.padding[0]-a.padding[0],p=o.height-a.padding[1],this._LEGENDS.attr("transform","translate("+h+", "+p+")"),s=0,l=a.padding[1],u=i.length-1,a.toggleAll.show&&u++,S=[],d=b=0;u>=b;d=b+=1)t.svg.attr("height",o.height+l),d===u&&a.toggleAll.show?(f=this.drawLegend(this._LEGENDS,d,s,l,v,g,y,a.toggleAll.color,"legend option",c,2,a.toggleAll.text[0]),n=this.toggleSeries):(x=i[d],r=x.data[0].config.color,m=x.name,null!=a.format&&(m=a.format(m)),f=this.drawLegend(this._LEGENDS,d,s,l,v,g,y,r,"legend",c,5,m),n=this.toggleSerie),s+v+_+y>w-v-_-y?(s=0,l+=15):s+=v+_+y,S.push(f.on("click",function(t,i,n){return function(){return i.call(this,t,e,n,[f,a.toggleAll.text])}}(this,n,d)));return S},t.prototype.drawLegend=function(t,e,i,n,r,o,a,s,l,c,d,f){var u,h;return u=t.append("g").style("cursor","pointer").attr("transform","translate("+i+", "+n+")").attr("data-index",e).attr("data-hide","false").attr("class",l),h=u.append("rect").attr("width",r).attr("height",o).attr("fill",s).attr("rx",d).attr("ry",d),u.append("text").attr("x",a+r).attr("y",o-1).attr("fill",s).attr("font-size",c).attr("background","#ff0000").text(f),u},t.prototype.toggleSerie=function(t,e,i){var n,r;return r=$(this).find("rect").css("opacity"),n=this.getAttribute("data-hide"),"false"===n?($(this).find("rect").fadeTo(100,.1),$(e).find(".series#"+i).attr("data-hide","true"),this.setAttribute("data-hide","true")):($(this).find("rect").fadeTo(100,1),$(e).find(".series#"+i).attr("data-hide","false"),this.setAttribute("data-hide","false")),$(e).find(".series#"+i).toggle("normal")},t.prototype.toggleSeries=function(t,e,i,n){var r;return r=!t._HIDEALL,t._HIDEALL=r,r?(n[0].select("text").text(n[1][1]),$(this).parent().find("rect").fadeTo(500,.1),$(e).find(".series").hide("normal")):(n[0].select("text").text(n[1][0]),$(this).parent().find("rect").fadeTo(100,1),$(e).find(".series").show("normal")),$(this).parent().find(".legend").attr("data-hide",r),$(e).find(".series").attr("data-hide",r)},t}()}),require.register("agchart/components/logo",function(t,e,i){var n,r,o;i.exports=o={},n={style:e("agchart/utils/style")},o.Main=r=function(){function t(t){this._IMAGE=t.append("image")}return t.prototype.getDOM=function(){return{root:this._IMAGE}},t.prototype.render=function(t){var e,i,r,o,a,s,l,c;return o=t.confCanvas,e=o.height,r=o.width,i=o.padding,a=t.confLogo,c=t.style,s=l=100,"bottom"===a.position.y?l=e-i[1]-c.height:"top"===a.position.y&&(l=i[1]),"right"===a.position.x?s=r-i[0]-c.width:"left"===a.position.x&&(s=i[0]),new n.style.Main(this._IMAGE).apply(t.style).attr("x",s).attr("y",l)},t}()}),require.register("agchart/components/plugin",function(t,e,i){var n,r;i.exports=r={},r.Main=n=function(){function t(t){this._MENU=$("<div/>",{id:"pluginsMenu"}).appendTo(t),this._PLUGINSDOM={}}return t.prototype.getDOM=function(){return{root:this._MENU,plugins:this._PLUGINSDOM}},t.prototype.render=function(t){var i,n,r,o,a,s,l,c,d;switch(n=t.confCanvas,c=t.style,l=this._MENU,c.panel.position){case"right":c.panel.position="absolute",c.panel.left=n.width+1;break;case"left":c.panel.position="absolute",c.panel.left=0}l.css(c.panel),l.on("mouseover.menuPlugin",function(){return l.animate({opacity:1},10)}),l.on("mouseout.menuPlugin",function(){return l.animate({opacity:.1},10)}),d=[];for(a in t.confPlugins)t.confPlugins[a].enable?(o=$("<i/>",{"class":"fa fa-"+t.confPlugins[a].fa+" fa-2x",title:t.confPlugins[a].displayName}).appendTo(l),o.css({cursor:"pointer"}),s=e("agchart/plugins/"+a),i=s.onClick,r=t.context,o.click(function(){return i(r,n.selector,t.confPlugins[a])}),d.push(this._PLUGINSDOM[a]=o)):d.push(void 0);return d},t}()}),require.register("agchart/components/title",function(t,e,i){var n,r,o;i.exports=o={},n={style:e("agchart/utils/style")},o.Main=r=function(){function t(t){this.boxTitle=t.append("g"),this.texts=[]}return t.prototype.getDOM=function(){return{root:this.boxTitle,texts:this.texts}},t.prototype.render=function(t){var e,i,r,o,a,s,l,c,d,f,u,h,p;for(i=t.confCanvas,r=t.confTitle,f=t.style,c=r.position.x,d=r.position.y,s=[c,d],this.texts=[],p=r.texts,a=u=0,h=p.length;h>u;a=++u)l=p[a],e=this.boxTitle.append("text"),new n.style.Main(e).apply(f[a]).attr("y",s[1]).attr("class",r["class"]).attr("font-family",r.fontFamily).text(l.text),o=e.node().getBBox(),s[1]=s[1]+o.height+(l.interline||0),this.texts.push({node:e,dim:o});return this.boxTitle.attr("transform","translate("+c+",      "+(d+this.texts[0].dim.height/2)+")")},t}()}),require.register("agchart/components/tooltip",function(t,e,i){var n,r;i.exports=r={},r.Main=n=function(){function t(t){null==this._TOOLTIP&&(this._TOOLTIP=d3.select(t).append("div").attr("class","tooltip").style("opacity",0).style("left",0).style("top",0))}return t.prototype.getDOM=function(){return{root:this._TOOLTIP}},t.prototype.show=function(t,e,i,n){var r,o,a,s,l,c;return i.attr("width",200).attr("height",100),r=d3.mouse(t)[0],o=d3.mouse(t)[1],s=r+n.config.stroke.width,l=o+n.config.stroke.width,e.tooltip.alwaysInside&&(r>e.canvas.width/2&&(c=parseFloat(i.style("width").replace("px","")),s=r-n.config.stroke.width-c),o>e.canvas.height/2&&(a=parseFloat(i.style("height").replace("px","")),l=o-n.config.stroke.width-a)),i.style("left",s+"px").style("top",l+"px").transition().duration(200).style("opacity",.9)},t.prototype.hide=function(t){return t.transition().duration(500).style("opacity",0)},t.prototype.getTemplate=function(t){return this._templates[t]},t.prototype.getCallback=function(t){return this._callbacks[t]},t.prototype._templates={singlePoint:function(t){var e;return e="<h1>"+t[0].title+"</h1>",e+="<div class='serie' id='0'>"+t[0].x+" : "+t[0].y+"<div class='swatch'"+("style='background-color: "+t[0].color+"'></div>")+"</div>"},multipleVertical:function(t){var e,i,n,r,o;for(i="<h1>"+t[0].x+"</h1>",n=r=0,o=t.length;o>r;n=++r)e=t[n],e.hide||(i+="<div class='serie' id='"+n+"'>"+e.serieName+" : "+e.y+"<div class='swatch'"+("style='background-color: "+e.color+"'></div>")+"</div>");return i},multipleVerticalInverted:function(t){var e,i,n,r,o;for(i="<h1>"+t[0].x+"</h1>",n=r=0,o=t.length;o>r;n=++r)e=t[n],e.hide||(i+="<div class='serie' id='"+n+"'>"+e.serieName+": "+e.y+"<div class='swatch'"+("style='background-color: "+e.color+"'></div>")+"</div>");return i}},t.prototype._callbacks={singlePoint:function(t){var e,i,n;return i=t.circleNode,e=parseFloat(i.getAttribute("data-x")),null!=(null!=(n=t.format)?n.x:void 0)&&(e=t.format.x(e)),[{color:t.data.config.color,serieName:t.circleNode.parentNode.getAttribute("title"),x:e,y:t.data.y.toFixed(2),hide:"true"===node.parentNode.getAttribute("data-hide")}]},multipleVertical:function(t){var e,i,n,r,o,a,s;return o=t.circleNode,e=o.getAttribute("cx"),r=parseFloat(o.getAttribute("data-x")),null!=(null!=(a=t.format)?a.x:void 0)&&(r=t.format.x(r)),n=parseInt(o.parentNode.getAttribute("title")),null!=(null!=(s=t.format)?s.title:void 0)&&(n=t.format.title(n)),i=[],$(t.canvas[0]).find("circle[cx='"+e+"']").each(function(t,e){return i.push({title:n,serieName:e.parentNode.getAttribute("title"),color:e.getAttribute("data-color"),y:parseFloat(e.getAttribute("data-y")).toFixed(2),x:r,hide:"true"===e.parentNode.getAttribute("data-hide")})}),i},multipleVerticalInverted:function(t){var e,i,n,r,o,a,s;return o=t.circleNode,e=o.getAttribute("cx"),r=parseFloat(o.getAttribute("data-x")),null!=(null!=(a=t.format)?a.x:void 0)&&(r=t.format.x(r)),n=parseInt(o.parentNode.getAttribute("title")),null!=(null!=(s=t.format)?s.title:void 0)&&(n=t.format.title(n)),i=[],$(t.canvas[0]).find("circle[cx='"+e+"']").each(function(e,o){var a,s;return a=parseInt(o.parentNode.getAttribute("title")),null!=(null!=(s=t.format)?s.serie:void 0)&&(a=t.format.serie(a)),i.push({title:n,serieName:a,color:o.getAttribute("data-color"),y:parseFloat(o.getAttribute("data-y")).toFixed(2),x:r,hide:"true"===o.parentNode.getAttribute("data-hide")})}),i}},t}()}),require.register("agchart/config",function(t,e,i){var n,r,o;i.exports=o={},n={tools:e("agchart/utils/tools")},o.Main=r=function(){function t(t){n.tools.updateObject(this.defaultConfig,t)}return t.prototype.get=function(){return this.defaultConfig},t.prototype.defaultConfig={style:{plugins:{panel:{position:"right",top:0,opacity:.1}},axis:{x:{stroke:"#2b2e33","class":"x","stroke-width":1},y:{stroke:"#2b2e33","class":"y","stroke-width":1}},logo:{id:"logo","xlink:href":"agflow-logo.svg",width:100,height:50,opacity:.5},grid:{x:{"class":"x",tick:{stroke:"#f5f5f5","width-stroke":2},text:{fill:"#2b2e33","font-size":10,"font-weight":"normal"}},y:{"class":"y",tick:{stroke:"#f5f5f5"},text:{fill:"#2b2e33","font-size":10,"font-weight":"normal"}}},label:{x:{"text-anchor":"middle","class":"label x",fill:"#5f5f5f","font-size":14,"font-weight":"bold"},y:{"text-anchor":"middle","font-size":14,fill:"#5f5f5f","class":"label y","font-weight":"bold"}},title:[{fill:"#2f2f2f","font-size":15,"font-weight":"bold"},{fill:"#2f2f2f","font-size":15,"font-weight":"bold"},{fill:"#2f2f2f","font-size":12}],cross:{x:{"class":"crossX",stroke:"#44A0FF","stroke-width":1},y:{"class":"crossY",stroke:"#FFA044","stroke-width":1}},crossValue:{x:{text:{"font-size":12,"text-anchor":"middle",fill:"#FFFFFF"},background:{fill:"#0971b7",rx:5,ry:5}}}},tooltip:{template:"singlePoint",format:{title:null,serie:null,x:null,y:null},callback:"singlePoint",alwaysInside:!0},canvas:{scale:{x:{nice:!1,padding:[10,10]},y:{nice:!0,padding:[10,10]}},bgcolor:"#FFFFFF",render:"dot",title:{fontFamily:"arial",position:{x:20,y:3},"class":"title",texts:[{text:"AgChart Example",interline:-4.9},{text:"The agflow interactive library",interline:-4.9},{text:"Play with datas !"}]},label:{x:{text:"X Axis",offset:10,orient:"bottom"},y:{text:"Y Axis",orient:"right",offset:0}},selector:null,width:600,height:400,padding:[0,0],cross:{x:{show:!0,offset:0},y:{show:!0,offset:0}},crossValue:{x:{orient:"bottom",show:!0,format:function(t){var e,i,n;return e=t.toString().split(" ")[2],i=t.toString().split(" ")[1],n=t.toString().split(" ")[3].substring(2),""+e+" "+i+" "+n}}}},domain:{x:{margin:5},y:{margin:5}},logo:{position:{x:"right",y:"bottom"}},line:{stroke:{width:2}},point:{onMouseover:"singlePoint",onMouseout:"singlePoint",fadeOnMouseover:!0,r:4,mode:"empty",color:"munin",stroke:{width:1}},axis:{x:{orient:"bottom"},y:{orient:"left"}},grid:{x:{format:"%b",orient:"bottom",tick:{mode:"auto",size:"auto",freq:"auto"}},y:{format:null,orient:"right",tick:{mode:"auto",size:"auto",freq:"auto"}}},legends:{show:!0,format:null,toggleAll:{show:!0,color:"#5f5f5f",text:["Hide all","Show all"]},text:{size:14,width:60},rect:{width:10,height:10},margin:5,padding:[0,15]},pluginsIconsFolder:"icons",plugins:{exportation:{fa:"download",displayName:"Exports the chart to a PNG file",enable:!0,copyright:{text:"(c) AgFlow 2014",color:"#9f9f9f",fontSize:12}}}},t}()}),require.register("agchart/effects/point",function(t,e,i){var n;i.exports=n={},n.singlePoint={onMouseover:function(t){var e,i;return i=t.circleNode,e=parseFloat(i.getAttribute("stroke-width")),i.setAttribute("stroke-width",2*e)},onMouseout:function(t){var e,i;return i=t.circleNode,e=parseFloat(i.getAttribute("stroke-width")),i.setAttribute("stroke-width",e/2)}},n.multipleVertical={onMouseover:function(t){var e,i,n;return n=t.circleNode,e=n.getAttribute("cx"),i=2*parseFloat(n.getAttribute("stroke-width")),$(t.canvas[0]).find("circle[cx='"+e+"']").each(function(t,e){return $(e).attr("stroke-width",i)})},onMouseout:function(t){var e,i,n;return n=t.circleNode,e=n.getAttribute("cx"),i=parseFloat(n.getAttribute("stroke-width"))/2,$(t.canvas[0]).find("circle[cx='"+e+"']").each(function(t,e){return $(e).attr("stroke-width",i)})}},n.multipleVerticalInverted={onMouseover:function(t){var e,i,n;return n=t.circleNode,e=n.getAttribute("cx"),i=2*parseFloat(n.getAttribute("stroke-width")),$(t.canvas[0]).find("circle[cx='"+e+"']").each(function(t,e){var n,r;return $(e).attr("stroke-width",i),n=$(e).attr("fill"),r=$(e).attr("stroke"),$(e).attr("stroke",n),$(e).attr("fill",r)})},onMouseout:function(t){var e,i,n;return n=t.circleNode,e=n.getAttribute("cx"),i=parseFloat(n.getAttribute("stroke-width"))/2,$(t.canvas[0]).find("circle[cx='"+e+"']").each(function(t,e){var n,r;return $(e).attr("stroke-width",i),n=$(e).attr("fill"),r=$(e).attr("stroke"),$(e).attr("stroke",n),$(e).attr("fill",r)})}}}),require.register("agchart/initialize",function(t,e,i){var n,r,o,a,s;i.exports=r={},n=e("agchart/app"),s=e("agchart/utils/time"),o=function(t,e){var i,n,r,o;for(null==e&&(e=1),i=[],n=r=0,o=t-1;e>0?o>=r:r>=o;n=r+=e)i.push({x:1e3*n,y:100*Math.random()});return i},a=function(t,e,i){var n,r,o,a;for(null==e&&(e=1),n=[],r=o=0,a=t-1;e>0?a>=o:o>=a;r=o+=e)n.push({x:1e3*r,y:10*i(r)+50});return n},r.run=function(){var t,e,i,r,o,a,l;return o=new s.Main({lang:"en"}),r=[],e=10,l=10,r.push({name:"Serie "+(e+3),data:[{x:1e3*e,y:10*e}]}),a=function(t){var e,i;return e=new Date(t),(i=d3.time.format("%b '%y"))(e)},i="multipleVerticalInverted",t=new n.Main({config:{canvas:{render:"dotline",width:900,height:400,selector:"#chart1",padding:[50,50],scale:{x:{nice:!0}},label:{x:{text:"Months"},y:{text:"Values"}}},logo:{position:{x:"right",y:"bottom"},opacity:.1},tooltip:{template:i,callback:i,format:{x:a}},line:{stroke:{width:1}},point:{onMouseover:i,onMouseout:i,mode:"fill",r:4,color:"agflow",stroke:{width:1,color:null}},axis:{y:{orient:"right"}},pluginsIconsFolder:"icons"},series:r}),t.render()}}),require.register("agchart/plugins/exportation",function(t,e,i){var n,r;i.exports=r={},n={logo:e("agchart/components/logo")},r.onClick=function(t,e,i){var r,o,a,s,l,c,d,f,u,h,p,g,y,v,x;return s=t._CLASS.logo.getDOM().root.remove(),p=t._CANVAS.append("text").attr("fill",i.copyright.color).attr("font-size",i.copyright.fontSize+"px").text(i.copyright.text),$(t._CLASS.legend.getDOM().root.node()).find(".legend.option").hide(),$(t._CLASS.legend.getDOM().root.node()).find(".legend[data-hide='true']").hide(),v=t._CONF.canvas.width,a=t._CONF.canvas.height,g=p.node().getBBox(),d=v-t._CONF.canvas.padding[0]-10,f=a-t._CONF.canvas.padding[1]-3,p.attr("text-anchor","end"),p.attr("transform","translate("+d+", "+f+")"),u=$(e).find("svg")[0],h=(new XMLSerializer).serializeToString(u),o=document.createElement("canvas"),$("body").after(o),canvg(o,h),$(o).remove(),l=o.toDataURL("image/png"),y=window.navigator.userAgent,c=y.indexOf("MSIE "),c>0||navigator.userAgent.match(/Trident.*rv\:11\./)?(console.log("Internet explorer detected"),window.winIE=x=window.open(),x.document.body.innerHTML="<center><img src='"+l+"'></img><br>Please right click on the image and choose 'Save image as...'</center>",x.document.close()):(r=document.createElement("a"),r.href=l,r.download="agflow.png",$("body").append(r),r.click()),t._CLASS.logo=new n.logo.Main(t._CANVAS),t._CLASS.logo.render({confCanvas:t._CONF.canvas,logo:t._CONF.logo}),p.remove(),$(t._CLASS.legend.getDOM().root.node()).find(".legend.option").show(),$(t._CLASS.legend.getDOM().root.node()).find(".legend[data-hide='true']").show()}}),require.register("agchart/utils/design",function(t,e,i){var n,r;i.exports=r={},r.computePadding=n=function(t){var e;return e=t.r+t.stroke.width/2,[e,e]}}),require.register("agchart/utils/domain",function(t,e,i){var n,r,o;i.exports=n={},n.computeDomain=o=function(t){var e,i,n,r,o,a,s,l,c,d,f;for(e=i=Number.MIN_VALUE,n=r=Number.MAX_VALUE,s=0,c=t.length;c>s;s++)for(a=t[s],f=a.data,l=0,d=f.length;d>l;l++)o=f[l],o.x>e&&(e=o.x),o.x<n&&(n=o.x),o.y>i&&(i=o.y),o.y<r&&(r=o.y);return{minX:n,maxX:e,minY:r,maxY:i}},n.fixDomain=r=function(t){var e,i;return i=t.domain,e=t.confDomain,i.maxX===i.minX&&(i.maxX+=e.x.margin,i.minX-=e.x.margin),i.maxY===i.minY?(i.maxY+=e.y.margin,i.minY-=e.y.margin):void 0}}),require.register("agchart/utils/palette",function(t,e,i){var n,r;i.exports=r={},r.Main=n=function(){function t(t){var e;e=this.palettes(),this._PALETTE=e[t],this._INDEX=0}return t.prototype.isDefined=function(){return null!=this._PALETTE?!0:!1},t.prototype.color=function(t){return this._PALETTE[t%this._PALETTE.length]},t.prototype.palettes=function(){var t;return t={},t.spectrum14=["#ecb796","#dc8f70","#b2a470","#92875a","#716c49","#d2ed82","#bbe468","#a1d05d","#e7cbe6","#d8aad6","#a888c2","#9dc2d3","#649eb9","#387aa3"].reverse(),t.spectrum2000=["#57306f","#514c76","#646583","#738394","#6b9c7d","#84b665","#a7ca50","#bfe746","#e2f528","#fff726","#ecdd00","#d4b11d","#de8800","#de4800","#c91515","#9a0000","#7b0429","#580839","#31082b"],t.spectrum2001=["#2f243f","#3c2c55","#4a3768","#565270","#6b6b7c","#72957f","#86ad6e","#a1bc5e","#b8d954","#d3e04e","#ccad2a","#cc8412","#c1521d","#ad3821","#8a1010","#681717","#531e1e","#3d1818","#320a1b"],t.classic9=["#423d4f","#4a6860","#848f39","#a2b73c","#ddcb53","#c5a32f","#7d5836","#963b20","#7c2626","#491d37","#2f254a"].reverse(),t.httpStatus={503:"#ea5029",502:"#d23f14",500:"#bf3613",410:"#efacea",409:"#e291dc",403:"#f457e8",408:"#e121d2",401:"#b92dae",405:"#f47ceb",404:"#a82a9f",400:"#b263c6",301:"#6fa024",302:"#87c32b",307:"#a0d84c",304:"#28b55c",200:"#1a4f74",206:"#27839f",201:"#52adc9",202:"#7c979f",203:"#a5b8bd",204:"#c1cdd1"},t.colorwheel=["#b5b6a9","#858772","#785f43","#96557e","#4682b4","#65b9ac","#73c03a","#cb513a"].reverse(),t.cool=["#5e9d2f","#73c03a","#4682b4","#7bc3b8","#a9884e","#c1b266","#a47493","#c09fb5"],t.munin=["#00cc00","#0066b3","#ff8000","#ffcc00","#330099","#990099","#ccff00","#ff0000","#808080","#008f00","#00487d","#b35a00","#b38f00","#6b006b","#8fb300","#b30000","#bebebe","#80ff80","#80c9ff","#ffc080","#ffe680","#aa80ff","#ee00cc","#ff8080","#666600","#ffbfff","#00ffcc","#cc6699","#999900"],t.paired=["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],t.agflow=["#0099ef","#ff009d","#56b501","#ffee52","#a34100","#0018ef","#ff89d2","#6ee801","#ef0018","#ffa468","#00efd7","#b3006e","#aefe66","#ed7446","#572200","#0010a3","#326901"],t},t}()}),require.register("agchart/utils/scale",function(t,e,i){var n,r,o;i.exports=o={},n={domain:e("agchart/utils/domain")},o.computeScales=r=function(t){var e,i,n,r,o,a;return i=t.confAxis,o=t.confGrid,r=t.domain,n=t.confCanvas,a=n.padding,e={x:d3.scale.linear(),y:d3.scale.linear()},null!=o.x.format&&(e.x=d3.time.scale.utc()),e.x.domain([r.minX,r.maxX]).range([a[0],n.width-a[0]]),n.scale.x.nice&&e.x.nice(),null!=o.y.format&&(e.y=d3.time.scale()),e.y.domain([r.minY,r.maxY]).range([n.height-a[1],a[1]]),n.scale.y.nice&&e.y.nice(),e
}}),require.register("agchart/utils/style",function(t,e,i){var n,r;i.exports=r={},r.Main=n=function(){function t(t){this.DOM=t}return t.prototype.apply=function(t){var e,i;for(e in t)i=t[e],this.DOM.attr(e,i);return this.DOM},t}()}),require.register("agchart/utils/time",function(t,e,i){var n,r;i.exports=r={},r.Main=n=function(){function t(t){var e;null==t&&(t={}),this._CONF={lang:null!=(e=t.lang)?e:"enl"},this._DATE=new Date,this._TIMESTAMP=this._DATE.getTime(),this._MONTHSNAME={},this._MONTHSNAME.en=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],this._MONTHSNAME.enl=["January","February","March","April","May","June","July","August","September","October","November","December"],this._MONTHSNAME.fr=["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"],this._MONTHSNAME.frl=["Janvier","Février","Mars","Avril","Mai","Juin","Juil","Août","Septembre","Octobre","Novembre","Décembre"]}return t.prototype.monthsName=function(){return this._MONTHSNAME[this._CONF.lang]},t.prototype.getMonth=function(){return this.monthsName()[this._DATE.getMonth()]},t.prototype.getDay=function(){return this._DATE.getDay()},t.prototype.getFullDate=function(){return this._DATE.getDay()+" "+this.getMonth()+" "+this._DATE.getYear()+" "+this._DATE.getHours()+":"+this._DATE.getMinutes()},t.prototype.getDate=function(){return this._DATE},t.prototype.setTimestamp=function(t){return null==t?this._TIMESTAMP:(this._DATE=new Date(1e3*parseInt(t)),this._TIMESTAMP=parseInt(t))},t}()}),require.register("agchart/utils/tools",function(t,e,i){var n,r,o;i.exports=n={},n.updateObject=o=function(t,e,i){var n,r;return null==i&&(i=!0),n=function(t){var e;return null!=(null!=t&&null!=(e=t[0])?e.nodeName:void 0)?!0:!1},(r=function(t,e,i){var o,a,s,l;if(null==i&&(i=!0),null!=e)for(o in e)n(e[o])?t[o]=null!=(a=e[o][0])?a:t[o][0]:"object"==typeof e[o]&&null!==e[o]?(null==t[o]&&(t[o]={}),r(t[o],e[o],i)):t[o]=i?null!=(s=e[o])?s:t[o]:null!=(l=t[o])?l:e[o];return t})(t,e,i)},n.prepareSeries=r=function(t){var e,i,n,r,o,a,s,l,c,d,f,u,h,p;if(null==(null!=(l=t.series)?l.length:void 0))throw new Error("No series defined, "+t.series+"should be an array of objects");if(t.series.length<1)throw new Error("At least one serie must be defined");for(c=t.series,e=r=0,a=c.length;a>r;e=++r)for(n=c[e],d=n.data,o=0,s=d.length;s>o;o++)i=d[o],i.serie=e,i.config={color:t.confPoint.color},t.palette.isDefined()&&(i.config.color=t.palette.color(e)),null!=(null!=(f=n.config)?f.color:void 0)&&(i.config.color=n.config.color),i.config.r=(null!=(u=n.config)?u.r:void 0)||t.confPoint.r,i.config.stroke={width:t.confPoint.stroke.width},null!=(null!=(h=n.config)&&null!=(p=h.stroke)?p.width:void 0)&&(i.config.stroke.width=n.config.stroke.width);return t.series}});