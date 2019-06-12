import React, { 
  useState, 
  useEffect, 
  useContext, 
  createContext
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Navbar from './head/Navbar'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

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
    textAlign: 'center',
	},
	textField: {
    marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 100
	},
	fab: {
		marginTop: theme.spacing.unit * 2,
  },
  screen: {
    padding: 20,
    backgroundColor: '#f5f6f7',
    width: '320px',
    margin: '0 auto',
    marginBottom: 20,
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  chair_info: {
    display: 'inline-flex',
    textTransform: 'uppercase',
    padding: 20,
    margin: '0 auto',

    "& > *": {
      border: '1px dotted #ccc',
      fontWeight: 600,
      padding: 20,
      minWidth: '240px'
    }
  }
})

let TicketContext = createContext()
let ChairContext = createContext()

let rowTitle = ['1','2','3','4','5','6','7','8','9','10',
'11','12','13','14','15','16','17','18','19','20'];

let columnTitle = ['A','B','C','D','E','F','G','H','I','J',
'K','L','M','N','O','P','Q','R','S','T','U','V', 'W','X','Y','Z'];  

// select step
function getSteps() {
  return ['Chọn số lượng ghế', 'Vị trí ghế ngồi', 'Xác nhận thanh toán'];
}

// check chair was booked
function isBooked(x, y, dataChairsBooked) {
  for (let i = 0; i < dataChairsBooked.length; i++) {
    if (dataChairsBooked[i][0] === x && dataChairsBooked[i][1] === y) {
      return true;
    } 
  }
  return false;
}

// set chair's style
function GetStyleChair(x, y, dataChairsBooked, dataUserChairs) {
  if (isBooked(x, y, dataChairsBooked)) {
    return "#ccc"
  } 

  if (isBooked(x, y, dataUserChairs)) {
    return "green"
  }

  return "#fff"
}

// list chairs user was choose
function getListUserChair(dataUserChairs) {  
  let userChair = [];
  for (let i = 0; i < dataUserChairs.length; i++) {
    let chair = dataUserChairs[i]

    userChair.push(
      <span 
        key={columnTitle[chair[0]]+rowTitle[chair[1]]}
        style={{border: '1px solid green', padding: '3px'}}>
      {columnTitle[chair[0]]+rowTitle[chair[1]]}
      </span>
    )
  }
  return userChair
}

// general a map chairs
function GeneralChairsMap() {
  const { actions, classes } = useContext(TicketContext);
  const { row, column, number_chair } = useContext(ChairContext);
  
  const [dataChairsBooked, setDataChairsBooked] = useState([]);
  const [dataUserChairs, setDataUserChairs] = useState([]);

  
  useEffect(() => {
    actions.GetChairsBooked();
  }, []);

  useEffect(() => {
    const { chairs } = actions.ShowtimeCpanel;

    if (chairs) {
      console.log(chairs)
      setDataChairsBooked(chairs)
    }
  }, [actions.ShowtimeCpanel])


  const Cell = (props) => {
    const { x, y } = props;
    let userBooked = [];

    return (
      <Button
        style={{
          backgroundColor: GetStyleChair(x, y, dataChairsBooked, dataUserChairs),
          border: '1px solid',
          margin: "0px 1px 3px 1px",
          cursor: 'pointer',
        }}
        onClick={() => {
          if (isBooked(x, y, dataChairsBooked) || isBooked(x, y, dataUserChairs)) {
            return false;
          } else {
            userBooked = [
              ...dataUserChairs,
              [x, y]
            ]
            setDataUserChairs(userBooked.slice(-number_chair))
          }
        }}
      >{columnTitle[x] + "" + rowTitle[y]}</Button>
    )
  }

  const Matrix = () => {
    let matrix = [];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        
        if (j === column / 2) {
          matrix.push(<span key={rowTitle[j]+i+j}> </span>)
        } 
        matrix.push(<Cell 
          key={columnTitle[i]+rowTitle[j]} 
          x={i} 
          y={j} 
        />)
      }
      matrix.push(<br key={columnTitle[i]}/>)
    }
    return matrix;
  }

  return (
    <React.Fragment>
      <Matrix />
      <section className={classes.chair_info}>
        <Typography>Số ghế: {number_chair}</Typography>
        <Typography>Đã chọn: {getListUserChair(dataUserChairs)}</Typography>
      </section>
    </React.Fragment>
  )
}

// change step content
function StepContent() {
  let { activeStep, classes } = useContext(TicketContext)
  let localState = JSON.parse(localStorage.getItem('localState'))

  const setNumberChair = (value) => {
    let update = {
      ...localState,
      number_chair: value
    }
    localStorage.setItem('localState', JSON.stringify(update))

    return value
  }

  const handleChangeNumberChair = (e) => {
    const { value } = e.target
    setNumberChair(value)
  }

  if (!localState) {
    return (
      <p>Không khớp dữ liệu</p>
    )
  } else { 
    switch (activeStep) {
      case 0:
          return (
            <React.Fragment>
              <TextField
                id="filled-bare"
                className={classes.textField}
                defaultValue={localState.number_chair || setNumberChair(1)}
                margin="normal"
                variant="filled"
                type="number"
                inputProps={{ min: "1", max: "10", step: "1" }}
                onChange={handleChangeNumberChair}
              />
            </React.Fragment>
          )
      case 1:
          return (
              <ChairContext.Provider value={{
                number_chair: localState.number_chair,
                row: localState.number_row,
                column: localState.number_column
                }}>
                  <Typography className={classes.screen}>Màn hình</Typography>
                  <GeneralChairsMap />
              </ChairContext.Provider>
          )
      case 2:
        return 'Xem lại quá trình đặt vé';
      default:
        return 'Ủa lỗi gì vậy :(';
    }
  }
}

// General main content
const Ticket = (props) => {
  const { classes, actions } = props
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = useState({})
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

    // send ticket data to server for next
    if (activeStep === steps.length - 1) {
      console.log('sended !')
    }
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
            <Button onClick={handleReset}>Đặt thêm vé mới</Button>
          </div>
        ) : (
          <div>
            <section className={classes.instructions}>
              <TicketContext.Provider value={{
                actions,
                classes,
                activeStep,
                }}>
                  <StepContent />
              </TicketContext.Provider>
            </section>
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

