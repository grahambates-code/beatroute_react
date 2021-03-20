import gql from "graphql-tag";
import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache, HttpLink } from "apollo-boost";
import { Mutation, ApolloProvider } from "react-apollo";

const MY_MUTATION_MUTATION = gql`

 mutation MyMutation($slide_id : Int, $data : jsonb, $type : String) {
  insert_asset_one(object: {data: $data, slide_id: $slide_id, type : $type}, on_conflict: {constraint: asset_pkey, update_columns: data}) {
    id
  }
}
`;

const MyMutationMutation = (props) => {

    const data = {"scale":100,"position":[-2.96,54.531],"angle":50};

    return (
        <Mutation
            mutation={MY_MUTATION_MUTATION}
            onCompleted={() => props.refetch()}
            variables={{slide_id : props.slide.id, data : data, type : props.type}}>
            {(MyMutation, { loading, error, data }) => {
                if (loading) return <pre>Loading</pre>

                if (error)
                    return (
                        <pre>
              Error in MY_MUTATION_MUTATION
                            {JSON.stringify(error, null, 2)}
            </pre>
                    );

                return (
                    <div>

                        <button onClick={() => MyMutation()}>
                            Add
                        </button>
                    </div>
                );
            }}
        </Mutation>
    )
};

export default  MyMutationMutation;
