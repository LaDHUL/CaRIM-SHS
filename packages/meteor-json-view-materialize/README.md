# json-view

jquery JSONView packaged for meteor

** Tested with Meteor @1.2. May or may not work on other versions

packaged jquery plugin: https://github.com/yesmeck/jquery-jsonview

The majority of the work was already done in [yasinuslu:json-view](https://github.com/yasinuslu/meteor-json-view/) I just removed the brackets and commas and added material expand/collapse icons

## installation
```
meteor add yasinuslu:json-view
```
You will also need to include materialize and materiali-icons. How you do this is up to you, but the easiest way is probably to use [materialize:materialize](https://atmospherejs.com/materialize/materialize) and [planettraining:material-design-icons](https://atmospherejs.com/planettraining/material-design-icons)
```
meteor add materialize:materialize
meteor add planettraining:material-design-icons
```
## usage
```handlebars
	{{> jsonView json=jsonData options=options }}
```

## arguments
- json: required
- options: optional options for $(selector).jsonView