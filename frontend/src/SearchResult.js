import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./styles/SearchResult.scss";
import {withApollo} from 'react-apollo';
import {properties} from './queries/queries.js';

class SearchResult extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
        propertieslist:[]
        };
    
    
      };
  componentDidMount() {
    //const searchlocation= localStorage.getItem("location");
    console.log("pathname"+ this.props.history.location.pathname );
    var city = this.props.history.location.pathname.substring(24);

    console.log(this.props);
     this.props.client.query({
      query : properties,
      variables: {
        city:"San jose",
      }
  }).then((res)=>{
     console.log(JSON.stringify(res.data));
     this.setState({
         propertieslist:res.data.properties
     })
   
  }); 
  };

  
  render() {
   
    return (
      <div className="listing">
        <div className="top-container">
          <Header />
          {/* <Search query={this.props.query} /> */}
        </div>
         
          <div className="list-container">
            <h4>{`We found ${this.state.propertieslist.length} result${ this.state.propertieslist.length === 1 ? "" : "s"} for you.`}</h4>
            { this.state.propertieslist.map((item, key) => (
              <div className="list-item" key={key}>
                {/* <div className="right-container"> */}
                  <div className="top-container">
                    <Link to={`/Property/${item.pid}`}>
                      <h4>{item.headline}</h4>
                      <h4>{item.pdescription}</h4>
                    </Link>
                    <div className="property-info">
                      <span>{`${
                        item.bedrooms === 0
                          ? "Studio"
                          : `${item.bedrooms} BR Apartment`
                      }`}</span>
                      <span>{`${item.bathrooms} Bath`}</span>
                      {/* <span>{`${item.area} sq ft`}</span> */}
                      {/* <span>{`Sleeps ${item.sleeps}`}</span> */}
                    </div>
                  </div>
                  <div className="bottom-strip">
                    <p>{`$${item.baseprice} per night`}</p>
                    {/* <RatingDisplay rating={item.rating} /> */}
                    {/* {item.rating} */}
                  </div>
                </div>
            //   </div>
            ))}
          </div>
        
      </div>
    );
  }
}


export default withApollo(SearchResult);