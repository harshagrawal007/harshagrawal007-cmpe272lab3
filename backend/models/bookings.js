const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    pid : {
        type : String,
        required : true
    },
    tid : {
        type : String,
        required : true
    },
    oid:{
        type:String,
        required:true
    },
    arrival : {
        type : String,
        required : true
    },
    depart : {
        type : String,
        required : true
    },
    guests : {
        type : String,
        required : true
    },
    headline : {
        type : String,       
        required : true
    }
})
 var Bookings = mongoose.model('bookings' , BookingSchema )
 module.exports = {Bookings};