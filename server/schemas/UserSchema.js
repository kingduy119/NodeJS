
// const {
//     GraphQLID,
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLBoolean,
//     GraphQLList,
//     GraphQLNonNull
// } = require('graphql');

// const {
//     GraphQLDate
// } = require('graphql-iso-date');

// const UserController = require('../controllers/user/user.controller');

// // User Type:
// const UserType = new GraphQLObjectType({
//     name:'User',
//     fields: () => ({
//         id: {type: GraphQLID},
//         username:{type: GraphQLString},
//         email:{type: GraphQLString},
//         password:{type: GraphQLString}
//     })
// });

// exports.UserQuery = {
//     Users: {
//         type: new GraphQLList(UserType),
//         resolve: async (parent, args) => {
//             return await UserController._findAll();
//         }
//     },
//     User: {
//         type: UserType,
//         args: {
//             username: {type: new GraphQLNonNull(GraphQLString)}
//         },
//         resolve: async (parent, args) => {
//             return await UserController._findOne({username: args.username});
//         }
//     }
// }

// exports.UserMutation = {
//     Create: {
//         type: UserType,
//         args: {
//             username:{type: new GraphQLNonNull(GraphQLString)},
//             email:{type: new GraphQLNonNull(GraphQLString)},
//             password:{type: new GraphQLNonNull(GraphQLString)}
//         },
//         resolve: async (parent, args) => {
//             return await UserController._create(args);
//         }
//     }
// }

// // exports.updateOne = {
// //     type: UserType,
// //     args: {
// //         id: {type: new GraphQLNonNull(GraphQLID)},
// //         username: {type: new GraphQLNonNull(GraphQLString)},
// //         email: {type: new GraphQLNonNull(GraphQLString)},
// //         password: {type: new GraphQLNonNull(GraphQLString)}
// //     },
// //     resolve: async (parent, args) => {
// //         let user = await ModelUser.updateOne({_id: args.id},{
// //             username: args.username,
// //             email: args.email,
// //             password: args.password
// //         });
// //         return ModelUser.findById({_id: args.id});
// //     }
// // }

// // exports.deleteOnce = {
// //     type: UserType,
// //     args: {
// //         username: {type: new GraphQLNonNull(GraphQLString)}
// //     },
// //     resolve: async (parent, args) => {
// //         return await ModelUser.deleteOne({username: args.username});
// //     }
// // }