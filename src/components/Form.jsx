import Button from '@mui/material/Button';
import CardFront from './CardFront';
import CardBack from './CardBack';
import AmountBlock from "./AmountBlock";
import {useState} from "react";

export const Form = () => {
		let [validCardFront, setValidCardFront] = useState(false)
		let [validCardBack, setValidCardBack] = useState(false)
		let [validCardAmount, setValidAmount] = useState(false)
		let [validForm, setValidForm] = useState(false)
		let [cardData, setCardData] = useState({})
		let [serverRes, setServerRes] = useState({})

		const isValidForm = (front, back, amount) => {
				let validFront, validBack, validAmount
				if (front === null){
						validFront = validCardFront
				} else {
						validFront = front.isValid
						setValidCardFront(front.isValid)
						setCardData({...cardData, ...front.cardData})
				}
				if (back === null){
						validBack = validCardBack
				} else {
						validBack = back.isValid
						setValidCardBack(back.isValid)
						setCardData({ ...cardData, ...back.CVV })
				}
				if (amount === null){
						validAmount = validCardAmount
				} else {
						validAmount = amount.isValid
						setValidAmount(amount.isValid)
						setCardData({ ...cardData, ...amount.Amount })
				}

				if (validFront && validBack && validAmount) {
						setValidForm(true)
				} else {
						setValidForm(false)
				}
		}
		const isLetterInInput = (e) => {
				return /[a-zA-Zа-яА-Я-=%$#&?():^;@!/*_+.<>,"'{}]/gi.test(e.target.value) || e.nativeEvent.data === " "
		}
		const handlePay = async () => {
				try {
						const res = await fetch('http://localhost:5000/save-card', {
								method: 'POST',
								headers: {
										"Content-Type": "application/json"
								},
								body: JSON.stringify(cardData)
						})
						const data = await res.json()
						setServerRes(data)
						console.log(data)
				}catch(e) {
						console.log(e)
				}
		}
		return (
				<div className="form-wrapper">
						<CardFront isLetterInInput={isLetterInInput} isValidForm={isValidForm} />
						<CardBack isLetterInInput={isLetterInInput} isValidForm={isValidForm} />
						<AmountBlock isLetterInInput={isLetterInInput} isValidForm={isValidForm} />
						<Button onClick={handlePay} className="pay-button" variant="contained" disabled={!validForm}>Оплатить</Button>
				</div>
		)
}
export default Form;