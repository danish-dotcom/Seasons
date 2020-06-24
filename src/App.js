import React, { Component } from 'react'
import { getByDisplayValue } from '@testing-library/react'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            err: "",
            lat: null,
            month: null
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
        if (!this.state.lat && this.state.err) {
            return (<p className="px-2 pt-4 text-danger">Error: {this.state.err}</p>)
        } else if (!this.state.month) {
            return (<p className="px-2 pt-4 text-danger">Error: Month Cannot be Determined</p>)
        } else{
            return (<p className="px-2 pt-4 text-success">{this.getSeason()}</p>) 
        }
    }

    getSeason() {
        if (this.state.lat > 0) {
            if (this.state.month > 9 && this.state.month <2) {
                return "Winter"
            } else {
                return "Summer"
            }
        } else if (this.state.lat < 0) {
            if (this.state.month > 2 && this.state.month <9) {
                return "Winter"
            } else {
                return "Summer"
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
