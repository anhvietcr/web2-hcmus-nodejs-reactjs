import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'

const styles = theme => ({
    root: {
        backgroundColor: '#fff',
        listStyleType: 'none',
        display: 'flex',
        fontSize: '18px',
        padding: '0',
        margin: '0',

        "& li": {
            padding: '10px',
            border: '1px solid #eee',
            width: '100%',
            minWidthL: '50px',
            "& > *": {
                textDecoration: 'none',
                color: '#000',
            }
        },
        "& li:hover": {
            backgroundColor: '#eee',
            cursor: 'pointer',
            color: '#fcfcfc'
        },
    }
})

const Navbar = (props) => {
    const { classes } = props

    return (
        <ul className="nav" className={classes.root}>
            <li><NavLink to="/user">User</NavLink></li>
            <li><NavLink to="/cpanel">Cpanel</NavLink></li>
            <li><Link to="/">Home</Link></li>
        </ul>
    )
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar);