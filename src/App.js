import React, { Fragment, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './App.less';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Measure from 'react-measure';

import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

import { ApolloProvider,  } from 'react-apollo';

import { Query,  } from 'react-apollo';

import gql from 'graphql-tag';

import * as portals from 'react-reverse-portal';

import { coordEach } from '@turf/meta';

import AddPhoto from './Components/Photos/Add';

import JournalCover from './Components/Cards/Journal/Cover';
import JournalHeading from './Components/Cards/Journal/Heading';
import JournalText from './Components/Cards/Journal/Text';
import JournalMap from './Components/Cards/Journal/Map';
import JournalAltitude from './Components/Cards/Journal/Altitude';

import CardAdder from './Components/Adder';
import * as THREE from 'three';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Header from './Components/Header';

const theme = createMuiTheme({});

const loader = new THREE.FontLoader();

const GETCARD = gql`
  {
    media {
      id
    }

    owners: owner(where: { id: { _eq: "cyclefriendly" } }) {
      id

      trips(where: { url: { _eq: "lakes2022" } }) {
        id
        name
        url

        cards(order_by: { id: asc }) {
          id
          type
          data

          chapters(order_by: { id: asc }) {
            camera
            data
            id
            
             assets {
              data
              id
              order
              position
              rotation
              scale
              translation
            }
            
            pages {
              id
              camera
              text
              marker
            }
            
            
          }
        }
      }
    }
  }
`;

const useContainerDimensions = (myRef) => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight,
  });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return dimensions;
};

gsap.registerPlugin(ScrollTrigger);

const httpLink = new HttpLink({
  uri: 'https://guided-viper-73.hasura.app/v1/graphql',
});

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

function loadJSON(url) {
  return new Promise((resolve) => {
    loader.load(url, resolve);
  });
}

const App = () => {
  const portalNode2 = React.useMemo(() => portals.createHtmlPortalNode(), []);

  const [loadedCount, setLoadedCount] = useState(0);
  const [font, setFont] = useState(null);

  useEffect(async () => {
    const result = await loadJSON('fonts/test.json');
    setFont(result);
  }, []);

  const admin = true;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ApolloProvider client={client}>
          <Query query={GETCARD}>
            {({ loading, error, data, refetch }) => {
              if (loading || !data) return null;

              const trip = data.owners[0].trips[0];
              const cards = data.owners[0].trips[0].cards;
              const stillLoading = loadedCount < cards.length;

              trip.cards
                .filter((d) => d.type === 'JournalSketch')
                .forEach((c) => {
                  coordEach(c.data, function (coords) {
                    if (coords.length > 2) coords.pop();
                  });
                });

              return (
                <div>
                  <Header title={trip.name} />
                  <main className="app-main">
                      <portals.InPortal node={portalNode2}>
                        <div> this is one time component</div>
                      </portals.InPortal>
                      {cards.map((card, i) => {
                        return (
                          <div className="app-section" key={i}>
                            {card.type === 'JournalFront' && (
                              <JournalCover
                                key={i + '' + card.id}
                                card={card}
                                trip={trip}
                                index={i}
                                client={client}
                                refetch={refetch}
                              />
                            )}
                            {card.type === 'JournalHeading' && (
                              <JournalHeading
                                key={i + '' + card.id}
                                card={card}
                                trip={trip}
                                index={i}
                                client={client}
                                refetch={refetch}
                              />
                            )}
                            {card.type === 'JournalText' && (
                              <JournalText
                                key={i + '' + card.id}
                                card={card}
                                trip={trip}
                                index={i}
                                client={client}
                                refetch={refetch}
                              />
                            )}

                            {card.type === 'JournalAltitude' && (
                                <JournalAltitude
                                    key={i + '' + card.id}
                                    card={card}
                                    trip={trip}
                                    index={i}
                                    width={500}
                                    font={font}
                                    client={client}
                                    refetch={refetch}
                                />
                            )}

                            {card.type === 'JournalMap' && font && (
                              <Measure bounds>
                                {({
                                  measureRef,
                                  contentRect: {
                                    bounds: { width },
                                  },
                                }) => (
                                    <JournalMap
                                      key={i + '' + card.id}
                                      card={card}
                                      trip={trip}
                                      index={i}
                                      client={client}
                                      font={font}
                                      portalNode2={portalNode2}
                                      width={width < 500 ? width : 500}
                                      admin={admin}
                                      stillLoading={stillLoading}
                                      incrementLoadedCount={() =>
                                        setLoadedCount(loadedCount + 1)
                                      }
                                      index={i}
                                      refetch={refetch}
                                    />
                                )}
                              </Measure>
                            )}
                          </div>
                        );
                      })}

                      <div
                        className="app-section"
                        style={{ height: '100%' }}
                      >
                        <CardAdder trip={trip} refetch={refetch} />
                      </div>
                    </main>
                </div>
              );
            }}
          </Query>
        </ApolloProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
