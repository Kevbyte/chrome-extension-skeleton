//module for generating urls for api calls

var content = require('../../content');

module.exports.tagUrl = function() {
    if (content.exposeSERVER()) {
        return content.exposeSERVER().url + "/tagging/producttags";
    }
};

module.exports.taxonomyUrl = function() {
    if (content.exposeSERVER()) {
        return content.exposeSERVER().url + "/tagging/taxonomy/nodes";
    }
};

module.exports.catalogUrl = function() {
    return content.exposeSERVER().url + "/tagging/shelfCount";
};

module.exports.allShelvesUrl = function() {
    return content.exposeSERVER().url + "/tagging/products";
};

