const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
var config = require('./config/main');
const app = express();
var jwt = require('jsonwebtoken');
//var mongoose = require('express');

var mongoose = require('mongoose');

//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({}));

app.use(function (req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

mongoose.connect(config.database);

mongoose.Promise = global.Promise;
console.log(mongoose.connection.readyState);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function callback() {
  console.log('mongodb connected');                 //result : connected
});



app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(3001, () => {
    console.log("GraphQL server started on port 3001");
})