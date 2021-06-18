import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const AddJournalText = ({ trip }) => {
    return (
        <div className="add-journal-text clearfix">
            <div className="add-journal-circle" />
            <p>
                loremme  emmdf ddmfdsfds fdsmfd fdfmdfd
                fdfd
                fdfd
                fdfd
                fdfdfrtdff
                dsfdsf
                rfrgr
                grg
                rgrfrfr
                rfvr
                vrvrv
                rv
                rv
                rv
            </p>
        </div>
    );
};

AddJournalText.propTypes = {
    trip: PropTypes.any.isRequired,
};

export default AddJournalText;
