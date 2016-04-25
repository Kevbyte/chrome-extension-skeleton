## Modularized Chrome Ext - Product Tagging Helper

* gulp-based build system
* node.js modules

### Build (you need to build in order to test the ext)

    cd extension
    npm install
    gulp

### Directory structure:

    /build
    
    /code
        /css           # CSS files
        /html          # HTML files
        /fonts
        /icons

        /js            # entry-points for browserify, requiring node.js `modules`
    
            /libs      # 3rd party run-time libraries
            /modules   # node.js modules

        /templates     # handlebars
    
        manifest.json  # skeleton manifest file, `name`, `description`
                       #   and `version` fields copied from `package.json`
    
    gulpfile.js       # gulp tasks (see below)
    mykey.pem          # certificate file, YOU NEED TO GENERATE THIS FILE, see below
    package.json       # project description file (name, version, dependencies, ...)