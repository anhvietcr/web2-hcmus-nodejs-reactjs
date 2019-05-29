import React, {Component} from 'react'
import * as TYPE from '../constants/actionTypes'
import { connect } from 'react-redux'
import Theater from '../components/Theater'

class TheaterContainer extends Component {
    render() {
        return (
            <Theater actions={this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    const { TheaterCpanel, ShowtimeCpanel } = state
    return {
        TheaterCpanel,
        ShowtimeCpanel
    }
}

const mapDispatchToProps = (dispatch) => ({
    ListTheater: () => {dispatch({type: TYPE.THEATER_LIST})},
    ShowtimesByTheater: (payload) => {dispatch({type: TYPE.SHOWTIME_BY_THEATER, payload})}
})

export default connect(mapStateToProps, mapDispatchToProps)(TheaterContainer)