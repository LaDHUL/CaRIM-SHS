"use strict;";


BrowserPolicy.content.allowOriginForAll( 'fonts.googleapis.com' );
BrowserPolicy.content.allowOriginForAll("*.gstatic.com");
BrowserPolicy.content.allowOriginForAll("*.bootstrapcdn.com");
BrowserPolicy.content.allowOriginForAll("platec.unil.ch");
BrowserPolicy.content.allowOriginForAll("d3js.org")



Meteor.users.deny({
    update() {
        return true;
    }
});
