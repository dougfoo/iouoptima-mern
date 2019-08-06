// loan.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LoanSchema   = new Schema({
    name: String,
    otherId: Number
});
module.exports = mongoose.model('Loan', LoanSchema);
