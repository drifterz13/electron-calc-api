const mongoose = require('mongoose')

const CalcSchema = new mongoose.Schema({
  firstVariable: Number,
  secondVariable: Number,
  operation: String,
  result: Number,
})

const Calc = mongoose.model('Calc', CalcSchema)
module.exports = Calc