import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Navbar from '../components/head/Navbar'
import SimpleSelect from './helper/SimpleSelect'
import CustomMap from './helper/CustomMap'
import SmallButton from './helper/SmallButton'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Timelapse from '@material-ui/icons/Timelapse'
import Typography from '@material-ui/core/Typography'
import AttachMoney from '@material-ui/icons/AttachMoney'
import Description from '@material-ui/icons/Description'
import DateRange from '@material-ui/icons/DateRange'

const styles = theme => ({
  root: {
    backgroundColor: '#f5f6f7',
  },
  movieDetail: {
    display: 'block',
    position: 'relative',
  },
  movieContent: {
    listStyleType: 'none',
    textAlign: 'left',
    padding: "0px 10px 10px 10px",
    borderLeft: "5px solid #959595",
    marginLeft: 5,

    "& li": {
      padding: '5px 10px',
      fontSize: 20,
      fontWeight: 500,
      minHeight: 60,

      "& h2": {
        color: '#000',
        textTransform: 'uppercase',
        padding: 0,
        margin: 0,
      }
    },
  },
  smallbtn: {
    margin: "15px 0px 0px 0px",
    bottom: 0,
  },
  inline: {
    display: 'inline',
  },
  divider: {
    margin: '5px'
  },
  theaterStyle: {
    marginRight: 5
  },
  itemList: {
    display: 'inline-block',
    position: 'relative',
    borderLeft: "3px solid #959595",
    backgroundColor: "#f5f6f7",
    boxShadow: "0px 1px 3px 0px #bec1db",

  },
  imgLeft: {
    width: "100%",
    height: '250px',
  },
  moviePoster: {
    width: '100%',
    height: '490px'
  },
  cinemaArea: {
    borderLeft: '1px dotted #959595',
    backgroundColor: '#f5f6f7'
  },
  theaterNameHighline: {
    backgroundColor: '#ff6060de',
    borderLeft: '5px solid #959595',
    width: 'fit-content',
    padding: '5px 20px',
    borderRadius: 5,
    minWidth: '320px',
  },
  showtimeTitleHighline: {
    backgroundColor: '#eec07b',
    borderLeft: '5px solid #000',
    width: 'fit-content',
    padding: '5px 20px',
    width: 120,
    padding: "15px 5px",
    borderLeft: "5px solid #959595",
    display: "inline-flex",
    marginTop: 5,
    borderRadius: 5,
  },
  itemIcon: {
    display: "flex",
    padding: '5px 0px',
    fontWeight: '600',
    color: '#999999'
  },
  centerHead: {
    margin: '0 5px'
  }
})

