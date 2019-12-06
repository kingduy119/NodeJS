
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
        price:{type: GraphQLInt},
        inventory_ticket_id:{type: GraphQLID}
    })
});

// QUERY
exports.findItem = {
    type: ItemType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: async (parent, args) => {
        let item = ModelItem.findById({id: args.id});
        return await item;
        // return {
        //     id: item.id,
        //     name: item.name,
        //     total: item.total,
        //     price: item.total,
        //     inventory_ticket_id: item.inventory_ticket_id
        // };
    }
}

// MUTATION
exports.addItem = {
    type: ItemType,
    args: {
        name:{type: GraphQLString},
        total:{type: GraphQLInt},
        price:{type: GraphQLInt}
        // ,
        // inventory_ticket_id:{type: GraphQLID}
    },
    resolve: async (parent, args) => {
        let item = new ModelItem({
            name: args.name,
            total: args.total,
            price: args.price
            // ,
            // inventory_ticket_id: args.inventory_ticket_id
        });
        return await item.save();
    }
}
