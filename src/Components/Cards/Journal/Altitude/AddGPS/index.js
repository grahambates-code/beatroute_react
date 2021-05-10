import gql from "graphql-tag";
import React from "react";
import { Mutation, ApolloProvider } from "react-apollo";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

const MY_MUTATION_MUTATION = gql`
  mutation MyMutation {
    insert_gps_data_one(object: {card_id: 59, data: 123}) {
      id
    }
  }
`;

const MyMutationMutation = (props) => {
    return (
        <Mutation
            mutation={MY_MUTATION_MUTATION}>
            {(MyMutation, { loading, error, data }) => {
                if (loading) return <pre>Loading</pre>

                if (error)
                    return (
                        <pre>
                            §Error in MY_MUTATION_MUTATION
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    );

                const dataEl = data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                ) : null;

                return (
                    <div>
                        <AddCircleOutline onClick={() => MyMutation()}></AddCircleOutline>
                    </div>
                );
            }}
        </Mutation>
    )
};

export default MyMutationMutation;
