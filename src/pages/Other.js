import React, { Component } from 'react'

export default class Other extends Component {
    render() {
        return (
            <div>
                {this.props.location.pathname}
            </div>
        )
    }
}
