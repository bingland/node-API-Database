const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://bingland:${ process.env.MONGO_ATLAS_PW }@cluster0.fygfn.mongodb.net/Products?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(port, () => { console.log(`Server running on port ${port}`) })

// Schemas
const Product = require('./models/Product')
const Manufacturer = require('./models/Manufacturer')

app.get('/', (req, res) => {
    res.send('Make requests to /products and /manufacturers')
})

// POST
app.post('/products', (req, res) => {
    Product.create({
        name: req.query.name,
        category: req.query.category,
        price: req.query.price,
        current_quantity: req.query.current_quantity
    }, (err, products) => {
        if (err) console.log(err)
        
        Product.find((err, products) => {
            if (err) console.log(err)
            res.json(products)
        })
    })
})

app.post('/manufacturers', (req, res) => {
    Manufacturer.create({
        name: req.query.name,
        address: req.query.address,
        phone: req.query.phone
    }, (err, manufacturers) => {
        if (err) console.log(err)
        
        Manufacturer.find((err, manufacturers) => {
            if (err) console.log(err)
            res.json(manufacturers)
        })
    })
})

// GET
app.get('/products', (req, res) => {
    Product.find((err, products) => {
        if (err) console.log(err)
        res.json(products)
    })
})

app.get('/manufacturers', (req, res) => {
    Manufacturer.find((err, manufacturers) => {
        if (err) console.log(err)
        res.json(manufacturers)
    })
})

// PUT
app.put('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) console.log(handleError(err))
        product.updateOne(req.query, (err, products) => {
            if (err) console.log(err)

            Product.find((err, products) => {
                if (err) console.log(handleError(err))
                res.json(products)
            })
        })
    })
})

app.put('/manufacturers/:id', (req, res) => {
    Manufacturer.findById(req.params.id, (err, manufacturer) => {
        if (err) console.log(handleError(err))
        manufacturer.updateOne(req.query, (err, manufacturers) => {
            if (err) console.log(err)

            Manufacturer.find((err, manufacturers) => {
                if (err) console.log(handleError(err))
                res.json(manufacturers)
            })
        })
    })
})

// DELETE
app.delete('/products/:id', (req, res) => {
    Product.remove({
        _id: req.params.id
    }, (err, products) => {
        if (err) console.log(handleError(err))
        Product.find((err, products) => {
            if (err) console.log(handleError(err))
            res.json(products)
        })
    })
})

app.delete('/manufacturers/:id', (req, res) => {
    Manufacturer.remove({
        _id: req.params.id
    }, (err, manufacturers) => {
        if (err) console.log(handleError(err))
        Manufacturer.find((err, manufacturers) => {
            if (err) console.log(handleError(err))
            res.json(manufacturers)
        })
    })
})