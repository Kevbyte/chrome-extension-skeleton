The `name`, `version` and `description` fields will be added to the
`manifest.json` file from main `package.json` during the build process. The JS
files referenced here and also in all the HTML files in `html` directory will
see the *processed* files (all the dependencies resolved).

//{
//  "manifest_version": 2,
//  "icons": { "128": "images/icon.png" },
//  "browser_action": {
//    "default_icon": "images/icon.png",
//    "default_popup": "html/popup.html"
//  },
//  "background": { "scripts": ["js/background.js"] },
//  "content_scripts": [{
//    "matches": [ "http://*/*", "https://*/*" ],
//    "js": [ "js/content.js" ]
//  }],
//  "options_page": "html/options.html",
//  "devtools_page": "html/devtools.html",
//  "permissions": [ "<all_urls>" ],
//  "web_accessible_resources": [ "js/*", "html/*", "css/*", "images/*" ],
//  "content_security_policy": "script-src 'self'; object-src 'self'"
//}
