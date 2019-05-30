import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SimpleSelect from './helper/SimpleSelect'
import CustomDatePicker from './helper/DatePicker'
import Navbar from './head/Navbar'

const styles = theme => ({
  root: {
    backgroundColor: "#ccc"
  }
})

const lableDatas = 
  { id: 0, label: 'Tên Rạp', name_id: 'theater_id', name: 'theater_name'};

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

  // HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE <<----
  const showShowTimes = (dataShowtime) => {
    dataShowtime.movies.map((movie) => {
        console.log(movie)
    })
  }

  return (
    <React.Fragment>
      <Navbar />
      <CustomDatePicker
        handleChange={handleChangeValues} />

      <SimpleSelect
        handleChange={handleChangeValues}
        dataCombobox={dataTheater}
        values={values}
        setValues={setValues}
        defaultValue={values.theater_id}
        label={lableDatas}
      />

      {dataShowtime.movies && showShowTimes(dataShowtime)}

    </React.Fragment>
  )
}

Theater.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Theater)