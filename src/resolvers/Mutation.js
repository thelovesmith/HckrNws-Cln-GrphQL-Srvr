
//Signup Revolver
async function signup(parent, args, context, info){

    //encryptig users password 
    const password = await bcrypt.hash(args.password, 10)

    //stor user in database using prisma client
    const user = await context.prisma.createUser({...args, password})

    //generating a jwt and signing it with an APp Secret
    const token = jwt.sign({userId: user.id}, APP_SECRET)

    //Returning the token and the user in and object that adheres to the authpayload shcema
    return {
        token,
        user,
    }
}

//Login Revolver 
async function login(parent, args, context, info){

    //
    const user = await context.prisma.user({email: args.email})
    if (!user) {
        throw new Error('No such user found')
    }

    //
    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid) {
        throw new Error('Invalid Password')
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET)
    
    
    //
    return {
        token,
        user,
    }
}

module.exports = {
    signup,
    login,
    post
}