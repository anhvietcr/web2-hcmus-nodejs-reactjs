import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Navbar from './head/Navbar'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'


const styles = theme => ({
	root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 5,
	},
	textField: {
    marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 100
	},
	fab: {
		marginTop: theme.spacing.unit * 2,
	}
})

function getSteps() {
  return ['Chọn số lượng ghế', 'Vị trí ghế ngồi', 'Xác nhận thanh toán'];
}


function getStepContent(stepIndex, classes) {

	const handleChangeNumber = (e) => {
		const {name} = e.target

		if (name === 'sub') {
			
		} else {

			console.log('add')

		}
	}

  switch (stepIndex) {
    case 0:
      return (
				<React.Fragment>
					<Fab color="secondary" aria-label="Sub" className={classes.fab}
						name="sub"
						onClick={handleChangeNumber}>
						<RemoveIcon />
					</Fab>
					<TextField
						id="filled-bare"
						className={classes.textField}
						defaultValue="1"
						margin="normal"
						variant="filled"
						type="number"
						inputProps={{ min: "1", max: "10", step: "1" }}
					/>
				<Fab color="primary" aria-label="Add" className={classes.fab}
					name="add"
					onClick={handleChangeNumber}
				>
					<AddIcon />
				</Fab>
				</React.Fragment>
			)
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}

const Ticket = (props) => {
	const { classes, actions } = props
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

	// navigation
	useEffect(() => {

		let localState = localStorage.getItem('localState')
		localState = JSON.parse(localState);

		if (!localState || !localState.user_id) {
			actions.history.push('/auth/login');
		}
		
	}, []);


	// steper controller
  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

	
	return (
		<React.Fragment>
			<Navbar />
			<div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Hoàn tất quá trình đặt vé</Typography>
            <Button onClick={handleReset}>Cấu hình lại</Button>
          </div>
        ) : (
          <div>
            <section className={classes.instructions}>{getStepContent(activeStep, classes)}</section>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Quay lại
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
			</React.Fragment>
	)
}

Ticket.propTypes = {
	classes: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
}

export default withStyles(styles)(Ticket)

