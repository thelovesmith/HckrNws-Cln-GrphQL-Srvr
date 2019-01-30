const jwt = require('jsonwebtoken');
//used to sign the JWTs which you are issuing for your users
const APP_SECRET = 'GraphQL-is-aw3some';

//helper function tht authorizes user when calling resolvers that require authentication 
function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }
    //is thrown if user is not autheticated 
    throw new Error('Not authenticated');
}
module.exports = {
    APP_SECRET,
    getUserId
}