// ==============================|| OVERRIDES - Select ||============================== //

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {},
      styleOverrides: {
        root: {
          '& input': {
            fontSize: '0.9rem'
          },

          '& fieldset': {
            border: 'none !important'
          }
        }
      }
    }
  }
}
