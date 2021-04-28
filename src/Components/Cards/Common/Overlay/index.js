import React, { Component } from 'react';
import { Card } from 'antd';

import './index.less';
import { Box } from '@material-ui/core';

class Overlay extends Component {
    state = {};

    render() {
        return (
            <div className="Overlay">
                <Box marginBottom={2} display="flex" alignItems="center" justifyContent="space-between">
                    <div className="title">
                        <pre>{this.props.card.id + ' ' + this.props.card.type}</pre>
                    </div>
                    <div className="button">{this.props.button}</div>
                </Box>
                <div className="card">{this.props.children}</div>
            </div>
        );
    }
}

export default Overlay;
