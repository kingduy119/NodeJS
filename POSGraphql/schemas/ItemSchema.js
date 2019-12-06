
import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql';

// Item Type:
const ItemType = new GraphQLObjectType({
    name:'Item',
    field: () => ({
        name:{type: GraphQLString},
        total:{type: GraphQLInt},
        price:{type: GraphQLInt},
        product_id:{type: GraphQLInt}
    })
});

exports.addItem = {
    type:ItemType,
    args: {
        name:{type: GraphQLString},
        total:{type: GraphQLInt},
        price:{type: GraphQLInt},
        product_id:{type: GraphQLInt}
    },
    resolve: async (parent, args) => {

    }
}
