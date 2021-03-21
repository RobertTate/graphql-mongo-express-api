const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.mfwmd.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`);
mongoose.connection.once('open', ()=> {
  console.log('Connected to Database');
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000')
});

