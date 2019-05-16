import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getFontawesomeIcon from '../../utils/get-fontawesome-icon'
import {rhythm} from '../../../config/typography'

import Wrapper from '../Wrapper'

const Card = styled.div`
    background-color: ${p => p.theme.colors.white};
    border-radius: 8px;
    color: ${p => p.theme.colors.black};
    padding: ${rhythm(1.5)} ${rhythm(.75)} ${rhythm(1)};
    text-align: center;
    max-width: ${rhythm(15)};
    margin: 0 auto;
`

const Review = ({ data }) => {

    const icon = getFontawesomeIcon(data.primary.icon_code);

    return (
        <Wrapper>
            <h2>{data.primary.title.text}</h2>
            <Card>
                <blockquote dangerouslySetInnerHTML={{ __html: data.primary.text.html }} />
                <FontAwesomeIcon icon={icon} size="2x" />
            </Card>
        </Wrapper>
    )
}

export default Review

Review.propTypes = {
  data: PropTypes.object.isRequired,
}
