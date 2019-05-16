import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from 'gatsby'
import { graphql, useStaticQuery } from 'gatsby'
import { rhythm } from '../../config/typography'
import localeEmoji from 'locale-emoji'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: ${rhythm(.25)};

  display: flex;

  a {
    text-decoration: none !important;
    display: block;
    padding: ${rhythm(.25)};
    font-size: ${rhythm(1)};
  }
`

const LocaleSwitcher = ({ pageContext: { locale } }) => {
  const data = useStaticQuery(query)

  console.log(locale)
  
  return(
  <Wrapper data-name="locale-switcher">
    {data.allPrismicSiteSettings.edges.map(({node}) => {

      if (node.lang === locale) return null;
      
      return (
      <Link hrefLang={node.lang} to={node.data.language_url}>
        {localeEmoji(node.lang)}
      </Link>
    )})}
    
  </Wrapper>
)};

export default LocaleSwitcher;

LocaleSwitcher.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

const query = graphql`
  query LangQuery {
    allPrismicSiteSettings {
      edges {
        node {
          lang
          data {
            language_url
          }
        }
      }
    }
  }
`