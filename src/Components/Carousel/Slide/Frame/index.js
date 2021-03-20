import React, {useState, useEffect} from 'react'
import './index.less'
import {Mutation} from "react-apollo";
import Create from './../../Create'
import gql from "graphql-tag";
import {Slider} from 'antd';
import AddGPSSaver from "../../../Cards/Front/AddGPS/saver";
import AddGPS from "../../../Cards/Front/AddGPS";
import AddPhoto from '../SlideMedia/AddMedia'
import RemovePhoto from '../SlideMedia/RemoveMedia'
import ListMedia from '../SlideMedia/ListMedia'
import DeleteSlide from '../SlideMedia/DeleteSlide'
import AdjustRotation from '../SlideMedia/AdjustRotation'
import EditText from '../SlideMedia/EditText'
import AddAsset from '../SlideMedia/AddAsset'

export default ({setLocked, card, slide, refetch, slideIndex, setSlideIndex, viewState,slidePhotoRotation, setSlidePhotoRotation}) => {

    const [edit, setEdit] = useState(false);

    return <div className={'slide'} >

        {!edit && slide.data?.text}

        {edit && <EditText slideIndex={slideIndex} edit={edit} slide={slide} refetch={refetch} setSlideIndex={setSlideIndex}/> }

        <DeleteSlide slide={slide} refetch={refetch}/>

        <AddAsset slide={slide} refetch={refetch} viewState={viewState} type={'/textures/arrow2.glb'}/>

        <br/>

        <AdjustRotation setLocked={setLocked} slidePhotoRotation={slidePhotoRotation} setSlidePhotoRotation={setSlidePhotoRotation} slide={slide} refetch={refetch}/>

        <button onClick={() => setEdit(true)}>Edit</button>

        {slideIndex + 1  === card.slides.length && <Create card={card} refetch={refetch} slideIndex={slideIndex} setSlideIndex={setSlideIndex}/> }

        <AddGPSSaver refetch={refetch} >
            {(updateTripGeojson, {loading, error}) => <AddGPS card={card} updateTripGeojson={updateTripGeojson}/> }
        </AddGPSSaver>

        {/*<AddPhoto slide={slide} refetch={refetch} viewState={viewState}/>*/}

        {/*<RemovePhoto slide={slide} refetch={refetch} viewState={viewState}/>*/}

        {viewState && <ListMedia slide={slide} refetch={refetch} viewState={viewState} /> }

        <br/>



    </div>

}
