import React, {Fragment} from 'react'
import {WebMercatorViewport} from '@deck.gl/core';
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import AltitudeChart from "../../Cards/Journal/Altitude/AltitudeChart";
import Frame from "../../Cards/Common/Frame";
import {GridList, GridListTile, GridListTileBar, IconButton} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const GET_EXTRA = gql`
query($x1 : numeric, $y1 : numeric,$x2 : numeric, $y2 : numeric) {
 search_media(args: {x1: $x1, x2: $x2, y1: $y1, y2: $y2}) {
    id
    json
    location
    type
  }
}
`

export default ({viewState, handleSelectPhoto}) => {

    const viewport = new WebMercatorViewport({...viewState, height : 400, width : 400});

    const nw = viewport.unproject([0, 0], {topLeft : true});
    const se = viewport.unproject([viewport.width, viewport.height], {topLeft : true});

    console.log(nw);
    console.log(se);

    return <Fragment>


            <Query query={GET_EXTRA} variables={{x1 : nw[0], y1 : nw[1], x2: se[0], y2 : se[1]}} >
                {({ loading, error, data  }) => {

                    if (loading) return null;

                  return <Fragment>
                      {data.search_media.map((photoItem, index) => (
                          <GridListTile key={index} onClick={handleSelectPhoto(photoItem)}>
                              <img src={ `https://res.cloudinary.com/db8uwhsbg/image/upload/c_thumb,g_face,h_250,w_250/${photoItem.json.public_id}.jpg` } alt="photos" style={{width: '250px', height : 'auto'}}/>
                              <GridListTileBar
                                  title={'Photo ID' + photoItem.json.public_id}
                                  actionIcon={
                                      true ? (
                                          <IconButton color="primary">
                                              <CheckCircleIcon />
                                          </IconButton>
                                      ) : null
                                  }
                              />
                          </GridListTile>
                      ))}
                       </Fragment>
                }}

            </Query>

        </Fragment>
}
