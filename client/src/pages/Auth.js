import React, { Component } from 'react';

class AuthPage extends Component {
    render() {
        return(
            <form>
                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" id="email" />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>

                <div className="form-actions">
                    <button type="button">Switch to Sigup</button>
                    <button type="submit">submit</button>
                </div>
            </form>
        );
    }
}