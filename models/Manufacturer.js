const mongoose = require('mongoose')

const ManufacturerSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { collection: 'Product Manufacture Info' })

module.exports = mongoose.model('Manufacturer', ManufacturerSchema)