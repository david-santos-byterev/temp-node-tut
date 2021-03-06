const express = require('express')
const app = express()

// const morgan = require('morgan')

const { products, people } = require('./data')

const logger = require('./logger')
const authorize = require('./authorize')

// use middlewares on all endpoints
// app.use([logger, authorize])

app.use(express.static('./public'))

// app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', [logger, authorize], (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product

        return { id, name, image }
    })
    res.json(newProducts)
})

app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params
    const singleProduct = products.find((product) => product.id === Number(productId))

    if (!singleProduct) {
        return res.status(404).send('Product does not exist')
    }
    res.json(singleProduct)
})

app.get('/api/products/:productId/reviews/:review', (req, res) => {
    console.log(req.params)
    res.send('dummy')
})

app.get('/api/v1/query', (req, res) => {
    console.log(req.query)
    const { search, limit } = req.query

    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if (sortedProducts.length < 1) {
        // res.status(200).send('no products matched your search')
        return res.status(200).json({ success: true, data: [] })
    }

    res.status(200).json({ success: true, data: sortedProducts })
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})