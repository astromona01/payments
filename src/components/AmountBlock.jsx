import TextField from "@mui/material/TextField";
import { useState } from 'react';

const AmountBlock = (props) => {
		let [amount, setAmount] = useState('')
		const { isLetterInInput, isValidForm } = props

		const handleAmountChange = (e) => {
				const input = e.target
				const Amount = { Amount: input.value }
				if (isLetterInInput(e)){
						return
				}
				if (input.value.length !== 0) {
						isValidForm(null, null, {isValid: true, Amount})
				} else {
						isValidForm(null, null, {isValid: false, Amount})
				}
				setAmount(input.value)
		}
		return (
				<div className="amount-block">
						<div>Amount</div>
						<TextField value={amount} onInput={handleAmountChange} id="outlined-basic" variant="outlined" />
				</div>
		)
}
export default AmountBlock;