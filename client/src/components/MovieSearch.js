import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Navbar from './head/Navbar'
import SimpleTextField from './helper/SimpleTextField'
import SimpleCard from './helper/SimpleCard'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa',
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#fafafa',
  },
})

// const lableDatas =
//   { id: 0, label: 'Cụp Rạp', name_id: 'cinema_id', name: 'cinema_name' };


const parseQueryString = (query) => {
  return query
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((x, y) => { x[y[0]] = y[1].replace("%20", " "); return x; }, {});
}

const Movie = (props) => {
  const { classes, actions } = props
  const { MovieCpanel } = actions
  const keyword = parseQueryString(actions.location.search).key;
  const [dataMovies, setDataMovies] = useState([]);

  // Search movie
  useEffect(() => {
    actions.Search(keyword)
  }, [keyword]);

  useEffect(() => {
    if (MovieCpanel.search) {
      const { movies } = MovieCpanel.search.payload
      setDataMovies(movies)
    }
  }, [MovieCpanel.search])

  // Handle search
  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value !== "") {
      actions.history.push("/movie/search?key=" + e.target.value);
    }
  }

  // Show result 
  const showMovies = () => {
    if (!dataMovies.length && MovieCpanel.search) {
      return (
        <p className={classes.container}>{"Không tìm thấy phim"}</p>
      )
    } else {
      return (
        <Grid container spacing={8} className={classes.container}>
          {dataMovies.map((movie) => {
            return (
              <Grid item sm={6} xs={6} md={4} lg={3} 
                key={movie.id} >
                <SimpleCard
                  label={movie}
                />
              </Grid>
           )
          })}
        </Grid>
      )
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <SimpleTextField
        label="Tìm suất chiếu của phim"
        handleSearch={handleSearch}
        value={keyword}
      />

      <section className={classes.root} spacing={8}>
        {keyword && showMovies()}
      </section>
    </React.Fragment>
  )
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default withStyles(styles)(Movie)