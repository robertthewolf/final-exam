import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Img from "gatsby-image";
import Slices from "./index";
import {rhythm} from '../../../config/typography'

const RoomSelector = styled.section`
  overflow-x: scroll;
  width: auto;
  white-space: nowrap;
  text-align: center;
  margin-bottom: ${rhythm(2)};

  -ms-overflow-style: none; 
  scrollbar-width: none;
  &::-webkit-scrollbar { 
    display: none;
  }
`;

const Room = styled.button`
  cursor: pointer;
  border: none;
  outline: none !important;
  background: none;
  display: inline-block;
  height: ${rhythm(16)};
  width: ${rhythm(12)};
  max-width: 60vw;
  max-height: 80vw;
  color: white;
  position: relative;
  margin: ${rhythm(.5)};
  padding: 0.3em;
  box-shadow: ${p => p.selected ? '0 5px solid black' : 'none'};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 150px 150px 12px 12px;
    border: 1px solid ${p => p.theme.colors.white}25;
    transform: ${p => p.selected ? 'scale(1.02, 1.01)' : 'scale(.95)'};
    ${p => p.theme.transition}
  }

  h3 {
    position: absolute;
    left: ${rhythm(1)};
    bottom: 0;
    z-index: 5;
      
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      bottom: ${rhythm(1)};
    }
  }

  p {
    position: absolute;
    right: ${rhythm(1)};
    bottom: 0;
    font-weight: 600;
    z-index: 5;

    @media (max-width: ${props => props.theme.breakpoints.m}) {
      right: auto;
      left: ${rhythm(1)};
      bottom: 0;
    }
  }

  small {
    /* position: absolute; */
    display: block;
    font-weight: 400;

    @media (max-width: ${props => props.theme.breakpoints.m}) {
      display: inline-block;
    }
  }
`;

const RoomImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 150px 150px 8px 8px;
  overflow: hidden;
  z-index: 2;


  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(42, 42, 49, 0) 0%, rgba(42, 42, 49, 0.49) 100%);
  }
`;

const RoomList = ({data}) => {
  const [activeRoom, setActiveRoom] = useState(data.items[0].link_to_room.document[0].uid);

  return (
    <>
      <h2>{data.primary.title_of_section.text}</h2>

      <RoomSelector>
        {data.items.map(item => {
          const room = item.link_to_room.document[0];

          return (
            <Room key={room.id} onClick={() => setActiveRoom(room.uid)} selected={activeRoom === room.uid}>
              <Img
                fluid={room.data.thumbnail.localFile.childImageSharp.fluid}
                alt={room.data.thumbnail.alt}
                css={RoomImage}
              />
              <h3>{room.data.name1.text}</h3>
              <p>{room.data.price.text} <small>{room.data.price_per.text}</small></p>
            </Room>
          );
        })}
      </RoomSelector>

      {data.items
        .filter(item => item.link_to_room.document[0].uid === activeRoom)
        .map(item => (
          <Slices key={item.link_to_room.id} allSlices={item.link_to_room.document[0].data.body} />
        ))}
    </>
  );
};

export default RoomList;

RoomList.propTypes = {
  data: PropTypes.object.isRequired
};