const MovieDetail = (props) => {
  const { actions, classes } = props
  const { ShowtimeCpanel, CinemaCpanel } = actions
  const movie_id = actions.match.params.id;
  const [dataMovie, setDataMovie] = useState([])
  const [dataCinemas, setDataCinemas] = useState([])
  const [comboboxId, setComboboxId] = useState(0)
  const [latlng, setLatlng] = useState({
    lat: 0,
    lng: 0
  })

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

  // preload combobox
  useEffect(() => {
    if (dataCinemas.length) {
      const { id, address } = dataCinemas[0]

      setComboboxId(id)
      getLatLng(address)
    }

  }, [dataCinemas])

  const getLatLng = (address) => {
    actions.getLatLng(address)
  }

  useEffect(() => {
    if (CinemaCpanel.latlng) {
      if (CinemaCpanel.latlng.results.length) {
        const { lat, lng } = CinemaCpanel.latlng.results[0].geometry
        setLatlng({
          lat,
          lng
        })
      }
    }
  }, [CinemaCpanel])

  // load area movie
  const movieDetailArea = () => {
    
    // save to localstorage
    let localState = JSON.parse(localStorage.getItem('localState'))
    if (localState) {
      let info = {
        ...localState,
        movie_name: dataMovie.name,
        movie_id: dataMovie.id,
        movie_opening_day: dataMovie.opening_day,
        showtime_id: 0,
        showtime_price: 0,
        theater_name: "",
        theater_id: 0,
      }
      localStorage.setItem('localState', JSON.stringify(info));
    }

    let poster = null;
    if (dataMovie.trailer) {
      poster = <iframe className={classes.moviePoster} src={dataMovie.trailer}></iframe>
    } else {
      poster = <img className={classes.moviePoster} src={dataMovie.image} alt="poster" />
    }
    return (
      <React.Fragment>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <section className={classes.centerHead}>
            {poster}
          </section>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <ul className={classes.movieContent}>
            <li><h2>{dataMovie.name}</h2></li>
            <li><DateRange className={classes.smallbtn} /><label>Ngày khởi chiếu: </label>{dataMovie.opening_day}</li>
            <li><Timelapse className={classes.smallicon} /><label>Thời gian: </label>{dataMovie.minute_time} phút</li>
            <li><Description className={classes.smallbtn} /><label>Giới thiệu: </label>{dataMovie.introduce}</li>
          </ul>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          {theaterArea(comboboxId)}
        </Grid>
      </React.Fragment>
    )
  }

  const handleShowtimeClicked = (e) => {
    const price = e.currentTarget.getAttribute('price')
    const number_column = e.currentTarget.getAttribute('number_column')
    const number_row = e.currentTarget.getAttribute('number_row')
    const theater_name = e.currentTarget.getAttribute('theater_name')
    const theater_id = e.currentTarget.getAttribute('theater_id')

    // save to localstorage
    let localState = JSON.parse(localStorage.getItem('localState'))
    if (localState) {
      let info = {
        ...localState,
        number_column: number_column,
        number_row: number_row,
        theater_name: theater_name,
        theater_id: theater_id,
        showtime_price: price,
        showtime_id: e.currentTarget.id
      }
      localStorage.setItem('localState', JSON.stringify(info));
    }
  }

  const getShowtimes = theater => {
    return theater.showtimes.map((showtime) => {
      return (
        <SmallButton
          theater_name={theater.name}
          theater_id={theater.id}
          number_column={theater.number_column}
          number_row={theater.number_row}
          price={showtime.price}
          handleSubmit={handleShowtimeClicked}
          key={showtime.id}
          id={showtime.id}
          text={showtime.start_time.split(" ")[1]} />
      )
    })
  }

  const cinemaMap = () => {
    if (!comboboxId) {
      return (
        <label></label>
      )
    } else {
      return (
        <CustomMap
          lat={latlng.lat}
          lng={latlng.lng}
        />
      )
    }
  }

  const cinemaCombobox = () => {
    if (!comboboxId) {
      return (
        <p>Không tìm thấy cụm rạp.</p>
      )
    } else {
      return (
        <div className={classes.cinemaArea}>
          <SimpleSelect
            label={{
              label: 'Cụm Rạp',
              name_id: 'cinema_id'
            }}
            defaultValue={comboboxId}
            dataCombobox={dataCinemas}
            handleChange={handleChangeCombobox}
          />
        </div>
      )
    }
  }
  const handleChangeCombobox = (e) => {
    const { value } = e.target

    // valid combobox value
    if (comboboxId === value) return;

    // selected combobox
    setComboboxId(value);

    // get lat, lng from address
    let cinema = dataCinemas.filter(cinema => cinema.id === value)[0] || null;
    actions.getLatLng(cinema.address)
  }

  const theaterArea = (cinema_id) => {
    let cinema = dataCinemas.filter((cinema) => {
      return cinema.id === cinema_id
    })[0];

    if (typeof cinema === 'undefined' || !dataCinemas.length) {
      return (
        <p>Không tìm thấy suất chiếu trong rạp</p>
      )
    }

    const { theaters } = cinema;
    return (
      <React.Fragment>
        {cinemaCombobox()}
        <List className={classes.theaterStyle}>
          {
            theaters.map((theater) => {
              return (
                <ListItem alignItems="flex-start" key={theater.id} className={classes.itemList}>
                  <Grid container>
                    <Grid item sm={12} xs={12} md={12} lg={12}>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="h5"
                              color="textPrimary"
                              className={classes.theaterNameHighline}
                            >
                              {theater.name}
                            </Typography>
                            <Typography
                              component="span"
                              variant="subheading"
                              color="textPrimary"
                              className={classes.inline}
                            >
                            <span className={classes.itemIcon}>
                              <AttachMoney className={classes.smallicon} /> {theater.showtimes[0].price + " VND"}
                              {" — " + theater.type}
                            </span>
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <span className={classes.smallbtn}>
                        <Typography
                          component="span"
                          variant="h5"
                          color="textPrimary"
                          className={classes.showtimeTitleHighline}
                        >
                          {"Suất chiếu"}
                        </Typography>
                        {getShowtimes(theater)}
                      </span>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                </ListItem>
              )
            })}
        </List>
        
      </React.Fragment>
    )
  }

  return (
    <section className={classes.root}>
      <Navbar />
      <Grid container>
        {dataMovie.id && movieDetailArea()}
    
        {cinemaMap()}
      </Grid>
    </section>
  )
}

MovieDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default withStyles(styles)(MovieDetail)