import gql from "graphql-tag";
import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache, HttpLink } from "apollo-boost";
import { Mutation, ApolloProvider } from "react-apollo";

const MY_MUTATION_MUTATION = gql`

mutation MyMutationn($slide_id : Int, $scale : numeric, $rotation : numeric, $type : String, $position : jsonb, $translation : jsonb) {
  insert_asset_one(object: {order: 10, position : $position, rotation: $rotation, scale: $scale, slide_id: $slide_id, translation: $translation, type: $type}) {
    id
  }
}

`;

const MyMutationMutation = ({refetch, slide, type, viewState}) => {

    const data = {"scale":100,"position":[viewState.longitude,viewState.latitude],"rotation":50, translation : [0,0,0]};

    return (
        <Mutation
            mutation={MY_MUTATION_MUTATION}
            onCompleted={() => refetch()}
            variables={{slide_id : slide.id, ...data, type : type}}>
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
