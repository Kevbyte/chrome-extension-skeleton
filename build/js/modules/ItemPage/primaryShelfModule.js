!function e(t,n,o){function r(s,i){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!i&&l)return l(s,!0);if(a)return a(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[s]={exports:{}};t[s][0].call(d.exports,function(e){var n=t[s][1][e];return r(n?n:e)},d,d.exports,e,t,n,o)}return n[s].exports}for(var a="function"==typeof require&&require,s=0;s<o.length;s++)r(o[s]);return r}({1:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){return c}function a(){return d}function s(){return l}function i(){var e=window.MutationObserver||window.WebKitMutationObserver,t=new e(function(e,t){l=null,(0,p.getShelf)().done(function(e){l=e,f.injectToolbar()})});t.observe(document.querySelector("#search-container"),{subtree:!1,childList:!0})}Object.defineProperty(n,"__esModule",{value:!0}),n.exposeSERVER=r,n.exposePAGE=a,n.exposeShelf=s;var l,c,d,p=e("../js/modules/Common/shelfScraper"),u=e("./modules/ShelfPage/toolBarModule"),f=o(u),m=e("./modules/ItemPage/allShelvesModule"),h=o(m),v=e("./modules/ItemPage/pcfModule"),b=o(v);chrome.extension.sendMessage({type:"SHOW_PRODUCT_PAGE_ACTION"},function(e){e.pageAction&&(c=e.server,d="Product page",(0,p.getShelf)().done(function(e){l=e,b.injectPCFLink(),h.injectAllShelves()}))}),chrome.extension.sendMessage({type:"SHOW_SHELF_PAGE_ACTION"},function(e){e.pageAction&&(c=e.server,(0,p.getShelf)().done(function(e){l=e,f.injectToolbar()}),i())}),chrome.extension.onMessage.addListener(function(e,t,n){"UPDATE_SHELF"===e.type&&(c=e.server,l||(0,p.getShelf)().done(function(e){l=e}))})},{"../js/modules/Common/shelfScraper":4,"./modules/ItemPage/allShelvesModule":7,"./modules/ItemPage/pcfModule":8,"./modules/ShelfPage/toolBarModule":10}],2:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){var t=$(this),n=$(this).closest(".tile-grid-unit"),o=n.data("item-id");o="16609782";var r=$(this).data("productId");r="72XR8X38E3TZ";var a=[c.exposeShelf().id],s=c.exposeShelf().name,i=n.find(".popover.in"),l=i.find(".popover-content").get(0);"Product page"===c.exposePAGE()&&(a=[$(this).data("shelf-id")],r=p.getProductId(),r="72XR8X38E3TZ",i=$(this).closest(".js-full-paths").find(".popover.in"),l=i.find(".popover-content").get(0));var d=new Spinner(v).spin(l);return $.ajax({url:f.tagUrl()+"/"+r,headers:{"X-Requested-With":"XMLHttpRequest"},type:"PUT",data:{decision:"is_not",mode:"append",productId:r,itemId:o,attrId:"shelf",valueIds:a}}).done(function(e){chrome.extension.sendMessage({type:"NOTIFY",title:"Recommend Item for Removal",message:"SUCCESS! Item "+o+" ("+r+") submitted for removal from shelf "+a[0]+" ("+s+")."}),"Product page"===c.exposePAGE()&&$(t).closest(".js-remove-shelf-button").find(".js-remove-btn").replaceWith("<i>Removed</i>")}).fail(h.createErrorHandler("Remove Shelf Tag")).always(function(){d.stop(),i.popover("hide")})}function a(e){var t=window.location.pathname,n=t.substring(t.lastIndexOf("/")+1),o=p.getProductId(),o="72XR8X38E3TZ",r=$(".js-add-shelf-btn").parent().find(".js-select-tag_").select2("data"),a=[r.category_id],s=r.name,i=$(".js-add-shelf-btn").parent().find(".popover.in"),l=$(".js-add-shelf-section").get(0),c=new Spinner(v).spin(l);return $.ajax({url:f.tagUrl()+"/"+o,headers:{"X-Requested-With":"XMLHttpRequest"},type:"PUT",data:{decision:"is",mode:"append",productId:o,itemId:n,attrId:"shelf",valueIds:a}}).done(function(e){o=e.productId,chrome.extension.sendMessage({type:"NOTIFY",title:"Add a New Shelf for Item",message:"SUCCESS! Shelf "+a[0]+" ("+s+") is now a shelf for "+n+" ("+o+")."})}).fail(h.createErrorHandler("Add New Shelf for Item")).always(function(){c.stop(),i.popover("hide")}),!1}function s(e){var t=$(this).closest(".tile-grid-unit"),n=t.data("item-id");n="16609782";var o,o="72XR8X38E3TZ",r=[c.exposeShelf().id],a=t.find(".js-select-tag_").select2("data"),s=[a.category_id],i=a.name,l=t.find(".popover.in"),d=l.find(".popover-content").get(0),p=new Spinner(v).spin(d),u=$.ajax({url:f.tagUrl()+"/"+o,headers:{"X-Requested-With":"XMLHttpRequest"},type:"PUT",data:{decision:"is_not",mode:"append",itemId:n,attrId:"shelf",valueIds:r}}),m=$.ajax({url:f.tagUrl()+"/"+o,headers:{"X-Requested-With":"XMLHttpRequest"},type:"PUT",data:{decision:"is",mode:"append",itemId:n,attrId:"shelf",valueIds:s}}).done(function(e){o=e.productId});return $.when(u,m).done(function(){chrome.extension.sendMessage({type:"NOTIFY",title:"Recommend New Shelf for Item",message:"SUCCESS! Item "+n+" ("+o+") moved to shelf "+s[0]+" ("+i+")."})}).fail(h.createErrorHandler("Recommend New Shelf for Item")).always(function(){p.stop(),l.popover("hide")}),!1}function i(e){var t=window.location.pathname,n=t.substring(t.lastIndexOf("/")+1),o=p.getProductId(),o="72XR8X38E3TZ",r=$(".js-edit-shelf-button").find(".js-select-tag_").select2("data"),a=[r.category_id],s=r.name,i=$(".js-edit-shelf-button").find(".popover.in"),l=i.find(".popover-content").get(0),c=new Spinner(v).spin(l);return $.ajax({url:f.tagUrl()+"/"+o,headers:{"X-Requested-With":"XMLHttpRequest"},type:"PUT",data:{decision:"is",mode:"append",productId:o,itemId:n,attrId:"shelf",valueIds:a,primary:!0}}).done(function(e){o=e.productId,chrome.extension.sendMessage({type:"NOTIFY",title:"Recommend New Primary Shelf for Item",message:"SUCCESS! Shelf "+a[0]+" ("+s+") is now the primary shelf for "+n+" ("+o+")."});$(".js-full-path span").each(function(){var e=$(this).text().split(">");e[e.length-1].slice(2)===r.name&&$(this).closest(".js-full-paths").find(".js-remove-btn").replaceWith("<i>Selected as primary</i>")}),r.name}).fail(h.createErrorHandler("Recommend New Primary Shelf for Item")).always(function(){c.stop(),i.popover("hide")}),!1}Object.defineProperty(n,"__esModule",{value:!0}),n.onConfirmReject=r,n.onConfirmAdd=a,n.onConfirmAccept=s,n.onConfirmEdit=i;var l=e("../../content"),c=o(l),d=e("../Common/productIDScraper"),p=o(d),u=e("../Common/urlGenerator"),f=o(u),m=e("../Common/supportUtil"),h=o(m),v={lines:6,length:10,width:8,radius:10,rotate:90,color:"#FFB94E",className:"spinner_"}},{"../../content":1,"../Common/productIDScraper":3,"../Common/supportUtil":5,"../Common/urlGenerator":6}],3:[function(e,t,n){"use strict";function o(){var e=$(".js-product-page").next("script").text(),t=e.indexOf('define("product/data",'),n=e.substring(t+'define("product/data",'.length),o=n.indexOf("define"),r=n.substring(0,o),a=r.lastIndexOf("}");if(t>-1&&o>-1){var s=r.substring(0,a+1),i=JSON.parse(s),l=i.productId;return l}}Object.defineProperty(n,"__esModule",{value:!0}),n.getProductId=o},{}],4:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){var e,t=$("#search-container").find("script").last().text(),n=t.indexOf("window._WML.MIDAS_CONTEXT =");if(n>-1)var o=t.substring(n+"window._WML.MIDAS_CONTEXT = ".length,1+t.lastIndexOf("}")),e=JSON.parse(o);if(!e)return null;var r=e.categoryPathId,a=e.categoryPathName;return{id:r.substr(1+r.lastIndexOf(":")),name:a.substr(1+a.lastIndexOf("/"))}}function a(){var e=r();if(!e){var t=JSON.parse($("#tb-djs-wml-base").text()),n=t.adContextJSON.categoryPathId,o=t.adContextJSON.categoryPathName;e={id:n.substr(1+n.lastIndexOf(":")),name:o.substr(1+o.lastIndexOf("/"))}}var a=$.Deferred(),s={category_id:e.id};return $.ajax({url:i.taxonomyUrl(),type:"GET",headers:{"X-Requested-With":"XMLHttpRequest"},data:{all:!0,filter:JSON.stringify(s)}}).done(function(t){var n=t._items[0];n&&"BROWSE_SHELF"===n.properties.tango.nodeType?a.resolve(e):a.reject()}).fail(function(){a.reject()}),a}Object.defineProperty(n,"__esModule",{value:!0}),n.getShelf=a;var s=e("../Common/urlGenerator"),i=o(s)},{"../Common/urlGenerator":6}],5:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){for(var t=e.relations.parent.expanded,n=[],o=0;o<t.length;o++)n.push(t[o].name);return n.reverse().join(" > ")}function a(e){if(e.loading)return e.text;var t='<div class="clearfix"><div>'+e.name+'<span style="color: #cccccc"> ('+r(e)+")</span></div>";return t}function s(e){return r(e)}function i(e){return e.name}function l(){return{minimumInputLength:1,placeholder:"Search shelves...",ajax:{url:f.taxonomyUrl(),type:"GET",headers:{"X-Requested-With":"XMLHttpRequest"},dataType:"json",quietMillis:400,data:function(e,t){return{page:t,searchTerm:"(name:"+e+"^4 OR name:"+e+"* OR singular:"+e+"*^3 OR plural:"+e+"*^2)",searchTypes:["node"]}},results:function(e,t){var n=25*t<e._meta.total;return{results:e._items,more:n}},cache:!0},id:function(e){return e._id},dropdownCssClass:"bootstrap",formatResult:a,formatSelection:i}}function c(e){return function(t,n,o){chrome.extension.sendMessage({type:"NOTIFY",title:e,message:"("+n+") "+(t.responseText||o)})}}function d(){0===$(this).parent().find(".popover.in").length?$(this).popover("show"):$(this).popover("hide")}function p(){return 0!==$(this).closest(".popover.in").length?($(this).closest(".popover.in").popover("hide"),!1):void $(this).popover("show")}Object.defineProperty(n,"__esModule",{value:!0}),n.getItemPath=s,n.createSelectOptions=l,n.createErrorHandler=c,n.toggleItemPagePopover=d,n.onTogglePopover=p;var u=e("../Common/urlGenerator"),f=o(u)},{"../Common/urlGenerator":6}],6:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){return c.exposeSERVER()?c.exposeSERVER().url+"/tagging/producttags":void 0}function a(){return c.exposeSERVER()?c.exposeSERVER().url+"/tagging/taxonomy/nodes":void 0}function s(){return c.exposeSERVER().url+"/tagging/shelfCount"}function i(){return c.exposeSERVER().url+"/tagging/products"}Object.defineProperty(n,"__esModule",{value:!0}),n.tagUrl=r,n.taxonomyUrl=a,n.catalogUrl=s,n.allShelvesUrl=i;var l=e("../../content"),c=o(l)},{"../../content":1}],7:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){var e=s.getProductId(),e="72XR8X38E3TZ",t=window.location.pathname,n=t.substring(t.lastIndexOf("/")+1),o=Handlebars.templates.allShelvesPopupContent,r=o({itemId:n,productId:e});$(".js-product-page .breadcrumb-list nav").append("<div class='js-all-shelves-toolbar bootstrap btn-toolbar' role='toolbar' style='display:inline-block;margin-left:10px'><a tabindex='1' class='js-all-shelves-btn btn btn-xs btn-warning btn-center_ disabled' role='button' data-toggle='popover'><span class='glyphicon glyphicon-th-list' style='font-size: 10px'/> All shelves</a></div>");var a,i=$(".js-product-page .js-all-shelves-btn");$.ajax({url:l.allShelvesUrl(),headers:{"X-Requested-With":"XMLHttpRequest"},type:"GET",data:{searchTerm:e,sourceId:null,tenantId:"all"}}).done(function(e){a=e.docs[0],$(i).removeClass("disabled")}).fail(u.createErrorHandler("Retrieve All Shelves for Product")).always(function(){}),$(i).popover({content:r,html:!0,placement:"bottom",trigger:"manual",title:"All shelves"}).on("shown.bs.popover",function(t){if(a){var o=a.product_attributes.primary_shelf.values[0].path_id,r=a.product_attributes.primary_shelf.values[0].path_str,i="Home Page"===JSON.parse(r)[0]?JSON.parse(r).slice(1).join("  >  "):JSON.parse(r).join("  >  ");$(".js-all-shelves-container").append("<div class='js-full-paths-primary' data-shelf-id='"+o+"' style='margin-top:10px'><li class='js-full-path-primary breadcrumb' style='line-height: 0.5'><span itemprop='name'>"+i+"</span></li></div>"),0===$(".js-product-page .breadcrumb-list nav").children().length?d.injectPrimaryShelfEditor({noShelf:!0}):d.injectPrimaryShelfEditor(),a.product_attributes.all_shelves.values.forEach(function(t){if(t.path_id!==o){$(".js-all-shelves-container").append("<div class='js-full-paths' style='margin-top:10px'></div>");var n="Home Page"===JSON.parse(t.path_str)[0]?JSON.parse(t.path_str).slice(1):JSON.parse(t.path_str),r=n.join("  >  ");$(".js-full-paths").last().append("<li class='js-full-path breadcrumb' style='line-height: 0.5'><span itemprop='name'>"+r+"</span></li>"),$(".js-full-paths").last().append("<div class='js-remove-shelf-button bootstrap btn-toolbar' style='display:inline-block;position:absolute;right:15px;'><a tabindex='1' class='js-remove-btn btn btn-xs btn-danger btn-center_' role='button' data-shelf-id='"+t.id+"' data-toggle='popover'><span class='glyphicon glyphicon-thumbs-down' style='font-size:10px; margin-top: 2px'/> Remove</a></div>");var a="*[data-shelf-id="+t.id+"]",s=$(a).closest(".js-full-paths").find(".js-full-path").find("span").text(),i=s.lastIndexOf(">")+3,l=s.slice(i),c=Handlebars.templates.rejectPopupContent,d=c({shelfName:l,productId:e,shelfId:t.id,allShelves:!0});$(a).popover({content:d,html:!0,placement:"right",trigger:"manual",title:"Recommend Item for Removal"}).on("shown.bs.popover",function(e){!function(e){$(e).parent().find(".js-yes-no-reject-toolbar").off("click",".js-confirm-reject-btn").on("click",".js-confirm-reject-btn",m.onConfirmReject),$(e).parent().find(".js-yes-no-reject-toolbar").off("click",".js-cancel-btn").on("click",".js-cancel-btn",u.onTogglePopover)}(a)}).on("hide.bs.popover",function(e){}),function(e){$(e).on("click",u.toggleItemPagePopover)}(a)}})}$(".js-all-shelves-popup").find(".js-close-btn").off().on("click",u.onTogglePopover);var l=Handlebars.templates.overridePopupContent,c=l({text:"You can add a shelf for this item "+n+"("+s.getProductId()+"):",note:"We will submit your recommendation to add this shelf to this item - this will be reviewed within 2 days."}),p=$(".js-add-shelf-btn");$(p).popover({content:c,html:!0,placement:"bottom",trigger:"manual",title:"Add a Shelf for this Item"}).on("shown.bs.popover",function(e){$(p).parent().find(".js-select-tag_").select2(u.createSelectOptions()).on("change",function(e){$(p).parent().find(".js-tag-path_").text("("+u.getItemPath(e.added)+")"),$(p).parent().find(".js-confirm-accept-btn").removeClass("disabled")}),$(p).parent().off("click",".js-confirm-accept-btn").on("click",".js-confirm-accept-btn",m.onConfirmAdd),$(p).parent().off("click",".js-cancel-btn").on("click",".js-cancel-btn",u.onTogglePopover)}).on("hide.bs.popover",function(e){$(p).find(".js-select-tag_").select2("destroy")}),$(p).on("click",u.toggleItemPagePopover)}).on("hide.bs.popover",function(e){$(".js-all-shelves-popup").find(".js-select-tag_").select2("destroy")}),$(i).on("click",u.toggleItemPagePopover)}Object.defineProperty(n,"__esModule",{value:!0}),n.injectAllShelves=r;var a=e("../Common/productIDScraper"),s=o(a),i=e("../Common/urlGenerator"),l=o(i),c=e("../ItemPage/primaryShelfModule"),d=o(c),p=e("../Common/supportUtil"),u=o(p),f=e("../Common/confirmationUtil"),m=o(f)},{"../Common/confirmationUtil":2,"../Common/productIDScraper":3,"../Common/supportUtil":5,"../Common/urlGenerator":6,"../ItemPage/primaryShelfModule":9}],8:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){var e=l.getProductId();$(".js-product-page .js-product-primary .product-subhead").append("<div class='btn-toolbar bootstrap' role='toolbar'><button role='button' class='js-PCF-button btn btn-xs btn-success cell-btn'>Product Details (PCF)</button></div>"),$(".js-PCF-button").off().on("click",function(){window.open(s.exposeSERVER().url+"/pcf_product_details/product/canonical?product_id="+e,"_blank")})}Object.defineProperty(n,"__esModule",{value:!0}),n.injectPCFLink=r;var a=e("../../content"),s=o(a),i=e("../Common/productIDScraper"),l=o(i),c=e("../Common/supportUtil"),d=(o(c),e("../Common/confirmationUtil"));o(d)},{"../../content":1,"../Common/confirmationUtil":2,"../Common/productIDScraper":3,"../Common/supportUtil":5}],9:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){var t=window.location.pathname,n=t.substring(t.lastIndexOf("/")+1),o=Handlebars.templates.overridePopupContent,r=o({text:"Please choose a new primary shelf for item "+n+"("+s.getProductId()+"):",note:"We will submit your recommendation to change the primary shelf of this item - this will be reviewed within 2 days."});e&&e.noShelf?$(".js-product-page .breadcrumb-list nav").append("<li class='breadcrumb'><span style='color:grey'><i>Suggest a Primary Shelf</i></span></li>").append("<div class='js-edit-shelf-button bootstrap btn-toolbar' role='toolbar' style='display:inline-block;margin-left:10px'><a tabindex='1' class='js-edit-btn btn btn-xs btn-warning btn-center_' role='button' data-toggle='popover'><span class='glyphicon glyphicon-pencil' style='font-size: 10px'/> Primary shelf</a></div>"):$(".js-full-paths-primary").append("<div class='js-edit-shelf-button bootstrap btn-toolbar' role='toolbar' style='position:absolute;right:15px;display:inline-block;margin-left:10px'><a tabindex='1' class='js-edit-btn btn btn-xs btn-warning btn-center_' role='button' data-toggle='popover'><span class='glyphicon glyphicon-pencil' style='font-size: 10px'/> Primary shelf</a></div><hr style='margin-top:0;margin-bottom:20px'>");var a=$(".js-edit-shelf-button");$(".js-edit-btn").popover({content:r,html:!0,placement:"right",trigger:"manual",title:"Recommend New Primary Shelf for Item"}).on("shown.bs.popover",function(e){$(a).find(".js-select-tag_").select2(l.createSelectOptions()).on("change",function(e){$(a).find(".js-tag-path_").text("("+l.getItemPath(e.added)+")"),$(a).find(".js-confirm-accept-btn").removeClass("disabled")}),$(a).off("click",".js-confirm-accept-btn").on("click",".js-confirm-accept-btn",d.onConfirmEdit),$(a).off("click",".js-cancel-btn").on("click",".js-cancel-btn",l.onTogglePopover)}).on("hide.bs.popover",function(e){$(a).find(".js-select-tag_").select2("destroy")}),$(a).on("click",".js-edit-btn",l.toggleItemPagePopover)}Object.defineProperty(n,"__esModule",{value:!0}),n.injectPrimaryShelfEditor=r;var a=e("../Common/productIDScraper"),s=o(a),i=e("../Common/supportUtil"),l=o(i),c=e("../Common/confirmationUtil"),d=o(c)},{"../Common/confirmationUtil":2,"../Common/productIDScraper":3,"../Common/supportUtil":5}],10:[function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){function e(){var e=$(this).closest(".tile-grid-unit"),t=e.data("item-id"),t="16609782";$.ajax({url:l.catalogUrl()+"/"+t,headers:{"X-Requested-With":"XMLHttpRequest"},type:"GET",data:{itemId:t}}).done(function(e){e.shelfCount<2&&$("#rejectPopup").prepend("<span class='warning' style='color:red'>WARNING: This item belongs to only one shelf and would be moved to UNNAV if you continue. We would recommend moving the item to a different shelf.</span><br><br>"),$("#rejectPopup").find(".js-confirm-reject-btn").removeClass("disabled"),$("#rejectPopup").find(".js-confirm-reject-btn").data("productId",e.productId)});var n=s.exposeShelf(),o=Handlebars.templates.rejectPopupContent,r=o({itemId:t,shelfName:n.name,shelfId:n.id});return r}function t(){var e=$(this).closest(".tile-grid-unit"),t=e.data("item-id"),t="16609782",n=(s.exposeShelf(),Handlebars.templates.overridePopupContent),o=n({text:"Please choose a new shelf for item "+t+":",note:"We will submit your recommendation to move this item from this shelf - this will be reviewed within 2 days."});return o}$("#tile-container").addClass("bootstrap"),$("#search-container .tile-grid-unit").append("<div class='js-tag-toolbar_ tag-toolbar btn-toolbar' role='toolbar'><a tabindex='0' class='js-accept-btn accept-btn btn btn-xs btn-success btn-center_' role='button' data-toggle='popover'><i class='fa fa-share'></i> Move to...</button><a tabindex='1' class='js-reject-btn btn btn-xs btn-danger btn-center_' role='button' data-toggle='popover'><span class='glyphicon glyphicon-thumbs-down'/> Remove</button></div>"),$("#search-container .js-accept-btn").popover({content:t,html:!0,placement:"top",trigger:"manual",title:"Recommend New Shelf for Item"}).on("shown.bs.popover",function(e){var t=$(this).closest(".js-tag-toolbar_");t.find(".js-select-tag_").select2(d.createSelectOptions()).on("change",function(e){t.find(".js-tag-path_").text("("+d.getItemPath(e.added)+")"),t.find(".js-confirm-accept-btn").removeClass("disabled")})}).on("hide.bs.popover",function(e){$(this).closest(".js-tag-toolbar_").find(".js-select-tag_").select2("destroy")}),$("#search-container .js-reject-btn").popover({content:e,html:!0,placement:"top",trigger:"manual",title:"Recommend Item for Removal"});var n=$("#search-container .tile-grid-unit"),o=$("#tile-container");n.mouseenter(function(){0===o.find(".popover.in").length&&(n.removeClass("outline"),$(this).addClass("outline"))}).mouseleave(function(){0===$(this).find(".popover.in").length&&$(this).removeClass("outline")}),$("#search-container").on("click",".js-accept-btn,.js-reject-btn",d.onTogglePopover),$("#search-container").on("click",".js-confirm-reject-btn",u.onConfirmReject),$("#search-container").on("click",".js-confirm-accept-btn",u.onConfirmAccept),$("#search-container").on("click",".js-cancel-btn",d.onTogglePopover)}Object.defineProperty(n,"__esModule",{value:!0}),n.injectToolbar=r;var a=e("../../content"),s=o(a),i=e("../Common/urlGenerator"),l=o(i),c=e("../Common/supportUtil"),d=o(c),p=e("../Common/confirmationUtil"),u=o(p)},{"../../content":1,"../Common/confirmationUtil":2,"../Common/supportUtil":5,"../Common/urlGenerator":6}]},{},[9]);