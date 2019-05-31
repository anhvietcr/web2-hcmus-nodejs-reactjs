import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    backgroundColor: '#ccc'
  }
})

const parseQueryString = (query) => {
  return query
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((x, y) => { x[y[0]] = y[1].replace("%20", " "); return x; }, {});
}

const Movie = (props) => {
  const { classes, actions, location } = props
  const { MovieCpanel, CinemaCpanel } = actions
  const keyword = parseQueryString(actions.location.search).key;
  const [dataMovies, setDataMovies] = useState([]);
  const [dataCinemas, setDataCinemas] = useState([]);


  // Search movie
  useEffect(() => {
    actions.Search(keyword)
    actions.ListCinema();
  }, []);
  useEffect(() => {
    if (MovieCpanel.search) {
      const { movies } = MovieCpanel.search.payload
      setDataMovies(movies)

      console.log(MovieCpanel.search)
    }
  }, [MovieCpanel])
  useEffect(() => {
    if (dataMovies.length && CinemaCpanel.cinemas) {
      const { cinemas } = CinemaCpanel;
      setDataCinemas(cinemas)

      console.log(cinemas)
    }
  }, [dataMovies, CinemaCpanel])



  return (
    <p className={classes.root}>{keyword}</p>
  )
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default withStyles(styles)(Movie)