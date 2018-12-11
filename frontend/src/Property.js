import React, { Component } from "react";

import axios from "axios";
//import PropertyDetails from "./PropertyDetails";
import { connect } from "react-redux";
import Header from "./Header";

import { graphql, compose } from 'react-apollo';
import { propertybyid } from './queries/queries.js';
import { withApollo } from 'react-apollo';
import { addBookingMutation } from "./mutations/mutations";

import moment from "moment";
import { Redirect } from "react-router-dom";
import "./styles/productPage.scss";



class Property extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: "",
            tid: "",
            oid:"",
            arrival: "",
            depart: "",
            guests: "",
            headline: "",
            property: {},
            goToLogin: false,
            isBookingSuccessful: false
        };

        this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    }

    guestsChangeHandler = e => {
        this.setState({
            guests: e.target.value
        });
    };

    arrivalChangeHandler = e => {
        this.setState({
            arrival: e.target.value
        });
    };

    departureChangeHandler = e => {
        this.setState({
            depart: e.target.value
        });
    };



    componentDidMount() {
        const id = this.props.match.params.id;
        //const searchlocation= localStorage.getItem("location");
        console.log("pathname" + this.props.history.location.pathname);
        // var city = this.props.history.location.pathname.substring(24);

        console.log(this.props);
        this.props.client.query({
            query: propertybyid,
            variables: {
                pid: id,
            }
        }).then((res) => {
            console.log(JSON.stringify(res.data));
            this.setState({
                property: res.data.propertybyid
            })

        });
    };


    onBook = () => {
        if (!localStorage.getItem("user")) {
            //var user = JSON.parse(localStorage.getItem("user")) ;
            // if (!this.props.userInfo) {
            this.setState({ goToLogin: true });
        } else {
            var user = JSON.parse(localStorage.getItem("user"));
            const result = this.props.addBookingMutation({
                variables: {
                    pid: this.state.property.pid,
                    oid: this.state.property.owneremail,
                    tid: user.username,
                    headline: this.state.property.headline,
                    guests: this.state.guests,
                    arrival: this.state.arrival,
                    depart: this.state.depart

                }
            })
            console.log(result);
            result.then((res) => {
                console.log(JSON.stringify(res.data));
                if (res.data.addBooking.error) {
                    alert("booking failed ")
                }
                else {
                    this.setState({
                        isBookingSuccessful: true
                    })
                }
            });           
        }
    };

    render() {
        const { goToLogin, isBookingSuccessful } = this.state;
        //const { userInfo, details } = this.props;
        if (goToLogin) {
            return <Redirect to="/TravellerLogin" />;
        }
        if (isBookingSuccessful) {
            return <Redirect to="/mytrips" />;
        }
        // console.log(details);
        return (
            <div className="product-page">
                <div className="headers">
                    <Header />
                    {/* <Search query={this.props.query} /> */}
                </div>

                <div >

                    <div className="top-container">

                        <h4>{this.state.property.headline}</h4>
                        <h4>{this.state.property.pdescription}</h4>
                        <h4>{this.state.property.ptype}</h4>

                        <div className="property-info">
                            <span>{`${
                                this.state.property.bedrooms === 0
                                    ? "Studio"
                                    : `${this.state.property.bedrooms}  BR Apartment`
                                }`}</span>
                            <span>{`${this.state.property.bathrooms} Bath`}</span>
                            <span>{`${this.state.property.minimumstay} Minimum Stay`}</span>
                            <span>{`${this.state.property.city} Minimum Stay`}</span>
                        </div>
                    </div>
                    <div className="bottom-strip">
                        <p>{`$${this.state.property.baseprice} per night`}</p>

                    </div>
                    <div className="col-10">
                        <form className="checkin-focus">
                            <div className="row">

                                <div className="col-3">
                                    <input type="date" name="arrival" className="form-control " value={this.state.arrival} onChange={this.arrivalChangeHandler} ></input>
                                </div>
                                <div className="col-3">
                                    <input type="date" name="departure" className="form-control " value={this.state.depart} onChange={this.departureChangeHandler} ></input>
                                </div>
                                <div className="col-2">
                                    <input type="number" name="Guests" placeholder="Guests" className="form-control" value={this.state.guests} onChange={this.guestsChangeHandler} ></input>
                                </div>

                            </div>
                        </form>
                        <div className="col-1">
                            <button onClick={() => this.onBook()} type="button" className="request-book main-btn">Book Now</button>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default compose(withApollo,
    // graphql(userbyid, { name: "userbyid" }),
    graphql(addBookingMutation, { name: "addBookingMutation" }))(Property);
//export default withApollo(Property); 
