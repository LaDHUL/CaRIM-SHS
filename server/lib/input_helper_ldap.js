"use strict;";
/* global
Data,
getLdapDataAsync
*/

Meteor.methods({
    getLdapPerson: function(options) {
        this.unblock();
        check(options, Object);
        var searchText = options.searchText || "";
        var value = options.value || null;
        Meteor.wrapAsync(function(callback) {
            Meteor.setTimeout(function() {
                callback();
            }, 10);
        })();

        var filter = "";
        if (value !== null && value !== undefined && value.length > 0)
            value.forEach(function(val) {
                filter += "(uid=" + val + ")|"
            });

        filter = filter + "(&(objectClass=person)(!(ou=Etudiants))(!(ou=Externes))(uid=*)";
        if (searchText === undefined || searchText === null || searchText.length === 0) {
            filter = "(&(objectClass=person)(!(ou=Etudiants))(!(ou=Externes))(uid=*))";
        } else if (searchText.length < 3) {
            filter += "(|(givenName=" + searchText + "*)(sn=" + searchText + "*)))";
        } else if (searchText.indexOf(" ") > -1) {
            filter += "(cn~=" + searchText + "*))";
        } else {
            filter += "(|(givenName~=" + searchText + ")(sn~=" + searchText + ")))";
        }

        var limit = 0;
        if (searchText.length < 2) {
            limit = 10;
        }
        var data = {
            query: "o=Universite de Lausanne,c=ch",
            opts: {
                scope: "sub",
                filter: filter,
                attributes: [
                    "cn", "mail", "uid"
                ],
                timeLimit: 1,
                sizeLimit: limit
            }
        };

        var results;
        var getData;
        var res = [];
        try {
            getData = Meteor.wrapAsync(getLdapDataAsync);
            results = getData(data);
            if (typeof results === 'string') {
                res.push(results);
            } else if (results instanceof Array) {
                res = res.concat(results);
            }
        } catch (err) {
            throw new Meteor.Error("Can't find EMAIL on LDAP: try userName", err);
        }
        var arr = {};
        results.forEach(function(doc) {
            arr[doc.uid] = doc;
        });
        results = Object.keys(arr).map(function(key) {
            return arr[key];
        });

        res = results.map(function(doc) {
            return {
                label: (typeof doc.cn === 'string'
                    ? doc.cn
                    : doc.cn[0]) + (doc.mail
                    ? " (" + doc.mail + ")"
                    : ""),
                value: doc.uid
            };
        });
        return res;
    }
});
