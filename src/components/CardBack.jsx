import TextField from "@mui/material/TextField";
import {useState} from "react";

const CardBack = (props) => {
		let [cvv, setCvv] = useState('')
		const { isLetterInInput, isValidForm } = props;

		const handleCVVInput = (e) => {
				const input = e.target
				if (isLetterInInput(e) || input.value.length >= 4){
						return
				} else if (input.value.length === 3){
						setCvv(input.value)
						return checkForm({isValid: true, CVV: input.value})
				}
				checkForm(false)
				setCvv(input.value)
		}
		const checkForm = (valid) => {
				if (valid.isValid) {
						const CVV = { CVV: valid.CVV }
						isValidForm(null, {isValid: true, CVV}, null)
				} else {
						isValidForm(null, {isValid: false, CVV: null}, null)
				}
		}
		return (
				<div className="card-back">
						<div className="line" />
						<div className="cvv-input-wrapper">
								<TextField value={cvv} onInput={handleCVVInput} className="CVV" id="outlined-basic" variant="outlined"/>
						</div>
						<div className="cvv-text">CVV</div>
				</div>
		)
}
export default CardBack;