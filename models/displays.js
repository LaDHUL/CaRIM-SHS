DataDisplay = {
    toDisplay: function () {
        var self = this;
        if (self.completeName)
            return self.completeName;
        return self.name
    }
}
InputDisplay = {
    toDisplay: function () {
        var self = this;
        var type = self.type;
        var display = [];
        Object.keys(self).forEach(function (key) {
            var ss = InputSchema[self.type].schema(key);
            var val = self[key]
            if (val && ss && ss.hasOwnProperty("autoform") && (!(ss.autoform.hasOwnProperty('omit') && ss.autoform.omit))) {
                if (key === "activites") {
                    var dico = {
                        "r": "Recherche",
                        "e": "Enseignement",
                        "s": "Support",
                    };
                    display.push({
                        key: self.type,
                        text: " (" + self.activites.map(function (val) {
                            return dico[val];
                        }).join(", ") + ")"
                    })
                } else {
                    if (ss.dataCollection) {
                        if (self[key] instanceof Array) {
                            display.push({
                                key: self.type,
                                text: "<br>" + Data[ss.dataCollection].find({
                                    _id: {
                                        $in: self[key]
                                    }
                                }).map(function (doc) {
                                    return doc.toDisplay()
                                }).join(", ")
                            })
                        } else {
                            display.push({
                                key: self.type,
                                text: Data[ss.dataCollection].findOne({
                                    _id: self[key]
                                }).toDisplay()
                            });
                        }
                    } else {
                        if (key !== "projet" && key !== "competence")
                            display.push({
                                key: self.type,
                                text: self[key]
                            });
                    }
                }
                if (self.type === "competence_logiciels") {
                    var niveaux = Inputs.competence_niveaus.findOne({
                        value: val
                    }, {
                        fields: {
                            expertise: 1,
                            frequence: 1
                        }
                    });
                    delete niveaux._id;
                    Object.keys(niveaux).forEach(function (key) {
                        display.push({
                            key: "",
                            text: '<div class="progress" style="font-size: 12px; line-height: 20px; text-align: center;">' +
                                '<div class="progress-bar progress-bar-info" style="width: ' +
                                niveaux[key] + '0%;">' +
                                (parseInt(niveaux[key]) > 3 ? key + '</div>' : '</div>' + key) +
                                '</div> '
                        });
                    });
                }

            }

        });
        return display;
    }
};
