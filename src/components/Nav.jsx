import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'
import LocalizedLink from './LocalizedLink';
import { rhythm } from '../../config/typography'

const Wrapper = styled.nav`
margin: 2em auto;
display: flex;
justify-content: center;


opacity: 0;
animation: ${p => p.theme.animations.fadeIn} 1.5s ease-in 1.5s forwards;

a {
  display: block;
  padding: ${rhythm(.5)} ${rhythm(1)};
  background: ${p => p.theme.colors.white}05;
  border: 1px solid ${p => p.theme.colors.white}15;
  margin-left: -1px;

  color: ${p => p.theme.colors.white};
  font-size: ${rhythm(.66)};
  font-weight: 400;

  &:hover, &[data-active="true"] {
    text-decoration: none;
    background: ${p => p.theme.colors.white}25;
  }

  &:first-of-type {
    border-radius: ${p => p.theme.borderRadius} 0 0 ${p => p.theme.borderRadius};
    margin-left: 0;
  }

  &:last-of-type {
    border-radius: 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0;
  }
}

`

const Nav = ({ pageContext: { locale }, location }) => {
    const data = useStaticQuery(query)
    const services = data.allPrismicService.edges.filter(e => e.node.lang === locale)

    return (
    <Wrapper>
      {services.map(({ node }) => (
        <LocalizedLink to={node.uid} data-active={location.href.includes(node.uid)}>{node.data.name.text}</LocalizedLink>
      ))}
    </Wrapper>
)}

export default Nav


Nav.propTypes = {
    pageContext: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
  }

const query = graphql`
    query NavQuery {
      allPrismicService {
        edges {
          node {
            uid
            lang
            data {
              name {
                text
              }
            }
          }
        }
      }
  }
`