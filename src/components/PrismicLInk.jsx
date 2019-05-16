import React, {useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import Video from "./Video"

const Absolute = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${p => p.theme.colors.black};
  padding: 1rem;
  z-index: 100;
`;

const PrismicLink = ({ link_type, url, children }) => {
    const videoRef = useRef();

  switch (link_type) {
    case "Web":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );

    case "Media":
      return (
        <>
            <a
                href={url}
                onClick={e => {
                    e.preventDefault();
                    console.log('hi')
                    console.log(videoRef.current)
                    videoRef.current.play()
                }}
            >
                {children}
            </a>
            <Video source={url} ref={videoRef} />
        </>
      );

    default:
      return null;
  }
};

export default PrismicLink;

PrismicLink.propTypes = {
  //   children: PropTypes.node.isRequired
};
