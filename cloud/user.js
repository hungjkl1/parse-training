const userFunction = {}

userFunction.signUp = async req => {
    try {
        const { username, password } = req.params
        const user = new Parse.User()
        user.set('username', username)
        user.set('password', password)
        const newUser = await user.signUp()
        return newUser
    } catch(err) {
        return err
    }
}

userFunction.login = async req => {
    try {
        const { username, password } = req.params
        const user = await Parse.User.logIn(username,password)
        return user
    } catch(err) {
        return err
    }
}

userFunction.getUser = async req => {
    try {
        const { uid } = req.params
        const User = new Parse.User()
        const query = new Parse.Query(User)
        const user = await query.equalTo('objectId', uid).first()
        return user
    } catch(err) {
        return err
    }
}

userFunction.getUsers = async req => {
    try {
        const User = new Parse.User()
        const query = new Parse.Query(User)
        const user = await query.find()
        return user
    } catch(err) {
        return err
    }
}

userFunction.updateInfo = async req => {
    try {
        const { user } = req
        console.log(user)
        const User = new Parse.User()
        const query = new Parse.Query(User)
        const currentUser = await query.get(user.id)
        const { password } =req.params
        currentUser.set('password', password)
        await currentUser.save(null, {useMasterKey:true})
        return {
            message: 'Update Information Successful'
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports = userFunction