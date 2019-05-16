import {keyframes} from '@emotion/core'

const theme = {
  colors: {
    bg: '#2A2A31',
    bgLight: '#525259',
    black: '#000000',
    white: '#FFFFFF',
    greyLight: '#E5E5E5',
  },
  borderRadius: '6px',
  maxWidth: '1000px',
  maxWidthText: '720px',
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  transition: 'transition: all .2s ease-out',
  animations: {
    fadeIn: keyframes`to { opacity: 1; }`
  }
}

export default theme
