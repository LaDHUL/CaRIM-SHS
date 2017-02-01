"use strict;";

LDAP.generateSettings =  function () {
  return {
    "tryDBFirst": true,
    "serverDn": "DC=ad,DC=unil,DC=ch",
    "serverUrl": "ldap://ad.unil.ch",
    "multitenantIdentifier": false,
    "searchField": "mail",
    "searchValueType": "email",
    "autopublishFields": ['displayName', 'givenName', 'sn', 'telephoneNumber', 'mail'],
    "whiteListedFields": ['displayName', 'givenName', 'sn', 'cn', 'mail', 'telephoneNumber']
    };
};


LDAP.tryDBFirst = true;
LDAP.logging = false;


LDAP.filter = function (isEmailAddress, username, FQDN) {
  return '(mail=' + username + ')';
};


LDAP.searchValue = function (isEmailAddress, username, FQDN) {
  return username;
};


LDAP.bindValue = function (username, isEmailAddress, FQDN) {
  return  username;
};


LDAP.addFields = function (person) {
   return {mail: person.mail, uid: person.sAMAccountName, username:person.cn};
};
