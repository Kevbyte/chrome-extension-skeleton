after you create a new template or change a template (ie. someFileName.handlebars) in this folder, run this command in terminal to pre-compile:

handlebars code/templates/*.handlebars -f code/templates/js/templates.js

(gulp will also run this command when you run "gulp" from the command line)
