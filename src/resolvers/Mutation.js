
//Signup Revolver
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

//Login Revolver 
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

module.exports = {
    signup,
    login,
    post
}