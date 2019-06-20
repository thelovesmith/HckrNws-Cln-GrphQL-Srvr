// TODO: Create query for all users 


async function feed(parent, args, context, info) {
    // If no filter string is provided, then the where object will be just an empty object and no filtering conditions will be applied by the Prisma engine when it returns the response for the links query.

    //* In case there is a filter carried by the incoming args, you’re constructing a where object that expresses our two filter conditions from above.This where argument is used by Prisma to filter out those Link elements that don’t adhere to the specified conditions.
    
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter },
            { url_contains: args.filter },
        ],
    } : {}

    const links = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
        // here is  the invocation of the links query now receives two additional arguments (skip and first) which might be carried by the incoming args object
    })

        // using the linksConnection query from the Prisma client API to retrieve the total number of Link elements currently stored in the database.

        // The links and count are then wrapped in an object to adhere to the Feed type that you just added to the GraphQL schema
    const count = await context.prisma.linksConnection({
        where,
    })
    .aggregate()
    .count()
    return {
        links,
        count,
    }
}

module.exports = {
    feed,
}