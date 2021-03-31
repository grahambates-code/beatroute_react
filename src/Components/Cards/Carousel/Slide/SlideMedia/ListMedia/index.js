import React, {Fragment, useState} from 'react';
import './index.less'
import Query from './Query'
import "wired-elements";
import Modal from 'react-modal';
import {WebMercatorViewport} from '@deck.gl/core';
import * as turf from "@turf/turf";

export default ({slide, viewState}) => {

    const [modalIsOpen,setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const viewport  = new WebMercatorViewport(viewState);
    const center    = viewport.unproject([viewport.width/2,viewport.width/2], {topLeft : true})
    const pointB    = { scale : 1, rotation : 1,position : turf.featureCollection([turf.point(center)])};

    return <Fragment>

         <button onClick={openModal}>Open Modal</button>

         <Modal
             isOpen={modalIsOpen}
             onRequestClose={closeModal}
             style={{
                 content : {
                     top                   : '50%',
                     left                  : '50%',
                     right                 : 'auto',
                     bottom                : 'auto',
                     marginRight           : '-50%',
                     transform             : 'translate(-50%, -50%)'
                 }
             }}
         >

             <button onClick={closeModal}>close</button>

             <Query slide={slide} closeModal={closeModal} pointB={ pointB }/>

         </Modal>

     </Fragment>
}
