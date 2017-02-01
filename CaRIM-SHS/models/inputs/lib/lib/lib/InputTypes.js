InputTypes = {
    types: new Set(),
    addInputType: function (typeName, typeSimpleSchema) {
        var InputType = function (typeName, typeSimpleSchema) {
            Inputs[typeName] = new Mongo.Collection(typeName, {
                transform: function (doc) {
                    var newInstance = Object.create(InputDisplay)
                    return _.extend(newInstance, doc);
                }
            });

            InputSchema[typeName] = new SimpleSchema([
                typeSimpleSchema, {
                    type: {
                        type: String,
                        defaultValue: typeName,
                    }
                }
            ]);
            Inputs[typeName].attachSchema(InputSchema[typeName]);
            return true;
        };
        var val = InputType(typeName, typeSimpleSchema);
        this.types.add(typeName, val);
    }
};
