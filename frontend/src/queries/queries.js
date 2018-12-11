import { gql } from 'apollo-boost';
const user = gql`
query($username: String!, $password: String!,$type:String!){
        user(username: $username, password: $password,type:$type){
                error
                username
                firstname
                lastname
                type
        }
    }`
const userbyid = gql`
query($username: String!){
        userbyid(username: $username){
                error
                username
                firstname
                lastname
                about
                location
                type
                gender
                languages
                company
                phone
        }
    }`
const properties = gql`query($city: String!){
        properties(city: $city){
                pid
                error
                owneremail
                country
                address
                unit
                city
                state
                postal
                headline
                pdescription
                postal
                headline
                ptype
                bedrooms 
                accomodates
                bathrooms 
                minimumstay 
                baseprice
                pernight
             
        }
    }
`
const bookingsbytraveller = gql`query($tid: String!){
        bookingsbytraveller(tid: $tid){
                pid
                tid
                oid
                headline
                arrival
                depart
                guests
             
        }
    }
`
const propertiesbyowner = gql`query($owneremail: String!){
        propertiesbyowner(owneremail: $owneremail){
                pid
                error
                owneremail
                country
                address
                unit
                city
                state
                postal
                headline
                pdescription
                postal
                headline
                ptype
                bedrooms 
                accomodates
                bathrooms 
                minimumstay 
                baseprice
                pernight
             
        }
    }
`
const propertybyid = gql`query($pid: String!){
        propertybyid(pid: $pid){
                pid
                error
                owneremail
                country
                address
                unit
                city
                state
                postal
                headline
                pdescription
                postal
                headline
                ptype
                bedrooms 
                accomodates
                bathrooms 
                minimumstay 
                baseprice
                pernight
             
        }
    }
`





export { user, userbyid,properties ,propertybyid,propertiesbyowner,bookingsbytraveller};