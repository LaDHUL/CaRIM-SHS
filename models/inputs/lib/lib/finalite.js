"use strict;";
finaliteSchema = new SimpleSchema({
  value: {
    type: String,
    dataCollection: "finalites",
    autoform: {
      template: 'tree',
      type: "selectize",
      label: function() {
        return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "finalites")
      },
      afFieldInput: {
        closeAfterSelect: true,
        hideSelected: true,
        class: "float-left",
        options: function() {
          return Data.finalites.find({
            isRoot: {
              $ne: true
            }
          }, {
            sort: {
              sort: 1,
            },
          }).map(function(doc) {
            doc.label = doc.completeName + " " + doc.description + " " + doc.alias.join(" ");
            doc.value = doc._id
            return doc
          });
        },
        selectizeOptions: {
          placeholder: 'Commencez la saisie pour chercher et sélectionner.',
          render: {
            option: function(item, escape) {
              id = item.value;
              data = Data.finalites.findOne({
                _id: id
              })
              return '<div>' + '<div class="title"><b>' + escape(data.name) + '</b>' + (data.alias.length > 0 ? '<small> ( ' + escape(data.alias.join(" ")) + ' )</small>' : "") + '</div>' + (data.description != "-" ? '<div class="description"><small>' + escape(data.description) + '</small></div>' : "") + '<div class="parents"><small><b>' + escape(data.parentNames) + '</b></small></div>' + '</div>';
            }
          },
          sortField: [
            []
          ]
        },
      },
    }
  }
});
