import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SimpleSelect from './helper/SimpleSelect'
import SmallButton from './helper/SmallButton'
import Navbar from './head/Navbar'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Timelapse from '@material-ui/icons/Timelapse'
import { NavLink } from 'react-router-dom'



const styles = theme => ({
  root: {
    // width: '100%',
    margin: '0px 10%',
    backgroundColor: '#fafafa',
    borderRadius: '14px',
    border: '1px solid #fafbfc'
  },
  paper: {
    width: "100%",
  },
  inline: {
    display: 'inline',
  },
  smallicon: {
    marginTop: "10px"
  },
  smallbtn: {
    margin: "15px 0px 0px 0px",
    bottom: 0,
  },
  itemList: {
    display: 'inline-block',
    position: 'relative',

    "& a": {
      textDecoration: "none",
      color: '#0c0c0c'
    },
    "& a:hover": {
      color: "#ff0000"
    }
  },
  imgLeft: {
    width: "100%",
    height: '250px',
  },
  divider: {
    marginTop: '10px'
  },
  itemIcon: {
    display: "inline-block",
    padding: '5px 0px',
    fontWeight: '600',
    color: '#999999'
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
    setDataShowtime([])

    actions.ShowtimesByTheater(values)
  }, [values])

  // set showtimes data[]
  useEffect(() => {
    if (ShowtimeCpanel.showtimes_theater) {
      const { theater } = ShowtimeCpanel.showtimes_theater.payload

      setDataShowtime(theater)
    }
  }, [ShowtimeCpanel])

  // Onchange value (theater,...)
  const handleChangeValues = (e) => {
    const { name, value } = e.target
    setValues((values) => ({ ...values, [name]: value }))
  }

  const getShowtimeByMovie = movie => {
    return movie.showtimes.map((showtime) => {
      return (
        <SmallButton
          key={showtime.id}
          id={showtime.id}
          text={showtime.start_time.split(" ")[1]} />
      )
    })
  }

  // load Movies
  const loadMovies = (dataShowtime) => {
    if (dataShowtime.movies.length) {
      return (
        <List className={classes.root}>
          {dataShowtime.movies.map((movie) => {
            if (movie.showtimes.length) {
              return (
                <ListItem alignItems="flex-start" key={movie.id} className={classes.itemList}>
                  <Grid container spacing={8}>
                    <Grid item sm={12} xs={12} md={4} lg={4}>
                      <img alt="Remy Sharp" src="/movie.jpg" className={classes.imgLeft} />
                    </Grid>

                    <Grid item sm={12} xs={12} md={8} lg={8}>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="h5"
                              color="textPrimary"
                            >
                              <NavLink to={`/movie/detail/${movie.id}`}>{movie.name}</NavLink>
                            </Typography>
                            <Typography
                              component="span"
                              variant="subheading"
                              color="textPrimary"
                              className={classes.inline}
                            >
                            <span className={classes.itemIcon}>
                               <Timelapse className={classes.smallicon} /> {movie.minute_time + " phút"}
                               {" — " + movie.introduce.slice(0, 100)}
                            </span>
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <span className={classes.smallbtn}>
                        {getShowtimeByMovie(movie)}
                      </span>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                </ListItem>
              )
            }
          })}
        </List>
      )
    } else {
      return (
        <p>Không tìm thấy phim và suất chiếu trong rạp {dataShowtime.name}</p>
      )
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <SimpleSelect
        handleChange={handleChangeValues}
        dataCombobox={dataTheater}
        values={values}
        setValues={setValues}
        defaultValue={values.theater_id}
        label={lableDatas}
      />
      <section>
        {dataShowtime.id && loadMovies(dataShowtime)}
      </section>


    </React.Fragment>
  )
}

Theater.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Theater)