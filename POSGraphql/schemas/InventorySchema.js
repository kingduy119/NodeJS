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
        
    })
});