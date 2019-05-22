/* eslint react/destructuring-assignment: 0 */
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import SEO from "../components/SEO";
import Slices from "../components/Slices";

const Service = ({ data: { service }, pageContext: { locale }, location }) => {
  return (
    <>
      <SEO
        title={service.data.meta_title.text}
        desc={service.data.meta_description.text}
        pathname={location.pathname}
        locale={locale}
      />
      <Slices allSlices={service.data.body} />
    </>
  );
};

export default Service;

Service.propTypes = {
  data: PropTypes.shape({
    service: PropTypes.object.isRequired
  }).isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query ServicePage($uid: String!, $locale: String!) {
    service: prismicService(uid: { eq: $uid }, lang: { eq: $locale }) {
      id
      data {
        name {
          text
        }
        meta_title {
          text
        }
        meta_description {
          text
        }
        body {
          ... on PrismicServiceBodyBanner {
            slice_type
            id
            primary {
              title {
                text
              }
              text {
                html
                text
              }
              image1 {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              cta_text {
                text
              }
              cta_link {
                link_type
                name
                kind
                url
                size
                target
              }
            }
          }

          ... on PrismicServiceBodyListOfArticles {
            slice_type
            id
            primary {
              title_of_section {
                text
              }
            }
            items {
              link_to_room {
                id
                url
                document {
                  id
                  uid
                  data {
                    name1 {
                      text
                    }
                    thumbnail {
                      alt
                      localFile {
                        childImageSharp {
                          fluid(maxWidth: 700, quality: 90) {
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      }
                    }
                    price {
                      text
                    }
                    price_per {
                      text
                    }
                    body {
                      ... on PrismicRoomBodyText {
                        id
                        slice_type
                        primary {
                          text {
                            html
                          }
                        }
                      }

                      ... on PrismicRoomBodyImageGallery {
                        id
                        slice_type
                        items {
                          gallery_image {
                            alt
                            localFile {
                              childImageSharp {
                                fluid(maxWidth: 700, quality: 90) {
                                  ...GatsbyImageSharpFluid_withWebp
                                }
                              }
                            }
                          }
                          image_captions {
                            text
                          }
                        }
                      }

                      ... on PrismicRoomBodyFeatures {
                        slice_type
                        id
                        items {
                          icon_name
                          description1 {
                            text
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          ... on PrismicServiceBodyCallToAction {
            id
            slice_type
            primary {
              title {
                text
              }
            }
            items {
              text {
                html
                text
              }
              button_text {
                html
                text
              }
              button_link {
                link_type
                url
                target
              }
            }
          }
        }
      }
    }
  }
`;
