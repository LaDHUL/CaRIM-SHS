Capitalise = function(str) {
    return str.toLowerCase().replace(/(^|\s)[a-z\u00E0-\u00FC]/g, function(m) {
        return m.toUpperCase();
    })
}
