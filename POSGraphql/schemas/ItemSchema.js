
const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull
} = require('graphql');

const ModelItem = require('../models/ModelItem');

// Item Type:
const ItemType = new GraphQLObjectType({
    name:'Item',
    fields: () => ({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        total:{type: GraphQLInt},
        price:{type: GraphQLInt}
    })
});

// QUERY
exports.findById = {
    type: ItemType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: async (parent, args) => {
        let item = ModelItem.findById({id: args.id});
        return await item;
    }
}

exports.findByCode = {
    type: ItemType,
    args: {
        code: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: async (parent, args) => {
        let listItem = ModelItem.find({id: args.code});
        return await listItem;
    }
}

// MUTATION
exports.addOne = {
    type: ItemType,
    args: {
        code:{type: GraphQLString},
        name:{type: GraphQLString},
        total:{type: GraphQLInt},
        price:{type: GraphQLInt}
        // ,
        // inventory_ticket_id:{type: GraphQLID}
    },
    resolve: async (parent, args) => {
        let item = new ModelItem({
            code: args.code,
            name: args.name,
            total: args.total,
            price: args.price
            // ,
            // inventory_ticket_id: args.inventory_ticket_id
        });
        return await item.save();
    }
}
