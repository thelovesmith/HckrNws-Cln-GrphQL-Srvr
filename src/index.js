const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client/index');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription')
// Revolvers
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link
}

//Server
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    //Instead of attaching an object directly, you’re now creating the context as a function which returns the context. The advantage of this approach is that you can attach the HTTP request that carries the incoming GraphQL query (or mutation) to the context as well. This will allow your resolvers to read the Authorization header and validate if the user who submitted the request is eligible to perform the requested operation.


    context: request => {
        return {
            ...request,
            prisma,
        }
    }
})
server.start(() => console.log('Server is running  on http://localhost:4000'))