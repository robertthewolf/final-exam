import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getFontawesomeIcon from '../../utils/get-fontawesome-icon'
import {rhythm} from '../../../config/typography'

import Wrapper from '../Wrapper'

const SocialWrapper = styled(Wrapper)`
    display: flex;
    justify-content: center;

    a {
        display: block;
        padding: ${rhythm(2)} ${rhythm(1)};
        color: ${p => p.theme.colors.white};
    }
`

const Social = ({ data }) => {

    const socials = data.items.map(item => {
        const icon = getFontawesomeIcon(item.icon_code);
        return { icon, link: item.link1.url }
    })

    return (
        <SocialWrapper>
            {socials.map((item, index) => (
                <a key={index.toString()} href={item.link}><FontAwesomeIcon icon={item.icon} size="lg" /></a>
            ))}
        </SocialWrapper>
    )
}

export default Social

Social.propTypes = {
  data: PropTypes.object.isRequired,
}
