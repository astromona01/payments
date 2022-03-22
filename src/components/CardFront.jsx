import TextField from "@mui/material/TextField";
import { useState } from 'react';

const CardFront = (props) => {
		let [Number, setNumber] = useState('')
		let [Month, setMonth] = useState('')
		let [Year, setYear] = useState('')
		let [invalidMonth, setInvalidMonth] = useState({})
		let [invalidYear, setInvalidYear] = useState({})
		let [invalidNumber, setInvalidNumber] = useState({});

		const { isLetterInInput, isValidForm } = props;

		const handleNumberChange = (e) => {
				const input = e.target;
				const convertValue = input.value.replace(/(\d{4}(?=\d+(?!\d)))/g, "$1" + ' ');
				if (isLetterInInput(e) || convertValue.length >= 20){
						return
				}
				if (convertValue.length === 19) {
						setNumber(convertValue)
						setInvalidNumber({invalid: false, Number: input.value})
						return checkForm({invalid: false, Number: input.value}, invalidMonth, invalidYear)
				}
				setNumber(convertValue)
				setInvalidNumber(true)
				checkForm({invalid: true}, invalidMonth, invalidYear)
		}
		const handleDateChange = (e) => {
				const input = e.target
				if (isLetterInInput(e)){
						return
				}
				if (input.value.length >= 2) {
						setMonth(input.value)
						checkDate(input)
						const next = document.querySelectorAll('.card-date-item')[1]
						return next.querySelector('input').focus()
				}
				setMonth(input.value)
				checkDate(input)
		}
		const checkDate = (input) => {
				const value = parseInt(input.value)
				if(value && value <= 12) {
						setInvalidMonth({invalid: false, Month: input.value})
						checkForm(invalidNumber, {invalid: false, Month: input.value}, invalidYear)
				} else {
						setInvalidMonth(true)
						checkForm(invalidNumber, {invalid: true}, invalidYear)
				}
		}
		const handleYearChange = (e) => {
				const input = e.target
				if (isLetterInInput(e) || input.value.length >= 5){
						return
				}
				checkYear(input)
				setYear(input.value)
		}
		const checkYear = (input) => {
				const year = new Date().getFullYear();
				const value = parseInt(input.value)
				if (value && value > year) {
						setInvalidYear({invalid: false, year: input.value})
						checkForm(invalidNumber, invalidMonth, {invalid: false, year: input.value})
				} else {
						setInvalidYear(true)
						checkForm(invalidNumber, invalidMonth, {invalid: true})
				}
		}
		const checkForm = (number, month, year) => {
				if (!number.invalid && !month.invalid && !year.invalid) {
						const ExpDate = `${month.Month}/${year.year}`
						const cardData = { CardNumber: number.Number, ExpDate }
						isValidForm({isValid: true, cardData}, null, null)
				} else {
						isValidForm({isValid: false, cardData: null}, null, null)
				}
		}
		return (
				<div className="card-front">
						<TextField value={Number} onInput={handleNumberChange}
						           className="card-number" id="outlined-basic" variant="outlined"
						           placeholder="Card Number"
						/>
						<div className="date-block-name">Expiration Date:</div>
						<div className="card-date">
								<TextField value={Month} onInput={handleDateChange}
								           className="card-date-item" id="outlined-basic" variant="outlined"
								           placeholder="MM"
								/>
								<TextField value={Year} onInput={handleYearChange}
								           className="card-date-item" id="outlined-basic" variant="outlined"
								           placeholder="YYYY"
								/>
						</div>
				</div>
		)
}
export default CardFront;