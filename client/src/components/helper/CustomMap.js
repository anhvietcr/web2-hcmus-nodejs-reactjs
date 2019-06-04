import React from 'react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        backgroundColor: '#fff',
        width: "100%",
        height: '400'
    }
})

const CustomMap = (props) => {
    const {
        classes,
        lat,
        lng,
    } = props

    return (
        <Map center={[lat, lng]} zoom={15} className={classes.root} height={400}>
            <Marker anchor={[lat, lng]} payload={1} />

            <Overlay anchor={[lat, lng]} offset={[120, 79]}>
            </Overlay>
        </Map>
    )
}

export default withStyles(styles)(CustomMap);