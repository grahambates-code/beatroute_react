import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SAVE_SLIDE = gql`
    mutation($slide_id: Int, $data: jsonb) {
        update_card_slide(where: { id: { _eq: $slide_id } }, _set: { data: $data }) {
            returning {
                id
            }
        }
    }
`;

export default ({ edit, slide, refetch, slideIndex, setSlideIndex }) => (
    <Mutation
        onError={() => alert('Could not save title')}
        onCompleted={() => {
            refetch();
            setSlideIndex(slideIndex + 1);
        }}
        mutation={SAVE_SLIDE}
    >
        {(updateSlide, { loading, error }) => {
            return (
                <div
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    onBlur={(e) =>
                        updateSlide({
                            variables: {
                                data: {
                                    ...slide.data,
                                    text: e.currentTarget.textContent,
                                },
                                slide_id: slide.id,
                            },
                        })
                    }
                    contentEditable
                    suppressContentEditableWarning={true}
                >
                    {slide.data?.text}
                </div>
            );
        }}
    </Mutation>
);
