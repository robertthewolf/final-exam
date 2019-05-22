import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import LocalizedLink from './LocalizedLink';
import { rhythm } from '../../config/typography'
import {fadeIn} from '../styles/animations'

const Wrapper = styled.nav`
margin: 2em auto;
display: flex;
justify-content: center;


opacity: 0;
animation: ${fadeIn} 1.5s ease-in 1.5s forwards;

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
    const [active, setActive] = useState('');

    const data = useStaticQuery(query)
    const homepage = data.allPrismicSiteSettings.edges.filter(e => e.node.lang === locale)[0].node.data.homepage.uid
    const services = data.allPrismicService.edges.filter(e => e.node.lang === locale).map(s =>  ({
      link: s.node.uid === homepage ? '' : s.node.uid,
      label: s.node.data.name.text
    }))

    return (
    <Wrapper>
      {services.map((service, i) => (
        <LocalizedLink to={service.link} key={i.toString()} data-active={service.link === active} onClick={() => setActive(service.link)}>{service.label}</LocalizedLink>
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
      allPrismicSiteSettings {
          edges {
            node {
              id
              lang
              data {
                homepage {
                  uid
                }
              }
            }
          }
        }
  }
`