Template.display.helpers({
    isArray: function () {
        return this instanceof Array;
    }
});

Template.show.helpers({
    remove: function () {
        return {
            collection: "Inputs." + this.type,
            _id: this._id,
            class: "btn btn-warning btn-block",
        }
    },
    getName: function () {
        return this.type;
    },
    items: function () {
        return this.toDisplay();
    },
});

Template.displayComp.helpers({
    isArray: function () {
        return this instanceof Array;
    }
});

Template.showComp.helpers({
    remove: function () {
        return {
            collection: "Inputs." + this.type,
            _id: this._id,
            class: "btn btn-warning btn-block",
        }
    },
    getName: function () {
        return this.type;
    },
    items: function () {
        return this.toDisplay();
    },
});
