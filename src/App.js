import React, { Component } from 'react'

import Season from './Season'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            err: "",
            lat: null,
            month: null,
        }
    }

    componentDidMount() {
        // get latitude
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ lat: position.coords.latitude })
            },
            error => {
                this.setState({ err: error.message })
            }
        )

        // get month
        this.setState({ month: (new Date()).getMonth() });
    }

    getDisplay() {
        if (!this.state.lat && !this.state.err) {
            return (<div className="spinner-border ml-5 mt-3" role="status"></div>)
        } else if (this.state.err) {
            return (<p className="px-2 pt-4 text-danger">Error: {this.state.err}</p>)
        } else if (!this.state.month) {
            return (<p className="px-2 pt-4 text-danger">Error: Month Cannot be Determined</p>)
        } else {
            return(<Season season={this.getSeason}></Season>)
        }
    }

    getSeason() {
        if (this.state.lat > 0) {
            if (this.state.month > 9 && this.state.month < 2) {
                return 'winter'
            } else {
                return 'summer'
            }
        } else if (this.state.lat < 0) {
            if (this.state.month > 2 && this.state.month < 9) {
                return 'winter'
            } else {
                return 'summer'
            }
        }
    }

    render() {
        return (
            <div className="mx-3">
                <h1 className="display-1">Seasons</h1>                
                {this.getDisplay()}
            </div>
        )
    }
}
