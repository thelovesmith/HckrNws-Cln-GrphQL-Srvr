function feed(parent, args, context, info){
    return context.prisma.links()
}
function info() {
    ''
}

module.exports = {
    feed,
}