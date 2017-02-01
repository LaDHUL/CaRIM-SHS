Template.competences_ordre_form.onRendered(function(){
    var order =  Inputs.competences_ordre.findOne({owner: Meteor.userId()}).ordre

    $("#competencesselect1orderbuttons button[name=" + order[0] +"]").addClass("active").removeClass("btn-info").addClass("btn-primary");
    $("#competencesselect2orderbuttons button[name=" + order[1] + "]").addClass("active").removeClass("btn-info").addClass("btn-primary");
    $("#competencesselect2orderbuttons button[name=" + order[2] + "]").addClass("hidden");

});


Template.competences_ordre_form.events({
    "click [data-action='competences/select1']": function (event, template) {
        var target = event.target;
        var order = [target.name];
        var name = target.name;
        var buttons = target.parentNode.children;

        $("#competencesselect1orderbuttons button.active").removeClass('active').removeClass("btn-primary").addClass("btn-info");

        target.classList.add("active")
        target.classList.remove("btn-info")
        target.classList.add("btn-primary");


        var btn2h = $("#competencesselect2orderbuttons button.hidden").attr('name')
        var btn2a = $("#competencesselect2orderbuttons button.active").attr('name')
        if (name !== btn2h){
            if(name === btn2a){
                $("#competencesselect2orderbuttons button.hidden").removeClass("hidden").addClass("active").addClass("btn-primary").removeClass("btn-info")
                $("#competencesselect2orderbuttons button[name=" + name + "]").addClass("hidden").removeClass('active').removeClass("btn-primary").addClass("btn-info")
            } else {
                $("#competencesselect2orderbuttons button.hidden").removeClass("hidden")
                $("#competencesselect2orderbuttons button[name=" + name + "]").addClass("hidden")
            }
        }
        order.push($("#competencesselect2orderbuttons button.active").attr('name'))
        var  last = $(['logiciels', 'finalites', 'objets']).not(order).get()[0];
        order.push(last);
        var id = Inputs.competences_ordre.findOne({
            owner: Meteor.userId()
        }, {
            fields: {
                _id: 1
            }
        })._id
        Inputs.competences_ordre.update({
            _id: id
        }, {
            $set: {
                ordre: order
            }
        });
    },
    "click [data-action='competences/select2']": function (event, template) {
        var target = event.target;

        var order = [$("#competencesselect1orderbuttons button.active").attr('name')];
        $("#competencesselect2orderbuttons button.active").removeClass('active').removeClass("btn-primary").addClass("btn-info");
        order.push(target.getAttribute('name'));
        target.classList.add("active")
        target.classList.remove("btn-info")
        target.classList.add("btn-primary");


        var  last = $(['logiciels', 'finalites', 'objets']).not(order).get()[0];
        order.push(last);

        var id = Inputs.competences_ordre.findOne({
            owner: Meteor.userId()
        }, {
            fields: {
                _id: 1
            }
        })._id
        Inputs.competences_ordre.update({
            _id: id
        }, {
            $set: {
                ordre: order
            }
        });
    },
});
