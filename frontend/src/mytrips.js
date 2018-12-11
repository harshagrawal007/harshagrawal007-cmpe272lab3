import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from "./Header";
import { graphql, compose } from 'react-apollo';
import { bookingsbytraveller } from './queries/queries.js';
import { withApollo } from 'react-apollo';
import moment from "moment";
import { Redirect } from "react-router-dom";
import "./styles/productPage.scss";

class Mytrips extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            bookings: [],
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
            query: bookingsbytraveller,
            variables: {
                tid:  user.username,
            }
        }).then((res) => {
            console.log(JSON.stringify(res.data));
            this.setState({
                bookings: res.data.bookingsbytraveller
            })

        });
    };

    render() {
        
        const { goToLogin } = this.state;
        if (goToLogin) {
            return <Redirect to="/travellerLogin" />;
        }
       
        return(
            <div className="product-page">
            <div className="headers">
                <Header />
                {/* <Search query={this.props.query} /> */}
            </div>

            <div className="list-container"> 
            <h4>{`We found ${this.state.bookings.length} booking${ this.state.bookings.length === 1 ? "" : "s"} for you.`}</h4>
           
            { this.state.bookings.map((item, key) => (
              <div className="list-item" key={key}>

                <div className="top-container">

                    <h4>{item.headline}</h4>

                    
                    <span>
                        Your have booked for  {item.guests} guests
                      
                      </span>
<br></br>
                    <span>
                        Your reservation is from{" "}
                        <em>{moment(item.arrival).format("LL")}</em> to{" "}
                        <em>{moment(item.depart).format("LL")}.</em>
                      </span>
                    {/* <h4>{item.pdescription}</h4>
                    <h4>{item.ptype}</h4> */}

                    {/* <div className="property-info">
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
                    <p>{`$${item.baseprice} per night`}</p> */}

                </div>
                </div>))}
            </div>

        </div>

        )


    }

}


export default withApollo(Mytrips);
//export default withApollo(Property); 