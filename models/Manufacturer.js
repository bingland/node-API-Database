const mongoose = require('mongoose')

const ManufacturerSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String
}, { collection: 'Product Manufacture Info' })

module.exports = mongoose.model('Manufacturer', ManufacturerSchema)