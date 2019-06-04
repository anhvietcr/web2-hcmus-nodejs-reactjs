import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const styles = theme => ({
    root: {
        backgroundColor: '#fff',
        listStyleType: 'none',
        display: 'flex',
        fontSize: '18px',
        padding: '0',
        margin: '0',
        fontSize: '15px',
        fontWeight: 600,
        
        "& a": {
            padding: '10px',
            border: '1px solid #eee',
            width: '100%',
            minWidthL: '50px',
            textDecoration: 'none',
            color: '#000',
            textTransform: 'uppercase',
        },
        "& a:hover": {
            backgroundColor: '#fafafa',
            cursor: 'pointer',
            color: 'rgba(255, 0, 0, 0.7);'
        },
    }
})

const Navbar = (props) => {
    const { classes } = props

    return (
        <ul className="nav" className={classes.root}>
            <NavLink to="/">Trang chủ</NavLink>
            <NavLink to="/theater">Rạp/Suất chiếu</NavLink>
            <NavLink to="/cpanel">Cpanel</NavLink>
        </ul>
    )
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar);