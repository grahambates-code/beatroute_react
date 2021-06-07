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

    const viewport = new WebMercatorViewport(viewState);

    const nw = viewport.unproject([0, 0]);
    const se = viewport.unproject([viewport.width, viewport.height]);

    return <Fragment>

        <pre>{JSON.stringify([nw,se])}</pre>

            <Query query={GET_EXTRA} variables={{x1 : 1, y1 : 1, x2: 2, y2 : 2}} >
                {({ loading, error, data  }) => {

                    if (loading || !data ) {
                        return <span>loading</span>
                    };

                  return <Fragment> {React.cloneElement(children, { data: data })} </Fragment>
                }}

            </Query>

        </Fragment>
}
