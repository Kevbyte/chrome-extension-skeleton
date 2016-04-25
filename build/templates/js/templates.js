(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['allShelvesPopupContent'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class='js-all-shelves-popup' style='width: 500px; height: auto;'>\n    This item, "
    + alias4(((helper = (helper = helpers.itemId || (depth0 != null ? depth0.itemId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.productId || (depth0 != null ? depth0.productId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"productId","hash":{},"data":data}) : helper)))
    + "), exists on these shelves:\n    <div class='js-all-shelves-container' style='margin-top:30px'></div>\n    <div class='js-yes-no-toolbar btn-toolbar' role='toolbar' style='text-align: center; margin-bottom:10px'>\n        <button class='js-add-shelf-btn dialog-btn_ btn btn-sm btn-success' type='button'><span class='glyphicon glyphicon-plus-sign'></span> Add shelf</button>\n        <button class='js-close-btn dialog-btn_ btn btn-sm btn-default' type='button'>Close</button>\n    </div>\n</div>";
},"useData":true});
templates['overridePopupContent'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div style='width: 500px; height: 320px;'>\n    "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n    <div style='padding: 6px 0'>\n        <input class='js-select-tag_ select-tag_'>\n        <div class='js-tag-path_ text-muted' style='padding-top: 10px;'/>\n        <div class='note_ small text-muted'>"
    + alias4(((helper = (helper = helpers.note || (depth0 != null ? depth0.note : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"note","hash":{},"data":data}) : helper)))
    + "</div>\n        <div class='yes-no-toolbar_ btn-toolbar' role='toolbar'>\n            <button class='js-confirm-accept-btn dialog-btn_ btn btn-sm btn-primary disabled' type='button'>OK</button>\n            <button class='js-cancel-btn dialog-btn_ btn btn-sm btn-default' type='button'>Cancel</button>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['rejectPopupContent'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <button class='js-confirm-reject-btn dialog-btn_ btn btn-sm btn-primary' type='button' data-shelf-id="
    + container.escapeExpression(((helper = (helper = helpers.shelfId || (depth0 != null ? depth0.shelfId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"shelfId","hash":{},"data":data}) : helper)))
    + ">OK</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <button class='js-confirm-reject-btn dialog-btn_ btn btn-sm btn-primary disabled' type='button'>OK</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id='rejectPopup' style='width: 300px; height: 200px'>\n    Are you sure item "
    + alias4(((helper = (helper = helpers.itemId || (depth0 != null ? depth0.itemId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemId","hash":{},"data":data}) : helper)))
    + " does not belong on shelf "
    + alias4(((helper = (helper = helpers.shelfName || (depth0 != null ? depth0.shelfName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shelfName","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.shelfId || (depth0 != null ? depth0.shelfId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shelfId","hash":{},"data":data}) : helper)))
    + ")?\n    <div class='js-yes-no-reject-toolbar yes-no-toolbar_ btn-toolbar' role='toolbar' style='text-align:center'>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.allShelves : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        <button class='js-cancel-btn dialog-btn_ btn btn-sm btn-default' type='button'>Cancel</button>\n    </div>\n</div>";
},"useData":true});
templates['test'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>"
    + container.escapeExpression(((helper = (helper = helpers.testing_template || (depth0 != null ? depth0.testing_template : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"testing_template","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});
})();