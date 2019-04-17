import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Switch from "@material-ui/core/Switch"
import purple from "@material-ui/core/colors/purple"
import { ValidatorForm } from "react-material-ui-form-validator"

import SciField from "../SciField"

import { getSeepageVel } from "../../utilities/converters"

const styles = (theme) => ({
  colorSwitchBase: {
    color: purple[300],
    "&$colorChecked": {
      color: purple[500],
      "& + $colorBar": {
        backgroundColor: theme.palette.common.grey
      }
    }
  },
  colorBar: {},
  colorChecked: {}
})

class Advection extends React.Component {
  constructor(props) {
    super(props)

    this.onComponentChange = this.onComponentChange.bind(this)
  }

  onComponentChange(event) {
    const { name, value } = event.target
    this.props.changeHandler("advection", name, value)
  }

  componentDidUpdate() {
    let mainForm = this.refs.mainForm
    mainForm.isFormValid().then((val) => {
      if (val !== this.props.advection.isFormValid) {
        this.props.changeHandler("advection", "isFormValid", val)
      }
    })
  }

  getCalculatedVelocity() {
    return getSeepageVel(
      this.props.advection.hydGrad,
      this.props.advection.hydCond,
      this.props.advection.porosity
    )
  }

  render() {
    const { classes, advection } = this.props
    return (
      <ValidatorForm ref="mainForm" instantValidate>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            Seepage Velocity
            <Switch
              checked={advection.type === 1}
              onChange={this.props.switchHandle}
              classes={{
                switchBase: classes.colorSwitchBase,
                checked: classes.colorChecked,
                bar: classes.colorBar
              }}
            />
            Hydraulic Parameters
          </Grid>

          {advection.type === 0 && (
            <Grid item xs={12} sm={6}>
              <SciField
                value={advection.sepVel}
                id="sepVel"
                label={
                  <React.Fragment>
                    Seepage Velocity (V<sub>s</sub>)
                  </React.Fragment>
                }
                onChange={this.onComponentChange}
                helperText="Help Text about Seepage Velocity"
                unit="ft/yr"
                required
                validators={["isFloat"]}
              />
            </Grid>
          )}

          {advection.type === 1 && (
            <React.Fragment>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom />
              </Grid>
              <Grid item xs={12}>
                <SciField
                  validators={["isFloat"]}
                  value={advection.hydCond}
                  id="hydCond"
                  label={<React.Fragment>Hydraulic Conductivity (K)</React.Fragment>}
                  onChange={this.onComponentChange}
                  helperText="Help Text about Hydraulic Conductivity"
                  unit="cm/sec"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <SciField
                  validators={["isFloat"]}
                  value={advection.hydGrad}
                  id="hydGrad"
                  label={<React.Fragment>Hydraulic Gradient (i)</React.Fragment>}
                  onChange={this.onComponentChange}
                  helperText="Help Text about Hydraulic Gradient"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <SciField
                  validators={["isFloat"]}
                  value={advection.porosity}
                  id="porosity"
                  label={<React.Fragment>Effective Porosity (n)</React.Fragment>}
                  onChange={this.onComponentChange}
                  helperText="Help Text Effective Porosity"
                  required
                />
              </Grid>
              {advection.isFormValid && (
                <Grid item xs={12}>
                  <SciField
                    value={this.getCalculatedVelocity()}
                    id="porosity"
                    label={<React.Fragment>Calculated Seepage Velocity</React.Fragment>}
                    onChange={this.onComponentChange}
                    helperText="Calculated from the above inputs"
                    unit="cm/sec"
                    disabled
                  />
                </Grid>
              )}
            </React.Fragment>
          )}
        </Grid>
      </ValidatorForm>
    )
  }
}

Advection.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Advection)
