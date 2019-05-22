import React, {useEffect} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Img from "gatsby-image";
import { rhythm } from "../../../config/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PrismicLink from "../PrismicLink"
import watchScroll from "../../utils/use-scroll-position"

import Wrapper from "../Wrapper";

const Container = styled.section`
  position: relative;
  margin: ${rhythm(2)} 0;
  overflow: hidden;
  height: 130vh;
`;


const ParallaxContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(calc(var(--scroll-position) * -.3px));
  opacity: calc(var(--scroll-position) * .002 + 1);
  will-change: transform;
`;


const BannerImage = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 130vh;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    ${p => p.theme.colors.bg} 0%,
    ${p => p.theme.colors.bg}00 66%,
    ${p => p.theme.colors.bg} 100%
  );
`;

const ContentWrapper = styled(Wrapper)`
position: relative;
z-index: 2;
`

const TextBox = styled.div`
  margin-top: 20vh;
  max-width: ${rhythm(13)};
`;

const ButtonWrapper = styled.div`
  a {
    display: block;
    outline: none;
    margin-left: auto;
    background: none;
    border: none;
    color: ${p => p.theme.colors.white};
    cursor: pointer;

    svg {
      margin-left: ${rhythm(0.3)};
      margin-bottom: ${rhythm(0.1)};
    }
  }
`;

const Banner = ({ data }) => {
  
  return (
    <Container id="banner">
      <ParallaxContainer ref={el => watchScroll(el)}>
        <Img
          fluid={data.primary.image1.localFile.childImageSharp.fluid}
          alt={data.primary.image1.alt}
          css={BannerImage}
        />
        <Overlay />
      </ParallaxContainer>
      <Overlay />
      <ContentWrapper>
        <TextBox dangerouslySetInnerHTML={{ __html: data.primary.text.html }} />
        <ButtonWrapper>
          <PrismicLink link_type={data.primary.cta_link.link_type} url={data.primary.cta_link.url}>
            {data.primary.cta_text.text}
            <FontAwesomeIcon icon={faPlay} />
          </PrismicLink>
        </ButtonWrapper>
      </ContentWrapper>
      
    </Container>
  );
};

export default Banner;

Banner.propTypes = {
  data: PropTypes.object.isRequired
};
