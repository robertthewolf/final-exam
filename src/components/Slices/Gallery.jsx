import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import Img from 'gatsby-image'
import {rhythm} from '../../../config/typography'

import Wrapper from '../Wrapper'


const GalleryImage = css`
    margin: ${rhythm(2)} 0;
    box-shadow: 0 0 ${rhythm(2)} ${p => p.theme.colors.black}99;
`


const Text = ({ data }) => {
    console.log(data)

    return (
        <Wrapper>
            {data.items.map(item => (
                <Img 
                    fluid={item.gallery_image.localFile.childImageSharp.fluid}
                    alt={item.gallery_image.alt}
                    css={GalleryImage}
                />
            ))}
        </Wrapper>
    )
}

export default Text

Text.propTypes = {
  data: PropTypes.object.isRequired,
}
