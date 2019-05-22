import React, {useState, useEffect, forwardRef, useRef, useImperativeHandle} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {keyframes} from "@emotion/core";
import { Link } from 'gatsby'
import { Portal } from 'react-portal'
import {fadeIn} from '../styles/animations'

const Absolute = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${p => p.theme.colors.black};
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .6s ease-out;

  &[data-open="false"] {
    opacity: 0;
    pointer-events: none;
  }

  video {
    width: 100%;
    max-height: 100vh;
  }
`;

const Video = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const videoEl = useRef(null)

    useImperativeHandle(ref, () => ({

        play() {
            setOpen(true)
            videoEl.current.play()
        }

    }));

    const close = () => {
        videoEl.current.pause();
        videoEl.current.currentTime = 0
        setOpen(false)
    }

    return (
        <Portal>
            <Absolute data-open={open} onClick={close}>
                <video playsInline={true} ref={videoEl} onEnded={close}>
                    <source src={props.source} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Absolute>
        </Portal>
    )
})

export default Video;

Video.propTypes = {
//   children: PropTypes.node.isRequired
};
