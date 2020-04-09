const postFunction = {}

postFunction.createPost = async req => {
    try {
        const { user } = req
        if (user) {
            const { title, content } = req.params
            if (title || content) {
                const Post = Parse.Object.extend('Post')
                const post = new Post()
                post.set('title', title)
                post.set('content', content)
                post.set('author', user)
                const newPost = await post.save({ useMasterKey:true })
                return newPost
            }
            throw {
                code: 601,
                error: 'missing params'
            }
        }
        throw {
            code: 602,
            error: 'unauthorized'
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

postFunction.editPost = async req => {
    try {
        const { user } = req
        console.log(user)
        const { postId, title, content } = req.params
        if (postId) {
            const Post = Parse.Object.extend('Post')
            const query = new Parse.Query(Post)
            const post =  await query.equalTo('objectId', postId).first()
            if(user.objectId === post.get('author.objectId')) { 
                post.set('title', title)
                post.set('content', content)
                const newPost = await post.save({ useMasterKey:true })
                return newPost
            }
            throw {
                code: 602,
                error: 'unauthorized'
            }
        }
        throw {
            code: 601,
            error: 'missing params'
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

postFunction.deletePost = async req => {
    try {
        const { user } = req
        const { postId } = req.params
        if (postId) {
            const Post = Parse.Object.extend('Post')
            const query = new Parse.Query(Post)
            const post =  await query.equalTo('objectId', postId).first()
            if(user.objectId === post.get('author.objectId')) {
                const newPost = await post.destroy({ useMasterKey:true })
                return newPost
            }
            throw {
                code: 602,
                error: 'unauthorized'
            }
        }
        throw {
            code: 601,
            error: 'missing params'
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

postFunction.getPost = async req => {
    try {
        const Post = Parse.Object.extend('Post')
        const query = new Parse.Query(Post)
        const post =  await query.equalTo('objectId', postId).first()
        return post
    } catch (err) {
        console.log(err)
        return err
    }
}

postFunction.getPosts = async req => {
    try {
        const { page, limit } = req.params
        limitPost = limit ? limit : 10
        skipPost = page ? (page - 1) * limitPost : 0
        const Post = Parse.Object.extend('Post')
        const query = new Parse.Query(Post)
        const post = await query
        .limit(limitPost)
        .skip(skipPost)
        .find()
        return post
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports = postFunction