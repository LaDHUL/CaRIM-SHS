uniteSchema = new SimpleSchema({
    value: {
        type: String,
        dataCollection: "unites",
        autoform: {
            template: 'tree',
            type: "selectize",
            uniPlaceholder: function(){ return Meteor.isServer ||  getLabel(AutoForm.getCurrentDataForForm(),"unites")},
            afFieldInput: {
                label: false,
                afFieldInput: {
                    class: "float-left",
                    closeAfterSelect: true,
                    hideSelected: true,
                    
                    placeholder: function(){ return Meteor.isServer ||  getPlaceholder(AutoForm.getCurrentDataForForm(),"unites")}
                },
            }
        }
    }
});
