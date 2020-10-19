const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  current_quantity: Number
}, { collection: 'Product Info' })

module.exports = mongoose.model('Product', ProductSchema)