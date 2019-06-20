const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils')

//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////

//! The signup and login mutations behave very similar.Both return information about the User who’s signing up(or logging in) as well as a token which can be used to authenticate subsequent requests against your GraphQL API.This information is bundled in the AuthPayload type.
//////////////
//////////////
//////////////


//! Signup Revolver
async function signup(parent, args, context, info){

    //encrypting user's password 
    const password = await bcrypt.hash(args.password, 10)

    //store user in database using prisma client
    const user = await context.prisma.createUser({...args, password})

    //generating a jwt and signing it with an APp Secret
    const token = jwt.sign({userId: user.id}, APP_SECRET)

    //Returning the token and the user in and object that adheres to the authpayload shcema
    return {
        token,
        user,
    }
}
///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
//! Login Revolver 
async function login(parent, args, context, info){

    //IF the user email isn't found in the database then the login funciton will throw an error 
    const user = await context.prisma.user({email: args.email})
    if (!user) {
        throw new Error('No such user found')
    }

    //Compare the submitted password with the one in the database. If the password that was submitted doesn't match the found user then the function will throw an error
    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid) {
        throw new Error('Invalid Password')
    }
    //Generating another JWT token for this session with an APP_Secret. I ubdertand this as a ay to keep track of user sessions
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    
    //
    return {
        token,
        user,
    }
}


///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
//Resolver implementation for post
//new POst resolver
//getUserId retrieves users ID from JWT that is set during auth. Laos using the userId to link the post with the user who is creating it 
function post(parent, args, context, info ) {
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: {id: userId} },//nested object write
    })    
}


///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
//! Resolver Function for Vote 
async function vote(parent, args, context, info) {
    //validating JWT with getuserid function and returning userID if validated 
    const userId = getUserId(context)

    //verifying if user has voted for this specific link yet by using $exists function generated by prisma client
    //if exists returns true then error will be thrown 
    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId }, 
    })
    if (linkExists) {
        throw new Error(`Already voted for link: ${args.linkId}`)        
    }

    //if existrs returns false the createVite method will create a new Vote that is connected to the user and the link
    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
    })
}


///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////
module.exports = {
    signup,
    login,
    post,
    vote,
}