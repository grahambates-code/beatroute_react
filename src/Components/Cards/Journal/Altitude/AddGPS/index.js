import gql from "graphql-tag";
import React from "react";
import { Mutation, ApolloProvider } from "react-apollo";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Reader from './reader'

const MY_MUTATION_MUTATION = gql`
mutation MyMutation($card_id : Int, $data : jsonb) {
  insert_gps_data_one(object: {card_id: $card_id, data: $data}, on_conflict: {constraint: gps_data_card_id_key, update_columns: data}) {
    id
  }
}

`;

const MyMutationMutation = (props) => {
    return (
        <Mutation
            mutation={MY_MUTATION_MUTATION} >
            {(updateData, { loading, error, data }) => {
                if (loading) return <pre>Loading</pre>

                if (error)
                    return (
                        <pre>
                            §Error in MY_MUTATION_MUTATION
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    );

                return (
                    <Reader card={props.card} updateTripGeojson={updateData}/>
                );
            }}
        </Mutation>
    )
};

export default MyMutationMutation;
