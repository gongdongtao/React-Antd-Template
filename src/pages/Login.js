import React, { Component } from 'react';
import { Button } from 'antd';

export default class Login extends Component {
    render() {
        return (
            <div>
                Login<Button type="primary" onClick={() => this.props.history.push('/')}>进入主界面</Button>
            </div>
        )
    }
}
