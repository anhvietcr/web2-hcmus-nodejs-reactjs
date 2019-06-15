import React, { 
  useState, 
  useEffect, 
  useContext, 
  createContext,
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Navbar from './head/Navbar'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Alert from './helper/Alert'
import { REQUIRE_MIN_CHAIR } from '../constants/actionTypes'
import List from '@material-ui/icons/List'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import SkipNext from '@material-ui/icons/SkipNext'

const styles = theme => ({
	root: {
    width: '90%',
    margin: "0 auto",
  },
  input: {
    padding: "10px 0px 5px",
    fontSize: 30,
    margin: "0 auto",
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 5,
    textAlign: 'center',
    border: '1px dotted #ccc',
    padding: 5,
    backgroundColor: 'rgba(240, 251, 242, 0.46)',
  },
  success: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 5,
    textAlign: 'center',
    border: '1px dotted #ccc',
    backgroundColor: 'rgba(240, 251, 242, 0.46)',
    padding: 10,
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
    backgroundColor: '#e0e0e0',
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
  },
  ticket_info: {
    backgroundColor: 'rgba(202, 247, 195, 0.22)',
    border: '1px dotted #ccc',
    width: '320px',
    textAlign: 'left',
    margin: '0 auto',
    fontWeight: 400,

    "& ul": {
      listStyleType: 'none',
      padding: 0,

      "& li": {
        padding: 10,
        display: 'flex',
      },
      "& span": {
        display: 'inline-block',
        textTransform: 'uppercase',
        fontWeight: 500,
        marginLeft: 5,
      },
      "& svg": {
        marginRight: 5
      }
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

// check chair was selected
function isSelected(x, y, items) {
  return items.some(item => item[0] === x && item[1] === y)
}

// list chairs user was choose
function getListUserChair(items) {  
  let present = null;

  return items.map((item) => {
    present = columnTitle[item[0]]+rowTitle[item[1]];
    return (
      <span 
        key={present}
        style={{border: '1px solid green', padding: '3px'}}
      >{present}
      </span>
    )
  })
}

// format arraylocation for server
function FormatArraylocation(arr) {
  // [[0, 1], [2, 3]] => [{x: 0, y: 1}, {x: 2, y: 3}]
  let result = [];
  
  arr.map((item) => {
    result.push({
      x: item[0],
      y: item[1]
    })
  })
  return result
}

function FormatGetArrayLocation(arr) {
  //[{x: "0", y: "1"}, {x: "2", y: "3"}] => [[0, 1], [2, 3]]
  let result = [];
  arr.map((item) => {
    let temp = [];
    temp.push(parseInt(item.x))
    temp.push(parseInt(item.y))
    result.push(temp)
  });
  return result;
}

// general a map chairs
function GeneralChairsMap() {
  const { classes, dataUserChairs, setDataUserChairs } = useContext(TicketContext);
  const { row, column, number_chair, dataChairsBooked } = useContext(ChairContext);
  
  const Cell = (props) => {
    const { x, y } = props;

    return (
      <Button
        style={{
          backgroundColor: isSelected(x, y, dataChairsBooked) ? "#ccc" 
            : isSelected(x, y, dataUserChairs) ? "green" 
            : "#fff",
          border: '1px solid',
          margin: "0px 1px 3px 1px",
          cursor: 'pointer',
        }}
        onClick={() => {

          // was selected
          if (isSelected(x, y, dataChairsBooked)) {
            return false;
          } 
          
          // unselect
          if (isSelected(x, y, dataUserChairs)) {
            let removeSlected = 
              dataUserChairs
              .filter(item => item[0] !== x || item[1] !== y)

            setDataUserChairs(removeSlected);
            return true;
          }

          // select free chair
          let userBooked = [
            ...dataUserChairs,
            [x, y]
          ]
          setDataUserChairs(userBooked.slice(-number_chair))
        }}
      >{columnTitle[x] + "" + rowTitle[y]}</Button>
    )
  }

  const Matrix = () => {
    let matrix = [];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        
        if (j === Math.floor(column / 2)) {
          matrix.push(<span key={rowTitle[j]+i+j}>&nbsp;&nbsp;&nbsp;</span>)
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
  const { activeStep, classes, actions, dataUserChairs } = useContext(TicketContext)
  const [dataChairsBooked, setDataChairsBooked] = useState([]);
  let localState = JSON.parse(localStorage.getItem('localState'))

  // get all chairs was booked
  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem('localState'))

    if (localState) {
      let payload = {
        theater_id: localState.theater_id,
        showtime_id: localState.showtime_id
      }
      actions.GetChairsBooked(payload);
    }
  }, 
  []);
  useEffect(() => {
    const { chairs } = actions.ShowtimeCpanel;

    if (chairs) {
      const { arraylocation } = chairs.payload
      let beauLocation = FormatGetArrayLocation(arraylocation)

      setDataChairsBooked(beauLocation)
    }
  }, [actions.ShowtimeCpanel])

  // update number chair user want booked
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
              <Input
                type="number"
                inputProps={{ min: "1", max: "10", step: "1" }}
                placeholder={"Số lượng ghế"}
                className={classes.input}
                inputProps={{
                  'aria-label': 'Description',
                }}
                defaultValue={localState.number_chair || setNumberChair(1)}
                onChange={handleChangeNumberChair}
                endAdornment={<InputAdornment position="end">
                <IconButton className={classes.iconButton} aria-label="Search">
                  <SkipNext />
                </IconButton>
                </InputAdornment>}
              />
            </React.Fragment>
          )
      case 1:
          return (
              <ChairContext.Provider value={{
                number_chair: localState.number_chair,
                row: localState.number_row,
                column: localState.number_column,
                dataChairsBooked
                }}>
                  <Typography className={classes.screen}>Màn hình</Typography>
                  <GeneralChairsMap />
              </ChairContext.Provider>
          )
      case 2:
        return (
          <section className={classes.ticket_info}>
              <ul>
                <li><List />Tên phim: <span>{localState.movie_name}</span></li>
                <li><List />Khởi chiếu: <span>{localState.movie_opening_day}</span></li>
                <li><List />Rạp: <span>{localState.theater_name}</span></li>
                <li><List />Giá vé: <span>{localState.showtime_price}</span></li>
                <li><List />Ghế: <span>{dataUserChairs.length}</span></li>
                <li><List />Mã ghế: <span>{getListUserChair(dataUserChairs)}</span></li>
                <li><List />Tổng tiền: <span>{dataUserChairs.length * localState.showtime_price}</span>&nbsp;VNĐ</li>
              </ul>
          </section>
        )
      default:
        return 'Ủa lỗi gì vậy :(';
    }
  }
}

