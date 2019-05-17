import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as TYPE from '../constants/actionTypes'
import Home from '../components/Home'

class HomeContainer extends Component {

    render() {
        console.log("current data: ", this.props.QuanLyVe)

        return (
            <Home actions={this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const { QuanLyVe } = state;

    return {
        QuanLyVe
    }
}

const mapDispatchToProps = (dispatch) => ({
    Datve: (data) => { dispatch({type: TYPE.DAT_VE, data})}        
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)