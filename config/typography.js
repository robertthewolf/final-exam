import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: ['Georgia', 'Times', 'Times New Roman', 'serif'],
  bodyFontFamily: ['canada-type-gibson', 'sans-serif'],
  scaleRatio: 3.157,
  headerWeight: 400,
  overrideStyles: () => ({
    img: {
      marginBottom: 0,
    },
    h2: {
      textAlign: 'center',
    }
  }),
})

export default typography
export const rhythm = typography.rhythm