// General main content
const Ticket = (props) => {
  const { classes, actions } = props
  const [activeStep, setActiveStep] = React.useState(0);
  const [dataUserChairs, setDataUserChairs] = useState([]);
  const [alert, setAlert] = useState({
    count: 0,
    open: false,
    message: "",
    variant: "success"
})
  const [values, setValues] = useState({
    user_id: 0,
    showtime_id: 0,
    arraylocation: null
  })
  const steps = getSteps();
  let localState = JSON.parse(localStorage.getItem('localState'))

	// navigation
	useEffect(() => {
		if (!localState || !localState.user_id) {
			actions.history.push('/auth/login');
    }	
  }, []);

  useEffect(() => {
    const { ticket } = actions.ShowtimeCpanel
    if (ticket) {
      console.log(ticket)
    }
  }, [actions.ShowtimeCpanel])


	// steper controller
  function handleNext() {
    // send ticket data to server for next
    if (activeStep >= steps.length - 2) {
      
      if (dataUserChairs.length < 1) {
        setAlert({
          count: alert.count + 1,
          open: true,
          message: REQUIRE_MIN_CHAIR,
          variant: "error"
        })
        return false;
      }

      // done step, send to server
      if (activeStep >= steps.length - 1) {
        values.user_id = localState.user_id;
        values.showtime_id = localState.showtime_id
        values.arraylocation = FormatArraylocation(dataUserChairs)
  
        actions.Ticket(values)
      }
    }

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
      <Alert
        count={alert.count}
        open={alert.open}
        message={alert.message}
        variant={alert.variant}
      />
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
            <Typography className={classes.success}>Hoàn tất quá trình đặt vé</Typography>
            <Button onClick={handleReset}>Đặt thêm vé mới</Button>
          </div>
        ) : (
          <div>
            <section className={classes.instructions}>
              <TicketContext.Provider value={{
                actions,
                classes,
                activeStep,
                dataUserChairs,
                setDataUserChairs
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

