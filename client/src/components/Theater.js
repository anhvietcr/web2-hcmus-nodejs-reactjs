import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SimpleSelect from './helper/SimpleSelect'
import CustomDatePicker from './helper/DatePicker'
import Navbar from './head/Navbar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    width: "100%",
  }
})

const lableDatas =
  { id: 0, label: 'Tên Rạp', name_id: 'theater_id', name: 'theater_name' };

const Theater = (props) => {
  const { classes, actions } = props;
  const { TheaterCpanel, ShowtimeCpanel } = actions
  const [dataTheater, setDataTheater] = useState([])
  const [dataShowtime, setDataShowtime] = useState([])
  const [values, setValues] = useState({
    date: '2019-06-01',
    theater_id: 0
  });

  // default actions
  useEffect(() => {
    actions.ListTheater()
  }, [])

  // default values combobox
  useEffect(() => {
    if (TheaterCpanel.theaters) {
      setDataTheater(TheaterCpanel.theaters);

      setValues({
        date: "2019-06-01",
        theater_id: TheaterCpanel.theaters[0].id
      });
    }
  }, [TheaterCpanel])
   
  // get showtime by theater id || time
  useEffect(() => {
    actions.ShowtimesByTheater(values)
  }, [values])

  useEffect(() => {
    if (ShowtimeCpanel.showtimes_theater) {
      const { theater } = ShowtimeCpanel.showtimes_theater.payload

      setDataShowtime(theater)
    }
  }, [ShowtimeCpanel])

  const handleChangeValues = (e) => {
    const { name, value } = e.target
    setValues((values) => ({ ...values, [name]: value }))
  }

  const loadShowTimes = (dataShowtime) => {
    if (dataShowtime.showtimes.length) {

      console.log(dataShowtime)

      dataShowtime.showtimes.map((movie) => {
        console.log(movie)
      })
    }
  }

  return (
    <React.Fragment>
      <Navbar />

      <Grid container spacing={8} className={classes.root}>
        <Grid item xs={6} md={6} lg={6}>
          <CustomDatePicker
            handleChange={handleChangeValues} />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <SimpleSelect
            handleChange={handleChangeValues}
            dataCombobox={dataTheater}
            values={values}
            setValues={setValues}
            defaultValue={values.theater_id}
            label={lableDatas}
          />
        </Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item xs={12} md={12} lg={12}>

        </Grid>
      </Grid>




      {dataShowtime.showtimes && loadShowTimes(dataShowtime)}

    </React.Fragment>
  )
}

Theater.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Theater)