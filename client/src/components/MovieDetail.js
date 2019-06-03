import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Navbar from '../components/head/Navbar'

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
    cinemasDetail: {
        display: 'block',
    }
})

const MovieDetail = (props) => {
    const { actions, classes } = props
    const { ShowtimeCpanel } = actions
    const movie_id = actions.match.params.id;
    const [dataMovie, setDataMovie] = useState([])
    const [dataCinemas, setDataCinemas] = useState([])

    // Get showtimes by movie id
    useEffect(() => {
        actions.getShowTimesByMovie({ movie_id })
    }, [movie_id])

    useEffect(() => {
        if (ShowtimeCpanel.showtimes_movie) {
            console.log(ShowtimeCpanel.showtimes_movie.payload)

            const { movie, cinemas } = ShowtimeCpanel.showtimes_movie.payload
            setDataCinemas(cinemas)
            setDataMovie(movie)
        }
    }, [ShowtimeCpanel])

    // load area movie
    const loadMovieDetail = () => {

        return (
            <section className={classes.movieDetail}>
                <span className={classNames(classes.movieImage, classes.left)}>
                    <img src="/movie.jpg" alt="movie trailer" />
                </span>
                <span className={classNames(classes.movieDetailRight, classes.right)}>
                    <h3>{dataMovie.name}</h3>
                    <h6>{dataMovie.introduce}</h6>
                    <label>{dataMovie.opening_day}</label>
                    <label>{dataMovie.minute_time} phut</label>
                </span>
            </section>
        )
    }

    // load area cinemas
    const loadShowtimeDetail = () => {
        return (
            <section className={classes.cinemasDetail}>
                <span className={classNames(classes.cinemasContent, classes.left)}>
                    c
                </span>
                <span className={classNames(classes.cinemaMap, classes.right)}>
                    D
                </span>
            </section>
        )
    }

    const theaterArea = (theater) => {
        
    }

    const cinemaArea = (cinemas) => {
        
    }

    return (
        <section className={classes.root}>
            <Navbar />
            {dataMovie.id && loadMovieDetail()}
            {dataCinemas.length && loadShowtimeDetail()}
        </section>
    )
}

MovieDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default withStyles(styles)(MovieDetail)