import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

import {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
} from 'graphql-iso-date';

// Type
const InventoryTicketType = new GraphQLObjectType({
    name:'InventoryTicket',
    field: () => ({
        day:{type: GraphQLInt},
        total_item:{type: GraphQLInt},
        ticket_input:{type: GraphQLInt},
        ticket_output:{type: GraphQLInt},
    })
});