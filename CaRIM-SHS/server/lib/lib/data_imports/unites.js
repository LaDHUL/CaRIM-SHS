if (Meteor.isServer) {
    function getRootUniteId() {
        var getData;
        var orig;

        var id = Data['unites'].findOne({
            isRoot: true,
        }, {
            fields: {
                _id: 1
            }
        });
        if (id) {
            return id._id;
        }


        var request = {
            query: "o=Universite de Lausanne,c=ch",
            opts: {
                'scope': "base",
                'timeLimit': 1,
                'filter': "(objectClass=*)",
                'attributes': ["o", "entryid", "parentid", "dn", "nsUniqueId"]
            }
        };

        try {
            getData = Meteor.wrapAsync(getLdapDataAsync);
            orig = getData(request);
        } catch (err) {
            throw new Meteor.Error("Could not find Ldap Tree Root:\n", err.message);
        }
        orig = orig[0];
        orig.dn = String(orig.dn);
        orig.entryid = parseInt(orig.entryid);
        orig.ou = orig.o;
        orig.dn = 'o=Universite de Lausanne,c=ch';
        orig.parentid = -1;
        root = {
            name: orig.o.toString(),
            orig: orig,
            isParent: true,
            isRoot: true,
        };

        return Data['unites'].insert(root);
    }

    function getChildData(entryid) {
        var getData;
        var orig;
        var request = {
            query: "o=Universite de Lausanne,c=ch",
            opts: {
                'scope': "sub",
                'timeLimit': 1,
                'filter': "(&(objectClass=organizationalUnit)(parentid=" + entryid +
                    ")(!(|(ou:dn:=Direction)(ou:dn:=Centre Hospitalier Universitaire Vaudois)(ou:dn:=Adresses utiles)(ou:dn:=Etudiants)(ou:dn:=Conseil de l'UNIL))))",
                'attributes': ["o", "entryid", "parentid", "dn", "nsUniqueId", 'ou']
            }
        };
        try {
            getData = Meteor.wrapAsync(getLdapDataAsync);
            orig = getData(request);
        } catch (err) {
            throw new Meteor.Error("Could not find Ldap Tree Root:\n", err.message);
        }
        var res = {
            childrenData: orig instanceof Array ? orig : (typeof orig ===
                "string" ? [
                    orig
                ] : []),
        };
        return res;
    }

    function insertUnites(newOrigData, parentId) {
        var id;
        var name = typeof (newOrigData.ou) === 'string' ? newOrigData.ou :
            newOrigData.ou[0];
        var alias = typeof (newOrigData.ou) === 'string' ? [newOrigData.ou] :
            newOrigData.ou;
        var unite = Data['unites'].findOne({
            'orig.dn': newOrigData.dn
        });
        var levelData = getChildData(newOrigData.entryid);
        if (unite) {
            id = unite._id;
        } else {
            id = Data['unites'].insert({
                name: name.toString(),
                parent: parentId,
                isParent: (levelData.childrenData.length > 0),
                orig: {
                    dn: String(newOrigData.dn),
                    entryid: parseInt(newOrigData.entryid),
                    parentid: parseInt(newOrigData.parentid)
                }
            });
        }
        var res = {
            id: id,
            childrenData: levelData.childrenData || []
        };
        return res;
    }

    function addSubUnitesFor(parentUniteId, childrenData) {
        var childData = [];
        childrenData.forEach(function (childOrig) {
            var data = insertUnites(childOrig, parentUniteId);
            childData.push(data);
        });
        return childData;
    }

    function getUnites() {
        var id = getRootUniteId();
        root = Data['unites'].findOne({
            _id: id
        });
        var levelData = getChildData(root.orig.entryid, root._id);
        var data = addSubUnitesFor(root._id, levelData.childrenData);
        var unite;
        do {
            var currentItem = data.pop();
            newData = addSubUnitesFor(currentItem.id, currentItem.childrenData);
            data = data.concat(newData);
        }
        while (data.length > 0);
    }

    Import.unites = function () {
        var count = Data['unites'].find({}).count()
        if (count === 0) {
            getUnites();
        }

    };

}
