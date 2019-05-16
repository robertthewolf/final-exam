import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import Img from 'gatsby-image'

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
