const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    sendEmail: Boolean,
    members: []
});

const group = Mongoose.model('group', groupSchema);

module.exports = group;
