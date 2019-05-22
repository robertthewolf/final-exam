import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'

import LocaleSwitcher from './LocaleSwitcher'
import Header from './Header'
import Nav from './Nav'
import Slices from './Slices'
import { theme, reset } from '../styles'
import i18n from '../../config/i18n'
import {fadeIn} from '../styles/animations'

const globalStyle = css`
  ${reset}
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.white};
  }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.bg};
  }
  body {
    color: ${theme.colors.greyLight};
    background-color: ${theme.colors.bg};
    overflow-x: hidden;
  }
  a {
    transition: all 0.4s ease-in-out;
    text-decoration: none;
    font-weight: 600;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`

const Content = styled.div`
  opacity: 0;
  animation: ${fadeIn} 2.5s ease-in-out 1.5s forwards;
`

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]')
}

const LocaleContext = React.createContext()

const Layout = ({ children, pageContext: { locale }, location }) => {
  const data = useStaticQuery(query)
  const settings = data.allPrismicSiteSettings.edges.filter(e => e.node.lang === locale)[0].node

  console.log(locale);

  return (
    <LocaleContext.Provider value={{ locale, i18n }}>
        <ThemeProvider theme={theme}>
            <Global styles={globalStyle} />
            <LocaleSwitcher pageContext={{locale}} />
            <Header pageContext={{locale}} />
            <Nav pageContext={{locale}} location={location} />
            <Content>
              {children}
              <Slices allSlices={settings.data.body} />
            </Content>
        </ThemeProvider>
    </LocaleContext.Provider>
  )
}

export default Layout
export { LocaleContext }

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
}


const query = graphql`
  query LayoutQuery {
    allPrismicSiteSettings {
      edges {
        node {
          id
          lang
          data {
            body {
              
              ...on PrismicSiteSettingsBodyMap {
                id
                slice_type
                primary {
                  title {
                    text
                  }
                  address {
                    html
                  }
                  navigate_link {
                    url
                  }
                  background_map {
                    alt
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 900, quality: 90) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
                items {
                  time {
                    text
                  }
                  place {
                    text
                  }
                }
              }
                            
              ...on PrismicSiteSettingsBodyReview {
                id
                slice_type
                primary {
                  title {
                    html
                    text
                  }
                  text {
                    html
                    text
                  }
                  icon_code
                }
              }
              
              ...on PrismicSiteSettingsBodySocial {
                id
                slice_type
                items {
                  icon_code
                  link1 {
                    url
                  }
                }
              }
              
            }
          }
        }
      }
    }
  }
`