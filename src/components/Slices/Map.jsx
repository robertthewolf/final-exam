import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections } from "@fortawesome/free-solid-svg-icons";
import CircleType from "circletype";
import { rhythm } from "../../../config/typography";
import watchScroll from "../../utils/use-scroll-position"

import Wrapper from "../Wrapper";

const InnerWrapper = styled(Wrapper)`
  position: relative;
  max-width: ${rhythm(20)};
  margin: ${rhythm(2)} auto;
  padding: ${rhythm(1)} 0 ${rhythm(3)};

  h2 {
    padding-bottom: ${p => p.radius + 100}px;
  }
`;

const spin = keyframes`
from {
  transform: rotate(0deg);
} to {
  transform: rotate(-360deg);
}
`;

const RoundText = styled.pre`
  text-transform: uppercase;
  overflow: visible;

  position: absolute !important;
  z-index: 2;
  top: calc(50% + ${rhythm(1)});
  left: 50%;
  transform: translate(-50%, -50%);
  > div {
    animation: ${spin} 25s linear infinite;
    will-change: transform;
    width: ${p => p.radius}px;
    height: ${p => p.radius}px;
  }
`;

const BackgroundMapWrapper = styled.div`
  position: absolute !important;
  top: calc(50% + ${rhythm(1)});
  left: 50%;
  border-radius: 50%;
  overflow: hidden;
  width: ${p => p.radius * 4}px;
  height: ${p => p.radius * 4}px;
  margin: 0 auto;
  transform: translate(-50%, -50%) scale(.5);


  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background: radial-gradient(circle, #2a2a3100 0%, #2a2a31 70%);
  }

`

const BackgroundMap = css`
    transform: scale(calc(var(--scroll-position) * -0.002 + 1.5));
    will-change: transform;
    /* > * {
      animation: ${spin} 100s linear reverse infinite;
      will-change: transform;
    } */

  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background: radial-gradient(circle, #2a2a3100 0%, #2a2a31 70%);
  }
`;

const breathe = keyframes`
  from {
    transform: translate(-50%, -50%) scale(.9);
  }
  to {
    transform: translate(-50%, -50%) scale(1.1);
  }
`

const MapPin = styled.div`
  position: absolute;
  top: calc(50% + ${rhythm(1)});
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border: 3px solid ${p => p.theme.colors.white};
  border-radius: 50%;
  animation: ${breathe} 1s ease-in-out alternate infinite;
  will-change: transform;
`;

const AdressBar = styled.div`
  background-color: ${p => p.theme.colors.bgLight};
  padding: ${rhythm(1)};
  margin-bottom: ${rhythm(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  position: relative;
  z-index: 5;

  p {
    display: inline-block;
    margin: 0;
    &:after {
      content: ' ';
      white-space: pre;
    }
  }

  a {
    color: ${p => p.theme.colors.white};

    svg {
      margin-left: .3em;
    }
  }
`;

const Map = ({ data }) => {
  const [radius, setRadius] = useState(200);

  return (
      <InnerWrapper radius={radius}>
        <h2>{data.primary.title.text}</h2>
        <RoundText
          ref={el => {
            if (el === null) return;
            const circle = new CircleType(el)
            setRadius(circle.radius())
          }}
          radius={radius}
        >
          {data.items.map(i => (
            <span>
              {i.place.text} {i.time.text}.{" "}
            </span>
          ))}
        </RoundText>
        <BackgroundMapWrapper ref={el => watchScroll(el)} radius={radius}>
          <Img
            fluid={data.primary.background_map.localFile.childImageSharp.fluid}
            alt={data.primary.background_map.alt}
            css={BackgroundMap}
          />
        </BackgroundMapWrapper>
        <MapPin />
        <AdressBar>
          <div dangerouslySetInnerHTML={{__html: data.primary.address.html}}></div>
          <a href={data.primary.navigate_link.url} target="_blank"><FontAwesomeIcon icon={faDirections} size="lg" /></a>
        </AdressBar>
      </InnerWrapper>
  );
};

export default Map;

Map.propTypes = {
  data: PropTypes.object.isRequired
};
