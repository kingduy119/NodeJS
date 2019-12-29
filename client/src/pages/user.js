import React, { Component } from 'react';

import './user.css';
import UserContext from '../context/user-context';

// Apollo
// import ApolloClient from 'apollo-boost';
// import { gql } from 'graphql-tag';
// import {
    // useQuery
    //useMutation
    // } from '@apollo/react-hooks';
// const client = new ApolloClient({
//     uri: '',
// });


// queries
// const QUERY_USER = gql`
//     query FindUser($username: String!) {
//         FindUsername(username: $username) {
//             id
//             username
//             password
//         }
//     }
// `;
// function FindUser({username}) {
//     const {loading, error, data} = useQuery({QUERY_USER}, {
//         variables: {username},
//     });
//     if(loading) return null;
//     if(error) return `Error! ${error}`;

//     return(
//         <p>Username: {data.FindUsername.username}</p>
//     );
// }


// const QUERY_USERS = gql`
//     {
//         FindUsers {
//             id
//             username
//             password
//         }
//     }
// `;

// function Users({onUserSelected}) {
//     const {loading, error, data} = useQuery(QUERY_USERS);
//     if(loading) return 'Loading...';
//     if(error) return `Error! ${error.message}`;

//     return(
//         <select name="user" onChange={onUserSelected}>
//             {data.FindUsers.map(user => (
//                 <option key={user.id} value={user.username}>
//                     {user.password}
//                 </option>
//             ))}
//         </select>
//     );
// }

// // mutation
// const ADD_USER = gql`
//     mutation AddUser(username: "MyUserName", password:"password") {
//         id
//         username
//     }
// `;

// function addUser() {
//     let input;
//     const [addUser, {data}] = useMutation(ADD_USER);
//     return (
//         <div>
//             <form
//                 onSubmit={e => {
//                     e.preventDefault();
//                     addUser({variables: {type: input.value}});
//                     input.value = '';
//                 }}
//             >
//                 {/* Input */}
//                 <input
//                     ref={node => {
//                         input = node;
//                     }}
//                 />
//             </form>
//         </div>
//     );
// }

// client
//     .query({
//         query: 
//     })
//     .then(result => console.log(result));
// end Apollo

class UserPage extends Component {
    state = {
        isLogin: false
    };

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.usernameEl= React.createRef();
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();

        this.readUsername = "";
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        });
    };

    submitHandler = event => {
        event.preventDefault();
        let username = this.usernameEl.current.value;
        let email = this.emailEl.current.value;
        let password = this.passwordEl.current.value;

        if( username.trim().length === 0
            || email.trim().length === 0
            || password.trim().length === 0
        ) { return; }

        console.log(email, password);
        let requestBody = {
            query: `
                query {
                    login(email:"${email}", password:"${password}") {
                        userID
                        token
                        tokenExpiration
                    }
                }
            `
        };

        if(!this.state.isLogin) {
            requestBody = {
                query: `
                    mutation {
                        AddUser(username: "${username}", email: "${email}", password:"${password}") {
                            id
                            username
                            email
                            password
                        }
                    }
                `};
        }

        fetch('http://localhost:1000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            } else {
                return res.json();
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    findUser = () => {
        const username = this.readUsername.current.value;
        if(user.trim().length === 0) return;

        requestBody = {
            query:`
                query {
                    FindUsername(username: "${username}") {
                        id
                        username
                        email
                    }
                }
            `
        };

        fetch('http://localhost:1000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            } else {
                return res.json();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return(
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        {/* Create */}
                        <div className="col-sm-3 bg-primary text-white">
                            <form  onSubmit={this.submitHandler} >
                                <div className="form-group">
                                    <label htmlFor="username" >Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Username" ref={this.usernameEl} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">E-Mail</label>
                                    <input type="email" className="form-control" id="email" placeholder="E-mail" ref={this.emailEl} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pwd">Password</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="Password" ref={this.passwordEl}/>
                                </div>

                                <div className="form-group form-check">
                                    <button type="submit" className="btn btn-light  mb-2 mr-sm-2">Submit</button>
                                    <button type="button" className="btn btn-light mb-2 mr-sm-2" onClick={this.switchModeHandler}>
                                        Switch to {this.state.isLogin ? 'Singup' : 'Login'}
                                    </button>                    
                                </div>
                            </form>
                        </div>

                        {/* Read */}
                        <div className="col-sm-3 bg-info text-white">
                            <form>
                                <div className="form-groups">
                                    <label htmlFor="readusername">Username</label>
                                    <input type="text" className="form-control" id="readusername" placeholder="Username" ref={this.readUsername}/>
                                </div>

                                <div className="form-group form-check">
                                    <button
                                        type="button"
                                        className="btn btn-light mb-2 mr-sm-2"
                                        onClick={}
                                    >Find</button>
                                    <button
                                        type="button"
                                        className="btn btn-light mb-2 mr-sm-2"
                                        onClick={}
                                    >List
                                    </button>
                                </div>
                            </form>

                            <div className="container">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* To do somthing to show information user or list user */}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Update */}
                        <div className="col-sm-3 bg-success text-white">
                            
                        </div>

                        {/* Delete */}
                        <div className="col-sm-3 bg-danger text-white">
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UserPage;
