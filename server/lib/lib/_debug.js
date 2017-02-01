variablesOut = {};

writeOut = function (txt) {
    check(txt, Object);
    variablesOut[txt.key] = txt.value
    var unflatten = require('flat').unflatten
    var fs = require('fs')
    var name = "used_variables.json"
    var path = process.env.PWD
    path = path.slice(0, path.lastIndexOf('/') + 1);
    fs.writeFile(path + name, JSON.stringify(unflatten(variablesOut, {
        safe: true
    })), 'utf-8', function (err) {
        if (err) {
            throw (new Meteor.Error(500, 'Failed to save file.', err));
        }
    });
}
