const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContractingStatusSchema = new Schema({
    name: {type: String, },
    description:{type: String, }, 
});

const ContractingStatusModel = mongoose.model('ContratingStatus', ContractingStatusSchema );

module.exports = { ContractingStatusModel }