import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { rhythm } from '../../../config/typography'

import Wrapper from '../Wrapper'

const Container = styled.div`
  max-width: ${rhythm(13)};
  margin: ${rhythm(2)} auto;
  padding: ${rhythm(1)};
  background: ${p => p.theme.colors.bgLight};
  text-align: center;

  h2 {
    padding-top: ${rhythm(.5)};
  }

  p {
    margin-top: ${rhythm(1)};
    margin-bottom: ${rhythm(.5)};
  }

  a {
    display: inline-block;
    margin-bottom: ${rhythm(1)};
    padding: ${rhythm(.5)} ${rhythm(1)};
    color: ${p => p.theme.colors.white};
    border: 2px solid ${p => p.theme.colors.white};
    border-radius: 30px;
    text-transform: uppercase;

    &:hover {
      text-decoration: none;
      transform: scale(.95);
    }

    &:first-of-type {
      color: ${p => p.theme.colors.bgLight};
      background-color: ${p => p.theme.colors.white};
    }

  }
`;

const CTA = ({ data }) => {

  return (
    <Wrapper>
      <Container>
        <h2>{data.primary.title.text}</h2>
        {data.items.map((item, i) => (
          <div key={i.toString()}>
            <p>{item.text.text}</p>
            <a href={item.button_link.url}>{item.button_text.text}</a>
          </div>
        ))}
      </Container>
    </Wrapper>
  );
};

export default CTA;

CTA.propTypes = {
  data: PropTypes.object.isRequired
};