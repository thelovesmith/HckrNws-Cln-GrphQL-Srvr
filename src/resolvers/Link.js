//In this resolver you fetch the Link usng Prisma client then invoke postedBy on it and connecting the userid to the link 
function postedBy(parent, args, context) {
    //linking userId to the link being posted 
    return context.prisma.link({id: parent.id}).postedBy()
}

module.exports = {
    postedBy,
}