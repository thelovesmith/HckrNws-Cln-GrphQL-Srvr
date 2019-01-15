const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client/index')


// Revolvers
const resolvers = {
    Query: {
        info: () =>  'This is the API for the Hacker News clone!, Get Rigth Witcha, imma get ya !!' ,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        }
	},
	Mutation: {
		post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        }
	},
}

//Server
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    //initializing context object that is being passed to each resolver 
    context: { prisma },
})
server.start(() => console.log('Server is running  on http://localhost:4000'))