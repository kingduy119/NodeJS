
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql';

import {
    GraphQLDate
} from 'graphql-iso-date';


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


