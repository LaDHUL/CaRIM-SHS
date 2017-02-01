"use strict;";

function prepareUserData(userId, mail) {
    check(userId, String);
    check(mail, String);
    var res = {};
    var info;
    try {
        info = Meteor.call('getLdapDataForUser', userId, mail);
    } catch (err) {
        console.log("No LDAP : ", err);
        info = false;
    }
    if (info) {
        return {uid: info.user.uid, info: info};
    }
    return new Meteor.Error("Invalid Credentials");
}

Accounts.onCreateUser(function(options, user) {

    check(options, Object);
    check(user, Object);
    var owner = user._id;
    var prepared;
    if (user.username !== "demo") {
        prepared = prepareUserData(user._id, user.emails[0].address);
    } else {
        prepared = {
            uid: "demo",
            info: {
                user: {
                    sn: "Demo",
                    givenName: "Demo",
                },
                status: ["Demo user"],
                unites: []
            }
        }
    }
    if (prepared instanceof Meteor.Error) {
        return prepared.info;
    } else {
        console.log("New user added {_id:", owner, "}")
        Inputs.personne_activites.insert(InputSchema.personne_activites.clean({owner: owner}));
        Inputs.competences_ordre.insert(InputSchema.competences_ordre.clean({owner: owner}));
        Inputs.competence.insert(InputSchema.competence.clean({owner: owner}));
        Inputs.projets.insert(InputSchema.projets.clean({owner: owner}));
        Inputs.projets_projet.insert(InputSchema.projets_projet.clean({owner: owner}));
        Inputs.collegues.insert(InputSchema.collegues.clean({owner: owner}));
        var info = prepared.info;

        Inputs.personne.insert(InputSchema.personne.clean({
            owner: owner,
            nom: info.user.sn instanceof Array
                ? info.user.sn[0]
                : info.user.sn,
            prenom: info.user.givenName instanceof Array
                ? info.user.givenName[0]
                : info.user.givenName,
            status: info.status[0]
        }));
        info.unites.forEach(function(doc) {
            Inputs.personne_unites.insert(InputSchema.personne_unites.clean({owner: owner, value: doc}));
        });

    }
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    user.username = prepared.uid;
    return user
});
