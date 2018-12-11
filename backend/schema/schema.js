const graphql = require('graphql');
const _ = require('lodash');
var mongoose = require('express');
const { Users } = require('../models/users.js')
const { Properties } = require('../models/properties.js')
const { Bookings } = require('../models/bookings.js')
var bcrypt = require("bcryptjs");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        type: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        about: { type: GraphQLString },
        gender: { type: GraphQLString },
        phone: { type: GraphQLString },
        company: { type: GraphQLString },
        languages: { type: GraphQLString },
        error: { type: GraphQLString }

        //genre: { type: GraphQLString },
        // author: {
        //     type: AuthorType,
        //     resolve(parent, args){
        //         return _.find(authors, { id: parent.authorId });
        //     }
        // }
    })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        pid:{  type: GraphQLString },
        owneremail: { type: GraphQLString },
        country: { type: GraphQLString },
        address: { type: GraphQLString },
        unit: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        postal: { type: GraphQLString },
        headline: { type: GraphQLString },
        pdescription: { type: GraphQLString },
        postal: { type: GraphQLString },
        headline: { type: GraphQLString },
        ptype: { type: GraphQLString },
        bedrooms: { type: GraphQLString },
        accomodates: { type: GraphQLString },
        bathrooms: { type: GraphQLString },
        minimumstay: { type: GraphQLString },
        baseprice: { type: GraphQLString },
        pernight: { type: GraphQLString },
        photos: { type: GraphQLString },
        error: { type: GraphQLString }
        //genre: { type: GraphQLString },
        // owner: {
        //     type: UserType,
        //     resolve(parent, args){
        //         return _.find(Users, { username: parent.owneremail });
        //     }
        // }
    })
});

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        pid: { type: GraphQLString },
        tid: { type: GraphQLString },
        oid: { type: GraphQLString },
        arrival: { type: GraphQLString },
        depart: { type: GraphQLString },
        guests: { type: GraphQLString },
        headline: { type: GraphQLString },
        error:{type: GraphQLString}
        // owner: {
        //     type: UserType,
        //     resolve(parent, args){
        //         return _.find(Users, { username: parent.oid });
        //     }
        // },
        // traveller: {
        //     type: UserType,
        //     resolve(parent, args){
        //         return _.find(Users, { username: parent.tid });
        //     }
        // }
    })
});




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                type: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const user = await Users.findOne({
                    username: args.username,
                    type: args.type
                })
                if (user) {
                    console.log("user found");
                    console.log(JSON.stringify(user));
                    var hashpass = await bcrypt.compare(args.password, user.password)
                    if (hashpass) {
                        //  var token = await jwt.sign({ user: user }, config.secret, { expiresIn: '10080s' })
                        return user;
                    }
                    //return { jwttoken: token };
                }
                else {
                    console.log("inside error");
                    return { error: "User does not exists" }
                }
            }
        },
        userbyid: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const user = await Users.findOne({
                    username: args.username,
                })
                if (user) {
                    console.log("user found");
                    console.log(JSON.stringify(user));
                   // var hashpass = await bcrypt.compare(args.password, user.password)
                    //if (hashpass) {
                        //  var token = await jwt.sign({ user: user }, config.secret, { expiresIn: '10080s' })
                        return user;
                    //}
                    //return { jwttoken: token };
                }
                else {
                    console.log("inside error");
                    return { error: "User does not exists" }
                }
            }
        },
        properties: {
            type: new GraphQLList(PropertyType),
            args: {
                city: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const properties = await Properties.find({
                    city: args.city,
                })
                if (properties) {
                    console.log("property found");
                    return properties;
                }
                else {
                    console.log("inside error");
                    return { error: "no propperty found" }
                }
            }
        },
        propertybyid: {
            type: PropertyType,
            args: {
                pid: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const property = await Properties.findOne({
                    pid: args.pid,
                })
                if (property) {
                    console.log("property found");
                    console.log(property);
                    return property;
                }
                else {
                    console.log("inside error");
                    return { error: "no propperty found" }
                }
            }
        },
        propertiesbyowner: {
            type: new GraphQLList(PropertyType),
            args: {
                owneremail: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const properties = await Properties.find({
                    owneremail: args.owneremail,
                })
                if (properties) {
                    console.log("property found");
                    return properties;
                }
                else {
                    console.log("inside error");
                    return { error: "no propperty found" }
                }
            }

        },
        bookingsbytraveller: {
            type: new GraphQLList(BookingType),
            args: {
                tid: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const bookings = await Bookings.find({
                    tid: args.tid,
                })
                if (bookings) {
                    console.log("bookings  found");
                    return bookings;
                }
                else {
                    console.log("inside error");
                    return { error: "no booking found" }
                }
            }

        }
    }
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                type: { type: GraphQLString },

            },
            async resolve(parent, args) {
                var password = args.password;
                var salt = bcrypt.genSaltSync(10);
                var hashedpassword = bcrypt.hashSync(password, salt);
                console.log('args ' + JSON.stringify(args))
                var users = new Users({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    username: args.username,
                    password: hashedpassword,
                    location: "",
                    about:"",
                    gender: "",
                    phone: "",
                    company: "",
                    languages:"",
                    type: args.type
                })
                console.log(JSON.stringify(users))
                var userdata = await users.save()
                console.log("users", userdata);
                if (userdata) {
                    console.log(JSON.stringify(userdata));
                    return userdata;
                }
                else {
                    console.log("my " + userdata)
                    return { error: "User  exists" }
                }
            }

        },
        addBooking: {
            type: BookingType,
            args: {
                pid: { type: GraphQLString },
                tid: { type: GraphQLString },
                oid: { type: GraphQLString },
                arrival: { type: GraphQLString },
                depart: { type: GraphQLString },
                guests: { type: GraphQLString },
                headline: { type: GraphQLString },

            },
            async resolve(parent, args) {
              
                var bookings = new Bookings({
                    pid: args.pid,
                    tid: args.tid,
                    oid: args.oid,
                    arrival: args.arrival,
                    depart: args.depart,
                    guests: args.guests,
                    headline: args.headline,
                })
                console.log(JSON.stringify(bookings))
                var newbooking = await bookings.save()
                console.log("users", newbooking);
                if (newbooking) {
                    console.log(JSON.stringify(newbooking));
                    return newbooking;
                }
                else {
                    console.log("my " + newbooking)
                    return { error: "User  exists" }
                }
            }

        },
        updateUser: {
            type: UserType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                username: { type: GraphQLString },
                location: { type: GraphQLString },
                about: { type: GraphQLString },
                gender: { type: GraphQLString },
                phone: { type: GraphQLString },
                company: { type: GraphQLString },
                languages: { type: GraphQLString },
            },
            async resolve(parent, args) {
                
                console.log('args ' + JSON.stringify(args))
               
                try {
                    var userdata = await Users.updateOne({ username: args.username },
                        // { $set: req.body.profile }
                        {
                            $set:
                            {
                                firstname: args.firstname,
                                lastname: args.lastname,
                                location: args.location,
                                about: args.about,
                                gender: args.gender,
                                phone: args.phone,
                                company: args.company,
                                languages: args.languages,
                            }
                        }
                    )
                    console.log("inside try block");
                    console.log(userdata);
                    return userdata

                }
                catch (err) {
                    next(err);
                    // res.sendStatus(400).end();
                    // console.log("my " + userdata)
                    console.log("inside error")
                    return { error: "Cannot update profile" }
                }
           
            }

        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});