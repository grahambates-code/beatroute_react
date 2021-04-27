import React, { Fragment, useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import './App.less';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Measure from 'react-measure'

import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

import { ApolloProvider } from "react-apollo";

import { Query } from "react-apollo";

import gql from "graphql-tag";

import * as portals from 'react-reverse-portal';

import {coordEach} from '@turf/meta';

import AddPhoto  from "./Components/Photos/Add";



import JournalCover        from "./Components/Cards/Journal/Cover";
import JournalHeading      from "./Components/Cards/Journal/Heading";
import JournalText        from "./Components/Cards/Journal/Text";
import JournalMap       from "./Components/Cards/Journal/Map";

import CardAdder from './Components/Adder';
import * as THREE from "three";

const loader = new THREE.FontLoader();

const GETCARD = gql`
               {
               
                media {
                  id
                }
  
                owners:owner(where: {id: {_eq: "cyclefriendly"}}) {
                  id
                  
                  trips(where: {url: {_eq: "lakes2022"}}) {
                    id
                    name
                    url
                    
                    cards(order_by: {id: asc}) {
                      id
                      type
                      data
                      
                      slides(order_by: {id: asc}) {
                          camera
                          data
                          id
                           assets(order_by: {order: desc}) {
                                  id
                                  position
                                  scale
                                  translation
                                  rotation
                                  type
                                  data
                          }
                      }
                      
                    }
                  }
                }
              }

`

const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

gsap.registerPlugin(ScrollTrigger);

const httpLink = new HttpLink({ uri: 'https://guided-viper-73.hasura.app/v1/graphql' });

const client = new ApolloClient({ link: (httpLink), cache: new InMemoryCache() });

function loadJSON(url) {
  return new Promise(resolve => {
    loader.load(url, resolve);
  });
}


const App = () => {

  const portalNode2 = React.useMemo(() => portals.createHtmlPortalNode(), []);

  const [loadedCount, setLoadedCount] = useState(0);
  const [font, setFont] = useState(null);

  useEffect(async () => {
     const result = await loadJSON( 'fonts/test.json');
     setFont(result);
  }, []);

  const admin = true;

 return (
    <div className="App">

      <ApolloProvider client={client}>

        <Query query={GETCARD}  >
          {({ loading, error, data, refetch  }) => {

            if (loading || !data) return null

            const trip  = data.owners[0].trips[0];
            const cards = data.owners[0].trips[0].cards;
            const stillLoading = loadedCount < cards.length;

            trip.cards.filter(d => d.type === 'JournalSketch').forEach(c => {
              coordEach(c.data, function(coords) {
                if (coords.length > 2) coords.pop();
              });

            });

            return <Fragment>

              <Measure bounds>

                {({ measureRef, contentRect: { bounds: { width }} }) => (

                    <div>

                      <h1>{trip.name}</h1>

                      <h2> <AddPhoto refetch={refetch}/> </h2>

                      <main className="App-main">

                      <portals.InPortal node={portalNode2}>

                        <div> this is one time component</div>
                          {/*updateCard will be overwritten when called in Sketch*/}
                          {/*<Deck trip={trip} width={width} updateCard={() => alert("not implemented")}/>*/}
                      </portals.InPortal>

                        {cards.map((card, i) => {

                          return <div className="App-section" key={i} >
                            { card.type === 'JournalFront'    && <JournalCover        key={i + '' + card.id}  card={card} trip={trip}  index={i} client={client} /> }
                            { card.type === 'JournalHeading'  && <JournalHeading      key={i + '' + card.id}  card={card} trip={trip}  index={i} client={client} /> }
                            { card.type === 'JournalText'    && <JournalText        key={i + '' + card.id}  card={card} trip={trip} index={i} client={client} />}
                            { card.type === 'JournalMap'   && font && <JournalMap  key={i + '' + card.id}  card={card} trip={trip} index={i} client={client} font={font} portalNode2={portalNode2} width={width < 500 ? width : 500} admin={admin} stillLoading={stillLoading} incrementLoadedCount={() => setLoadedCount(loadedCount + 1)} index={i} refetch={refetch}/> }
                          </div>
                        })}

                        <div className="App-section" style={{height : '100%'}}>
                          <CardAdder trip={trip} refetch={refetch}/>
                        </div>

                      </main>
                    </div>

                  )}
              </Measure>

            </Fragment>

          }}

        </Query>

      </ApolloProvider>

    </div>
  );
}

export default App;
