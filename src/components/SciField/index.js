import React from "react"
import InputAdornment from "@material-ui/core/InputAdornment"
import { TextValidator } from "react-material-ui-form-validator"

const errorMessageDict = {
	isFloat: "Value needs to be a number",
	isNumber: "Value needs to be a number",
	required: "Required Value"
}

const SciField = (props) => {
	const { unit, ...rest } = props

	if (props.required && props.validators) {
		props.validators.push("required")
	}

	let errorMessages = [],
		inputProps = {}
	if (props.validators) {
		errorMessages = props.validators.map((validator) => {
			return errorMessageDict[validator]
		})
	}
	if (props.unit) {
		inputProps = {
			endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>
		}
	}

	return (
		<TextValidator
			{...rest}
			fullWidth
			name={props.id}
			variant="outlined"
			InputProps={inputProps}
			errorMessages={errorMessages}
		/>
	)
}

export default SciField
