import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Navbar from './head/Navbar'

const styles = theme => ({
	root: {
		backgroundColor: 'red'
	}
})

const Ticket = (props) => {
	const { classes, actions } = props
	
	useEffect(() => {

		let localState = localStorage.getItem('localState')
		localState = JSON.parse(localState);

		if (!localState || !localState.user_id) {
			actions.history.push('/auth/login');
		}
		
	}, []);


	return (
		<React.Fragment>
			<Navbar />
			<div className={classes.root}>
				<p className={classes.root}>{actions.match.params.id}</p>
			</div>
		</React.Fragment>
	)
}

Ticket.propTypes = {
	classes: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
}

export default withStyles(styles)(Ticket)

