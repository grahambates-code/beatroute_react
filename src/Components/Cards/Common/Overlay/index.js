import React, { Component } from 'react';
import {Card} from 'antd';

import './index.less';

class Overlay extends Component {

    state = {};

    render() {
      return (
        <div className={'Overlay'}>

            <div className={'button'}>
                {this.props.button}
            </div>

            <div className={'card'} >
                    {this.props.children}
            </div>

        </div>
      );
    }
}

export default Overlay;
