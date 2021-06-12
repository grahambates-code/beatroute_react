import React, { Fragment, useState} from 'react'
import AddFront     from './AddFront'
import AddTitle     from './AddTitle'
import AddMap    from './AddMap'
import AddAltitude    from './AddAltitude'
import {Button} from "@material-ui/core";
import AddJournalText from './AddJournalText'

const Adder = ({trip, refetch}) => {

    const [showButtons, setShowButtons] = useState(false);

    return  <Fragment>

        <Button variant="contained"  onClick={()=> {
            setShowButtons(true);
        }}>
            Add content
        </Button>

        {showButtons && <div>

            <h1>Journal </h1>

            <AddFront trip={trip} refetch={refetch} type={'JournalFront'}/>

            <br/>

            <AddTitle trip={trip} refetch={refetch} type={'JournalText'}/>

            <br/>

            <AddAltitude trip={trip} refetch={refetch} type={'JournalAltitude'}/>

            <br/>

            <AddMap trip={trip} refetch={refetch} type={'JournalMap'}/>

            <br/>

            <AddJournalText trip={trip} />

            <br/>

        </div> }

    </Fragment>
};

export default Adder;
