const logger = (req, res, next) => {
    let method = req.method
    let url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
}

module.exports = logger