//The code seems pretty straightforward. As mentioned before, the subscription resolver is provided as the value for a subscribe field inside a plain JavaScript object.

//As mentioned, the prisma client instance on the context exposes a $subscribe property which proxies the subscriptions from the Prisma API. This function is used to resolve subscriptions and push the event data. Prisma is taking care of all the complexity of handling the realtime functionality under the hood.

function newLinkSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
}

const newLink = { 
    subscribe: newLinkSubscribe,
    resolve: payload => {
        return payload
    }
}



function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    },
}


module.exports = {
    newLink,
    newVote,
}