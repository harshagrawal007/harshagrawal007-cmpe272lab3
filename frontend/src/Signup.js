import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
//import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
//import cookie from "react-cookies";
//import { connect } from 'react-redux';
import { addUserMutation } from "./mutations/mutations";
import { graphql, compose } from 'react-apollo';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            firstnameCheck: false,
            lastnameCheck: false,
            emailCheck: false,
            passwordCheck: false,
            authFlag: false,
            mainredirect: false
        };
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    firstnameChangeHandler = e => {
        this.setState({
            firstname: e.target.value
        });
    };
    //lastname change handler to update state variable with the text entered by the user
    lastnameChangeHandler = e => {
        this.setState({
            lastname: e.target.value
        });
    };

    emailChangeHandler = e => {
        this.setState({
            email: e.target.value
        });
    };
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = e => {
        this.setState({
            password: e.target.value
        });
    };

     handleSubmit = e => {
        e.preventDefault();


        const result =  this.props.addUserMutation({
            variables: {
                firstname: this.state.firstname,
                lastname : this.state.lastname,
                username : this.state.email,
                type:"traveller",
                password : this.state.password,
             
            }})
            console.log(result);
            result.then((res)=>{
                console.log(JSON.stringify(res.data));
                if(res.data.addUser.error !=null){
                  alert("add traveller failed")
                }
                else {
                  alert("Traveller Sign up scucessfull")
                }
                 
             }); 
       
    };



    render() {
        return (
            <div>
                <Header></Header>
                <div className="container signup-container">
                    <div className="row">
                        <div className="col order-first">
                        </div>
                        <div className="col">
                            <div className="panel-body">
                                <h2>Sign up for HomeAway</h2>
                                <h4> Already have an account?<Link to="/TravelerLogin">Log in</Link></h4>
                                <form id="register-form" action="" method="post" role="form" >
                                    <div className="form-group">
                                        <input type="text" required name="firstname" id="firstname" tabIndex="1" className="form-control" placeholder="FirstName" onChange={this.firstnameChangeHandler} />

                                    </div>
                                    <div className="form-group">
                                        <input type="text" required name="lastname" id="lastname" tabIndex="2" className="form-control" placeholder="Last Name" onChange={this.lastnameChangeHandler} />

                                    </div>
                                    <div className="form-group">
                                        <input type="email" required name="email" id="email" tabIndex="3" className="form-control" placeholder="Email Address" onChange={this.emailChangeHandler} />

                                    </div>
                                    <div className="form-group">
                                        <input type="password" required name="password" id="password" tabIndex="4" className="form-control" placeholder="Password" onChange={this.passwordChangeHandler} />

                                    </div>
                                    <div className="form-group">
                                        <input type="submit" name="signup-submit" id="signup-submit" tabIndex="5" className="form-control " onClick={this.handleSubmit} value="Sign Up" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col order-last">
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


// const mapStateToProps = state => {
//     return {
     
//         authFlag: state.authFlag
//     }
// }


// const mapDispatchStateToProps = dispatch => {
//     return {
//         onSubmitHandle: (data) => {
//             axios.post('http://localhost:3001/TravellerSignup', data)
//                 .then((response) => {
//                     dispatch({ type: 'TravellerSignup', payload: response.data, statusCode: response.status })
//                     alert("signup successfull");
//                 });
//         }
//     }
// }


//export default connect(mapStateToProps, mapDispatchStateToProps)(Signup);
//export default Signup;
export default compose(
    // graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addUserMutation, { name: "addUserMutation" })
)(Signup);