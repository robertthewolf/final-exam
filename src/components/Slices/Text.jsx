import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from '../Wrapper'

const Text = ({ data }) => {

    return (
        <Wrapper
            dangerouslySetInnerHTML={{ __html: data.primary.text.html}}
        />
    )
}

export default Text

Text.propTypes = {
  data: PropTypes.object.isRequired,
}
