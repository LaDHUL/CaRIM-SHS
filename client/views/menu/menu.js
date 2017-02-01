Template.menu.helpers({
    'feature': function() {
        var active = FlowRouter.getRouteName();
        var color = "orange";
        return [
            {
                'text': 'Accueil',
                'icon': 'home',
                'path': FlowRouter.path('accueil'),
                'active': function() {
                    return (active === 'accueil' || active === 'home')
                },
                "visible": true
            }, {
                'text': 'Le projet',
                'icon': 'info-sign',
                'active': function() {
                    return (active === 'le-projet');
                },
                'path': FlowRouter.path('le-projet'),
                "visible": true
            }, {
                'text': 'Le formulaire',
                'icon': 'tasks',
                'path': FlowRouter.path('formulaire'),
                'active': function() {
                    return (active === 'formulaire');
                },
                "visible": false
            }, {
                'text': 'En savoir plus',
                'icon': 'education',
                'path': FlowRouter.path('en-savoir-plus'),
                'active': function() {
                    return (active === 'en-savoir-plus');
                },
                "visible": true
            }
        ];
    }
});
