const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cardDataSchema = new Schema({
		CardNumber: {
				type: String,
				required: true
		},
		ExpDate: {
				type: String,
				required: true
		},
		CVV: {
				type: String,
				required: true
		},
		Amount: {
				type: String,
				required: true
		}
}, { timestamps: true });

const CardData = mongoose.model('CardData', cardDataSchema);
module.exports = CardData