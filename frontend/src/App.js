import React, { Component } from "react";
import { Route } from "react-router-dom";
import TravelerLogin from "./TravelerLogin";
import Signup from "./Signup";
import OwnerSignup from "./OwnerSignup";
import SearchResult from "./SearchResult";
import Property from "./Property";
import myproperties from "./myproperties"
import mytrips from "./mytrips"
import Home from "./home";
import OwnerLogin from "./OwnerLogin";
import { BrowserRouter } from "react-router-dom";
//import Provider from react-redux
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import reducer from './store/reducer';


import AddPropertyDetails from "./AddPropertyDetails";
import Profile from "./profile";

import "./App.css";
import { createStore } from 'redux';
const store = createStore(reducer);
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});

class App extends Component {

  render() {

    return (
      <BrowserRouter>

        <Provider store={store}>
          <ApolloProvider client={client}>
           
            <div>
              <Route path="/home" component={Home} />
              <Route path="/Signup" component={Signup} />
              <Route path="/OwnerSignup" component={OwnerSignup} />
              <Route path="/TravellerLogin" component={TravelerLogin} />
              <Route path="/AddPropertyDetails" component={AddPropertyDetails} />
              <Route path="/SearchResult" component={SearchResult} />
              <Route path="/OwnerLogin" component={OwnerLogin} />
              <Route path="/Profile" component={Profile} />
              <Route path="/myproperties" component={myproperties} />
              <Route path="/mytrips" component={mytrips} />
              <Route path="/Property/:id" component={Property} />

            </div>
          </ApolloProvider>
        </Provider>

      </BrowserRouter>
    );
  }
}

export default App;
