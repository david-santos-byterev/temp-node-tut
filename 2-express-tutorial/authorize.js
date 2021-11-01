const authorize = (req, res, next) => {

    const {user} = req.query

    if (user == 'john') {
        req.user = {} 
    }
    console.log('authorize')
    next()
}

module.exports = authorize