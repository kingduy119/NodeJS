import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql';

import {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
} from 'graphql-iso-date';

// Item Type:
const ItemType = new GraphQLObjectType({
    name:'Item',
    field: () => ({
        name:{type: GraphQLString},
        total:{type: GraphQLInt},
        price:{type: GraphQLInt},
        product_code:{type: GraphQLInt}
    })
});

// User Type:
const UserType = new GraphQLObjectType({
    name:'User',
    field: () => ({
        username:{type: GraphQLString},
        password:{type: GraphQLString},
        phone:{type: GraphQLString},
        location:{type: GraphQLString},
        date_start:{type: GraphQLDate},
        date_end:{type: GraphQLDate},
        active:{type: GraphQLBoolean}
    })
});


// Inventory Ticket Type:
const InventoryTicketType = new GraphQLObjectType({
    name:'InventoryTicket',
    field: () => ({
        day:{type: GraphQLInt},
        total_item:{type: GraphQLInt},
        ticket_input:{type: GraphQLInt},
        ticket_output:{type: GraphQLInt},
    })
});