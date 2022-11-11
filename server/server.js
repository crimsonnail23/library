const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
//import apolloServer
const {ApolloServer}=require('apollo-server-express');
//import authMiddleware.
const {authMiddleware}=require('./utils/auth')
//import typeDefs and resolvers.
const{typeDefs, resolvers}=require('./schemas')

const app = express();
const PORT = process.env.PORT || 3001;

//create new Apollo Server and pass in schema data with context.
const server= new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}



app.use(routes);


const startApolloServer = async (typeDefs, resolvers)=>{

await server.start();
//integrate apollo server with express app middleware.
server.applyMiddleware({ app })  
  
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });


});

}

//call the function to start the server.
startApolloServer(typeDefs, resolvers);
