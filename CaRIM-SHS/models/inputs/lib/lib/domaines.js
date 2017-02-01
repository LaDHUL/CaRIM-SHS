domaineMotsClesSchema = new SimpleSchema({
  'motscles': {
    type: Array,
    dataCollection: "domaine_motscles",
    defaultValue: [],
    optional: true,
    autoform: {
      type: "universe-select",
      label: function() {
        return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "domaines_motscles")
      },
      afFieldInput: {
        multiple: true,
        create: true,
        removeButton: false,
        createSlug: true,
        uniPlaceholder: function() {
          return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "domaines_motscles")
        },
        options: function() {
          return Data.domaine_motscles.find({}).map(function(doc) {
            return {
              label: doc.name,
              value: doc._id,
            };
          });
        },
        closeAfterSelect: true,
        hideSelected: true
      }
    }
  },
  'motscles.$': {
    type: String,
    autoform: {
      label: false
    }
  }
});
domaineSchema = new SimpleSchema([{
    domaine: {
      type: String,
      optional: true,
      dataCollection: "domaines",
      autoform: {
        type: "selectize",
        label: function() {
          return Meteor.isServer || getLabel(AutoForm.getCurrentDataForForm(), "domaines")
        },
        options: function() {
          return Data.domaines.find({}, {
            sort: {
              sort: 1
            }
          }).map(function(doc) {
            doc.label = doc.name + " " + doc.classe + " " + doc.groupe;
            doc.value = doc._id
            return doc
          });
        },
        afFieldInput: {
          closeAfterSelect: true,
          placeholder: function() {
            return Meteor.isServer || getPlaceholder(AutoForm.getCurrentDataForForm(), "domaines")
          }
        },
        selectizeOptions: {
          placeholder: 'Commencez la saisie pour chercher et sélectionner.',
          render: {
            option: function(item, escape) {
              id = item.value;
              data = Data.domaines.findOne({
                _id: id
              })
              return '<div>' + (data.classe != data.name ? '<b><small>' + escape(data.name) + '</small></b>' : '<b>' + escape(data.name) + '</b>') + (data.groupe ? (data.classe && data.classe != data.name ? '<small> ( ' + escape(data.classe) + ', ' + escape(data.groupe) + " )</small>" : '<small> ( ' + escape(data.groupe) + " )</small>") : (data.classe && data.classe != data.name ? '<small> ( ' + escape(data.classe) + " )</small>" : "")) + '</div>';
            }
          },
          sortField: ['sort']
        },
      }
    }
  },
  domaineMotsClesSchema
]);
