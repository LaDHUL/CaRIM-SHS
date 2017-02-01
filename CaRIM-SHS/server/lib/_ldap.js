"use strict;";
/* global
require,
getLdapDataAsync:true,
*/
const LDAP_LIB = require('ldapjs');


getLdapDataAsync = function (data, callback) {
    check(data, Object);
    var query = data.query;
    var opts = data.opts;
    var Future = require('fibers/future');
    var future = new Future();

    var client;
    var res;
    var results = [];

    var client = LDAP_LIB.createClient({
        url: 'ldap://ldap.unil.ch:389',
        reconnect: true
    });

    client.on('error', function (err) {
        throw new Meteor.Error(
            "NO CONNECTION TO LDAP SERVER! :\n" + err.message
        );
    });

    try {
        client.search(query, opts, function (err, res) {
            if (err) {
                throw new Meteor.Error("LDAP DATA RETRIEVAL FAILED! :\n" +
                    err.message);
            }
            res.on('searchEntry', function (entry) {
                results.push(entry.object);
            });
            res.on('error', function () {
                future.return(results.length === 0);
            });
            res.on('end', function () {
                future.return(results.length === 0);
            });
        });
        res = future.wait();
        client.destroy();
    } catch (err) {
        throw new Meteor.Error("LDAP DATA FETCHING FAILED! :\n" + err.message);
    }

    if (callback) {
        callback(null, results);
    } else if (results) {
        return results;
    }
};


Meteor.methods({
    getLdapEmail: function (username) {
        check(username, String);
        
        if (username == "demo" || username=="demo@unil.ch"){
            return "demo@unil.ch"
        }

        var filter;
        if (/@/g.test(username)) {
            if (Meteor.users.findOne({
                    mail: username
                })) {
                return username;
            }
            filter = "(&(mail=" + username +
                ")(objectClass=person)(!(ou=Etudiants)))";
        } else {
            if (Meteor.users.findOne({
                    uid: username
                })) {
                return Meteor.users.findOne({
                    uid: username
                }).mail;
            }
            filter = "(&(uid=" + username +
                ")(objectClass=person)(!(ou=Etudiants)))";
        }
        var data = {
            query: "o=Universite de Lausanne,c=ch",
            opts: {
                'scope': "sub",
                'timeLimit': 1,
                'filter': filter,
                'attributes': ["mail"]
            }
        };
        var results;
        var getData;
        try {
            getData = Meteor.wrapAsync(getLdapDataAsync);
            results = getData(data);
            return results[0].mail || "";
        } catch (err) {
            throw new Meteor.Error(
                "Can't find EMAIL on LDAP: try userName", err
            );
        }
    },
    getLdapDataForUser: function (userID, mail) {
        check(userID, String);
        check(mail, String);
        var unit;
        var item;
        var data = {
            query: "o=Universite de Lausanne,c=ch",
            opts: {
                scope: "sub",
                timeLimit: 3,
                filter: "(mail=" + mail + ")",
                attributes: ["parentid", "description", "givenName", "sn",
                    "uid"
                ]
            }
        };
        var getData;
        var results;
        try {
            getData = Meteor.wrapAsync(getLdapDataAsync);
            results = getData(data);
        } catch (err) {
            throw new Meteor.Error(' LDAP DATA', err);
        }
        var unites = [];
        var status = [];
        var user = {};
        for (var i = 0; i < results.length; i++) {
            item = results[i];
            unit = Data.unites.findOne({
                'orig.entryid': parseInt(item.parentid)
            }, {
                fields: {
                    _id: 1,
                    ldap: 1
                }
            });
            if (unit) {
                unites.push(
                    unit._id
                );
            }
            if (i === 0) {
                user.givenName = item.givenName;
                user.sn = item.sn;
                user.uid = item.uid;
            }
            status.push(item.description);
        }
        return {
            unites: unites,
            status: status,
            user: user
        };
    }

});
