//module for generating urls for api calls

//var content = require('../../content');

import * as content from '../../content';


export function tagUrl() {
    if (content.exposeSERVER()) {
        return content.exposeSERVER().url + "/tagging/producttags";
    }
}

export function taxonomyUrl() {
    if (content.exposeSERVER()) {
        return content.exposeSERVER().url + "/tagging/taxonomy/nodes";
    }
}

export function catalogUrl() {
    return content.exposeSERVER().url + "/tagging/shelfCount";
}

export function allShelvesUrl() {
    return content.exposeSERVER().url + "/tagging/products";
}

