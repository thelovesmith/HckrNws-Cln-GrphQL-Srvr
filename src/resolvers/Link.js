// In this resolver you fetch the Link usng Prisma client then invoke postedBy on it and connecting the userId to the link 

function postedBy(parent, args, context) {
    //linking userId to the link being posted 
    return context.prisma.link({id: parent.id}).postedBy()
}

//resolver for vote for link
function votes(parent, args, context) {
    //linking vote to link
    return context.prisma.link({ id: parent.id }).votes()
}

module.exports = {
    postedBy,
    votes,
}