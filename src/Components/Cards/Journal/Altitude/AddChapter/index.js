import gql from "graphql-tag";
import React from "react";
import Mutation from "react-apollo/Mutation";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

const MY_MUTATION_MUTATION = gql`
  mutation MyMutation($card_id : Int) {
     insert_card_slide_one(object: {card_id: $card_id, data: [], camera: []}) {
    id
  }
  }
`;

export default (props) => {
    return (
        <Mutation
            mutation={MY_MUTATION_MUTATION}
            variables={{card_id : props.card.id}}
            onCompleted={() => props.refetch()}
        >
            {(MyMutation, { loading, error, data }) => {
                if (loading) return <pre>Loading</pre>

                if (error)
                    return (
                        <pre>
                            Error in MY_MUTATION_MUTATION
                            {JSON.stringify(error, null, 2)}
            </pre>
                    );

                return (<AddToPhotosIcon onClick={() => MyMutation()}></AddToPhotosIcon>);
            }}
        </Mutation>
    )
};

