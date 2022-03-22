const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const CardData = require('./models/cardData')

const db = 'mongodb+srv://astromona:123456789Qaz@cluster0.oiepg.mongodb.net/Cards?retryWrites=true&w=majority'
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

mongoose.connect(db).then((res) => console.log('Connected')).catch((e) => console.log(e))

app.post('/save-card', (req, res) => {
		const { CardNumber, ExpDate, CVV, Amount } = req.body;
		const cardData = new CardData({ CardNumber, ExpDate, CVV, Amount })
		cardData.save()
		.then(result => {
				const response = { RequestId: result._id.toJSON(), Amount: parseInt(result.Amount) }
				res.send(response)
		})
		.catch(error => {
				console.log(error)
		})
})

app.listen(port, () => {
		console.log(`Listening ${port} port`)
})