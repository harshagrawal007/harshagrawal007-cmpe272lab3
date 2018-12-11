import React, { Component } from "react";
import "./App.css";
import "./home.css";
//import { connect } from 'react-redux';
//import axios from "axios";
import {Link} from 'react-router-dom';

import Header from "./Header";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

            city:"",
            arrival:"",
            departure:"",
            guests:""

        };
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.arrivalChangeHandler = this.arrivalChangeHandler.bind(this);
        this.departureChangeHandler = this.departureChangeHandler.bind(this);
        this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    }

    cityChangeHandler = e => {
        this.setState({
            city: e.target.value
        });
      };
      //password change handler to update state variable with the text entered by the user
      arrivalChangeHandler = e => {
        this.setState({
            arrival: e.target.value
        });
      };
      
      departureChangeHandler = e => {
        this.setState({
            departure: e.target.value
        });
      };
      //password change handler to update state variable with the text entered by the user
      guestsChangeHandler = e => {
        this.setState({
            guests: e.target.value
        });
      };


    render() {
        return (
            < body alt="background" background="//csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.30/images/homepage/jumbotron/ptaHpNextHeroImage/large.jpg" >
                <div className="bg-img">

                    <div>
                        <Header></Header>
                    </div>

                    <div className="row myseacrhrow">

                        <div className="col">
                        </div>
                        <div className="col-10">
                            <form className="SearchForm checkin-focus">
                                <div className="row">
                                    <div className="col-3">
                                        <input type="text" name="city" size="10" placeholder="Where do you want to go?" className="control form-control" value={this.state.city}  onChange={this.cityChangeHandler}></input>
                                    </div>
                                    <div className="col-3">
                                        <input type="date" name="arrival" className="form-control " value={this.state.arrival}  onChange={this.arrivalChangeHandler} ></input>
                                    </div>
                                    <div className="col-3">
                                        <input type="date" name="departure" className="form-control " value={this.state.departure}  onChange={this.departureChangeHandler} ></input>
                                    </div>
                                    <div className="col-2">
                                        <input type="number" name="Guests" placeholder="Guests" className="form-control" value={this.state.guests}  onChange={this.guestsChangeHandler} ></input>
                                    </div>
                                   
                                </div>
                            </form>
                            <div className="col-1">
                            <Link to={`/SearchResult/${this.state.city}`}>  <button type="input" className="SearchForm__button search__button btn btn-primary" >Search </button></Link>
                                    </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </ body>

        );

    }
}

// const mapStateToProps = state =>{
//     return {
//         authFlag : state.authFlag
//     }
//   }
  
//   const mapDispatchStateToProps = dispatch => {
//     return {
//         onSubmitHandle : (data) => {
//             axios.post('http://localhost:3001/Search', data)
//                 .then((response) => {
//                     dispatch({type: 'Home',payload : response.data,statusCode : response.status})
//             });
//         }
//     }
//   }
//export default connect(mapStateToProps,mapDispatchStateToProps)(Home); 

export default Home;
