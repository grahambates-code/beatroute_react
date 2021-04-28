import React, { Fragment, useState } from 'react';
import AddFront from './AddFront';
import AddTitle from './AddTitle';
import AddMap from './AddMap';

export default ({ trip, refetch }) => {
    const [showButtons, setShowButtons] = useState(false);

    return (
        <Fragment>
            <wired-button
                elevation="2"
                onClick={() => {
                    setShowButtons(true);
                }}
            >
                Add Content
            </wired-button>

            {showButtons && (
                <div>
                    <h1>Journal </h1>

                    <AddFront trip={trip} refetch={refetch} type={'JournalFront'} />

                    <br />

                    <AddTitle trip={trip} refetch={refetch} type={'JournalText'} />

                    <br />

                    <AddMap trip={trip} refetch={refetch} type={'JournalMap'} />

                    {/*<h1>Pro </h1>*/}

                    {/*<AddFront trip={trip} refetch={refetch} type={'ProFront'}/>*/}

                    {/*<br/>*/}

                    {/*<AddTitle trip={trip} refetch={refetch} type={'ProTitle'}/>*/}

                    {/*<br/>*/}

                    {/*<AddMap trip={trip} refetch={refetch} type={'ProSketch'}/>*/}
                </div>
            )}
        </Fragment>
    );
};
