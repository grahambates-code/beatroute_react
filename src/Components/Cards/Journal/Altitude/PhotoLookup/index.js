import React, {Fragment} from 'react'
import {WebMercatorViewport} from '@deck.gl/core';
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import AltitudeChart from "../AltitudeChart";
import Frame from "../../../Common/Frame";

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

export default ({viewState, children}) => {

    const viewport = new WebMercatorViewport({...viewState, height : 400, width : 400});

    const nw = viewport.unproject([0, 0], {topLeft : true});
    const se = viewport.unproject([viewport.width, viewport.height], {topLeft : true});

    console.log(nw);
    console.log(se);

    return <Fragment>


            <Query query={GET_EXTRA} variables={{x1 : nw[0], y1 : nw[1], x2: se[0], y2 : se[1]}} >
                {({ loading, error, data  }) => {



                  return <Fragment>
                      {React.cloneElement(children, { media: data.search_media })} </Fragment>
                }}

            </Query>

        </Fragment>
}
