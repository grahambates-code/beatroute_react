import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {Button} from '@material-ui/core'
const ADD_FRONT = gql`


mutation MyMutation ($chapterId : Int){
  insert_page_one(object: {chapter_id: $chapterId, camera: "[]", text: "f"}) {
     id
  }
}

`;

export default ({ refetch, chapter}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add highlight')}
            onCompleted={() => refetch()}
            mutation={ADD_FRONT}
            variables={{chapterId : chapter.id}}
        >

            {(addFront, {loading, error}) => {

                return <Button variant="contained" color="primary" elevation="1" onClick={ addFront }>
                    Add page
                </Button>

            }}
        </Mutation>

    </div>
}
