import React, {useState, useEffect} from 'react'
import Rect from './Rect'
import './index.less'

export default ({width=400, height=200, children}) => {

    return <div className={'overlay'}>
        {children}
    </div>

}
