import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from "./Header";
import { graphql, compose } from 'react-apollo';
import { propertiesbyowner } from './queries/queries.js';
import { withApollo } from 'react-apollo';
import moment from "moment";
import { Redirect } from "react-router-dom";
import "./styles/productPage.scss";

class Myproperties extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            property: [],
            goToLogin: false,
           
        };

       
    }

    componentDidMount() {

        if (!localStorage.getItem("user")) {
            this.setState({ goToLogin: true });
        }
        //const id = this.props.match.params.id;
        //const searchlocation= localStorage.getItem("location");
        //console.log("pathname" + this.props.history.location.pathname);
        // var city = this.props.history.location.pathname.substring(24);
        var user = JSON.parse(localStorage.getItem("user"));

        console.log(this.props);
        this.props.client.query({
            query: propertiesbyowner,
            variables: {
                owneremail:  user.username,
            }
        }).then((res) => {
            console.log(JSON.stringify(res.data));
            this.setState({
                property: res.data.propertiesbyowner
            })

        });
    };

    render() {
        
        const { goToLogin } = this.state;
        if (goToLogin) {
            return <Redirect to="/ownerLogin" />;
        }
       
        return(
            <div className="product-page">
            <div className="headers">
                <Header />
                {/* <Search query={this.props.query} /> */}
            </div>

            <div className="list-container"> 
            { this.state.property.map((item, key) => (
              <div className="list-item" key={key}>

                <div className="top-container">

                    <h4>{item.headline}</h4>
                    <h4>{item.pdescription}</h4>
                    <h4>{item.ptype}</h4>

                    <div className="property-info">
                        <span>{`${
                            item.bedrooms === 0
                                ? "Studio"
                                : `${item.bedrooms}  BR Apartment`
                            }`}</span>
                        <span>{`${item.bathrooms} Bath`}</span>
                        <span>{`${item.minimumstay} Minimum Stay`}</span>
                        <span>{`${item.city} `}</span>
                    </div>
                </div>
                <div className="bottom-strip">
                    <p>{`$${item.baseprice} per night`}</p>

                </div>
                </div>))}
            </div>

        </div>

        )


    }

}


export default withApollo(Myproperties);
//export default withApollo(Property); 