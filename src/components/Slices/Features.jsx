import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {rhythm} from '../../../config/typography'
import getFontawesomeIcon from '../../utils/get-fontawesome-icon'

import Wrapper from '../Wrapper'

const FeaturesWrapper = styled(Wrapper)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const Feature = styled.div`
    text-align: center;
    margin: ${rhythm(1)};
    width: 0;
    flex-grow: 1;
    flex-basis: ${rhythm(3.5)};
`

const iconStyle = css`
    display: block;
    margin: ${rhythm(.5)} auto;
`

const Features = ({ data }) => {
    
    const features = data.items.map(item => {
        const icon = getFontawesomeIcon(item.icon_name);
        return { icon, description: item.description1.text }
    })

    return (
        <FeaturesWrapper>
            {features.map(feature => (
                <Feature key={feature.icon.iconName}>
                    <FontAwesomeIcon icon={feature.icon} size="3x" css={iconStyle} />
                    {feature.description}
                </Feature>
            ))}
        </FeaturesWrapper>
    )
}

export default Features

Features.propTypes = {
  data: PropTypes.object.isRequired,
}
