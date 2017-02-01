DataTypes = {
    types: new Set(),
    addDataType: function (typeName, typeSimpleSchema) {
        var DataType = function (typeName, typeSimpleSchema) {
            var self = {};

            Data[typeName] = new Mongo.Collection('data_' + typeName, {
                transform: function (doc) {
                    var newInstance = Object.create(DataDisplay)
                    return _.extend(newInstance, doc);
                }
            });

            self.schema = new SimpleSchema([
                typeSimpleSchema,
                DefaultSchema.base, {
                    type: {
                        type: String,
                        defaultValue: typeName,
                    }
                }
            ]);

            self.attached = Data[typeName].attachSchema(self.schema);

            return self
        };
        var val = DataType(typeName, typeSimpleSchema);
        this.types.add(
            typeName, val);
    }
};
