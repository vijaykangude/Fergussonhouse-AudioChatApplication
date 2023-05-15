const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tokenSchema = new Schema(
    {
        refreshToken: { type: String, required: true},
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('refreshToken',tokenSchema,'tokens');