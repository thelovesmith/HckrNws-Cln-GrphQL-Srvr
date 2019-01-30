//this resolver resolves the links relation with the user by invoking this function and connecting the user's Id
function links(parent, args, context) {
    return context.prisma.user({id: parent.id}).links()
}

module.exports = {
    links,
}