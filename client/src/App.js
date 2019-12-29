import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import UserPage from './pages/user';
import EventPage from './pages/event';
import BookingPage from './pages/booking';
import MainNavigation from './components/MainNavigation/MainNavigation';
import UserContext from './context/user-context';

class App extends Component {
  state = {
    userID: null,
    token: null
  };

  login = (userID, token, tokenExpiration) => {
    this.setState({userID: userID, token: token})
  };

  logout = () => {
    this.setState({userID: null, token: null});
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <UserContext.Provider
            value={{
              userID: this.state.userID,
              token: this.state.token,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
                <main className="main-content">
                  <Switch>
                    {!this.state.token && <Redirect from="/" to="/user" exact />}
                    {this.state.token && <Redirect from="/" to="/event" exact />}
                    {this.state.token && <Redirect from="/user" to="/event" exact />}

                    {!this.state.token &&
                      <Route path="/user" component={UserPage} />
                    }
                    <Route path="/event" component={EventPage} />
                    {this.state.token &&  
                      <Route path="/booking" component={BookingPage} />  
                    }
                    
                  </Switch>
                </main>
          </UserContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
