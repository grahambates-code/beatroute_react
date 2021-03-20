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
import Deck       from "./Components/Cards/Sketch/Deck";

import Front        from "./Components/Cards/Front";
import Title        from "./Components/Cards/Title";
import Sketch     from "./Components/Cards/Sketch";
import Polaroids  from "./Components/Cards/Polaroids/HTML";

import CardAdder from './Components/Adder';
import SimpleRichTextEditor from "./Components/Cards/Title/Editor";
//import CarouselExample from './Components/Carousel/CarouselExample';

const GETCARD = gql`
               {
               
                media {
                  id
                }
  
                owners:owner(where: {id: {_eq: "cyclefriendly"}}) {
                  id
                  
                  trips(where: {url: {_eq: "lakes2021"}}) {
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
                                  data
                                  type
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

const App = () => {

  const portalNode2 = React.useMemo(() => portals.createHtmlPortalNode(), []);

  const [loadedCount, setLoadedCount] = useState(0);

  const admin = true;

  //return <SimpleRichTextEditor/>
 return (
    <div className="App">

      <ApolloProvider client={client}>

        <Query query={GETCARD}  >
          {({ loading, error, data, refetch  }) => {

            if (loading || !data) return null

            const trip  = data.owners[0].trips[0];
            const cards = data.owners[0].trips[0].cards;
            const stillLoading = loadedCount < cards.length;

            trip.cards.forEach(c => {
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

                          if (card.type === 'Front') {
                            return <div className="App-section" key={i} >
                                    {admin && <code>{card.id}</code>}
                                     <Front key={i + '' + card.id} trip={trip} card={card} index={i}/>
                                   </div>
                          }

                          if (card.type === 'Title') {
                            return <div className="App-section" key={i} >
                              {admin && <code>{card.id}</code>}
                              <Title key={i + '' + card.id} card={card} i={i}/>
                            </div>
                          }

                          if (true && card.type === 'Sketch') {

                            return  <div className="App-section" key={i} >
                              { admin && <code>{JSON.stringify(card.id)}</code>}
                              <Sketch client={client} trip={trip} portalNode2={portalNode2} width={width < 500 ? width : 500} admin={admin} stillLoading={stillLoading} incrementLoadedCount={() => setLoadedCount(loadedCount + 1)} key={i + '' + card.id} index={i} card={card} refetch={refetch}/>
                            </div>
                          }

                          if (card.type === 'Polaroid') {

                            return  <div className="App-section" key={i} >
                              {admin && <code>{card.id}</code>}
                              <Polaroids width={width < 500 ? width : 500} admin={admin} stillLoading={stillLoading} incrementLoadedCount={() => setLoadedCount(loadedCount + 1)} key={i + '' + card.id} index={i} card={card} refetch={refetch}/>
                            </div>
                          }

                          return null;
                        })}

                        <div className="xApp-section" style={{height : '100%'}}>
                          <CardAdder trip={trip} refetch={refetch}/>
                        </div>

                        <div ref={measureRef}>My width is {width}</div>



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
