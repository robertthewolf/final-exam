import styled from '@emotion/styled'
import {rhythm} from '../../config/typography'

const Wrapper = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${rhythm(3)};
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding: 0 ${rhythm(1)};
  }
`

export default Wrapper
