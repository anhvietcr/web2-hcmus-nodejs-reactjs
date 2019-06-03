import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Navbar from '../components/head/Navbar'
import SimpleSelect from './helper/SimpleSelect'
import SmallButton from './helper/SmallButton'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Timelapse from '@material-ui/icons/Timelapse'

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa'
  },
  left: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  right: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  movieDetail: {
    display: 'block',
    backgroundColor: '#ccc',
    position: 'relative'
  },
  smallbtn: {
    margin: "15px 0px 0px 0px",
    bottom: 0,
  },
  inline: {
    display: 'inline',
  },
  divider: {
    marginTop: '10px'
  },
  list: {
    display: 'inline-block',
    position: 'relative',
  },
  imgLeft: {
    width: "100%",
    height: '250px',
  },
})

const MovieDetail = (props) => {
  const { actions, classes } = props
  const { ShowtimeCpanel } = actions
  const movie_id = actions.match.params.id;
  const [dataMovie, setDataMovie] = useState([])
  const [dataCinemas, setDataCinemas] = useState([])
  const [comboboxId, setComboboxId] = useState(0)

  // Get showtimes by movie id
  useEffect(() => {
    actions.getShowTimesByMovie({ movie_id })
  }, [movie_id])

  useEffect(() => {
    if (ShowtimeCpanel.showtimes_movie) {
      const { movie, cinemas } = ShowtimeCpanel.showtimes_movie.payload
      setDataCinemas(cinemas)
      setDataMovie(movie)
    }
  }, [ShowtimeCpanel])

  // load area movie
  const movieDetailArea = () => {
    return (
      <React.Fragment>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <img src="/movie.jpg" alt="movie trailer" />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <h3>{dataMovie.name}</h3>
          <h6>{dataMovie.introduce}</h6>
          <label>{dataMovie.opening_day}</label>
          <label>{dataMovie.minute_time} phut</label>
        </Grid>
      </React.Fragment>
    )
  }

  const getShowtimes = showtimes => {
    return showtimes.map((showtime) => {
      return (
        <SmallButton
          key={showtime.id}
          id={showtime.id}
          text={showtime.start_time.split(" ")[1]} />
      )
    })
  }

  const cinemaCombobox = () => {

      return (
        <SimpleSelect
          label={{
            label: 'Cum Rap',
            name_id: 'cinema_id'
          }}
          defaultValue={comboboxId}
          dataCombobox={dataCinemas}
          handleChange={handleChangeCombobox}
        />
      )
  }
  const handleChangeCombobox = (e) => {
    console.log(e.target.value)
    setComboboxId(e.target.value)
  }

  // load area cinemas
  const mainArea = () => {
    return (
      <React.Fragment>
        <Grid item sm={12} xs={12} md={6} lg={6}>
          {theaterArea(1)}
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={6}>
          {cinemaArea(1)}
        </Grid>
      </React.Fragment>
    )
  }

  const theaterArea = (cinema_id) => {
    let cinema = dataCinemas.filter((cinema) => {
      return cinema.id === cinema_id
    })[0];

    if (typeof cinema === 'undefined' || !dataCinemas.length) {
      return (
        <p>Khong tim thay suat chieu trong cum rap</p>
      )
    }

    const { theaters } = cinema;
    return (
      <List className={classes.root}>
        {
          theaters.map((theater) => {
            return (
              <ListItem alignItems="flex-start" key={theater.id} className={classes.list}>
                <Grid container spacing={8}>
                  <Grid item sm={12} xs={12} md={12} lg={12}>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="h5"
                            color="textPrimary"
                          >
                            {theater.name}
                          </Typography>
                          <Typography
                            component="span"
                            variant="subheading"
                            color="textPrimary"
                            className={classes.inline}
                          >
                            <Timelapse className={classes.smallicon} /> {dataMovie.minute_time + " phút"}
                          </Typography>
                          {" — " + theater.type}
                        </React.Fragment>
                      }
                    />
                    <span className={classes.smallbtn}>
                      {getShowtimes(theater.showtimes)}
                    </span>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
              </ListItem>
            )
          })}
      </List>
    )
  }

  const cinemaArea = (cinema_id) => {
    return (
      <Grid container spacing={8}>
        <Grid item sm={12} xs={12} md={12} lg={12}>
          {dataCinemas.length && cinemaCombobox()}
        </Grid>
        <Grid item sm={12} xs={12} md={12} lg={12}>
          <p>Cinema map</p>
        </Grid>
      </Grid>
    )
  }

  return (
    <section className={classes.root}>
      <Navbar />
      <Grid container spacing={8}>
        {dataMovie.id && movieDetailArea()}
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={8}>
        {mainArea()}
      </Grid>
    </section>
  )
}

MovieDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default withStyles(styles)(MovieDetail)