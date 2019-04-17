import React from "react"

import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import StepContent from "@material-ui/core/StepContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

// Actual Steps

import Step1 from "../Step1"
import Advection from "../Advection"

const styles = (theme) => ({
	appBar: {
		position: "relative"
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
		padding: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginTop: theme.spacing.unit * 6,
			marginBottom: theme.spacing.unit * 6,
			padding: theme.spacing.unit * 3
		}
	},
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit
	}
})

const steps = [
	"Enter Advection Settings",
	"Enter Dispersion Settings",
	"Enter Adsorption Settings"
]

function getStepContent(step, state, advectionSwitchHandle, changeHandler) {
	switch (step) {
		case 0:
			return (
				<Advection
					advection={state.advection}
					switchHandle={advectionSwitchHandle}
					changeHandler={changeHandler}
				/>
			)
		case 1:
			return (
				<Advection
					advection={state.advection}
					switchHandle={advectionSwitchHandle}
					changeHandler={changeHandler}
				/>
			)
		case 2:
			return (
				<Advection
					advection={state.advection}
					switchHandle={advectionSwitchHandle}
					changeHandler={changeHandler}
				/>
			)
		default:
			return <Step1 text="Step 1" />
		// throw new Error("Unknown step")
	}
}

class MainInput extends React.Component {
	constructor(props) {
		super(props)

		this.handleSwitch = this.handleSwitch.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	state = {
		activeStep: 0,
		advection: {
			type: 0, //0 is seepage, 1 is hydraulic,
			isFormValid: false
		}
	}

	handleNext = () => {
		this.setState((state) => ({
			activeStep: state.activeStep + 1
		}))
	}

	handleBack = () => {
		this.setState((state) => ({
			activeStep: state.activeStep - 1
		}))
	}

	handleReset = () => {
		this.setState({
			activeStep: 0
		})
	}

	handleSwitch(event) {
		let stateObject = this.state.advection
		stateObject.type = this.state.advection.type === 1 ? 0 : 1
		this.setState({
			advection: stateObject
		})
		// console.log(JSON.stringify(this.state, null, 4))
	}

	handleChange(subClass, name, value) {
		if (subClass) {
			let stateObject = this.state[subClass]
			stateObject[name] = value
			this.setState({
				[subClass]: stateObject
			})
		} else {
			this.setState({
				[name]: value
			})
		}

		// console.log(JSON.stringify(this.state, null, 4))
	}

	checkFormValidity(formKey, result) {
		let currentState = this.state[formKey].isFormValid
		if (currentState === undefined) {
			currentState = result
		} else {
			currentState = currentState && result
		}
		let stateObject = this.state[formKey]
		stateObject["isFormValid"] = currentState
		console.log("form valid:", stateObject["isFormValid"])
		this.setState({
			[formKey]: stateObject
		})
	}

	render() {
		const { classes } = this.props
		const { activeStep } = this.state

		return (
			<React.Fragment>
				<CssBaseline />
				<AppBar position="absolute" color="default" className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit" noWrap>
							Biochlor on the Web
						</Typography>
					</Toolbar>
				</AppBar>
				<div className={classes.layout}>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									{getStepContent(
										index,
										this.state,
										this.handleSwitch,
										this.handleChange,
										this.checkFormValidity
									)}
									<div className={classes.actionsContainer}>
										<div>
											{activeStep !== 0 && (
												<Button
													disabled={activeStep === 0}
													onClick={this.handleBack}
													className={classes.button}
												>
													Back
												</Button>
											)}
											<Button
												variant="contained"
												color="primary"
												onClick={this.handleNext}
												className={classes.button}
											>
												{activeStep === steps.length - 1
													? "Finish"
													: "Next"}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length && (
						<Paper square elevation={0} className={classes.resetContainer}>
							<Typography>
								All steps completed - you&apos;re finished
							</Typography>
							<Button onClick={this.handleReset} className={classes.button}>
								Reset
							</Button>
						</Paper>
					)}
				</div>
			</React.Fragment>
		)
	}
}

MainInput.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainInput)
