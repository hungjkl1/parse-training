const postFunction = require('./post')
const userFunction = require ('./user')

//User
Parse.Cloud.define('signup', userFunction.signUp)
Parse.Cloud.define('login', userFunction.login)
Parse.Cloud.define('getUser', userFunction.getUser)
Parse.Cloud.define('getUsers', userFunction.getUsers)
Parse.Cloud.define('updateInfo', userFunction.updateInfo)
//Post
Parse.Cloud.define('createPost', postFunction.createPost)
Parse.Cloud.define('editPost', postFunction.editPost)
Parse.Cloud.define('deletePost', postFunction.deletePost)
Parse.Cloud.define('getPost', postFunction.getPost)
Parse.Cloud.define('getPostList', postFunction.getPosts)



