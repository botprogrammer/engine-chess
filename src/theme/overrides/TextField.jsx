// ==============================|| OVERRIDES - TextField ||============================== //

export default function TextField() {
  return {
    MuiTextField: {
      defaultProps: {},
      styleOverrides: {
        root: {
          '& input': {
            fontSize: '1rem',
            padding: '0.75rem 0.5rem'
          },

          '& fieldset': {
            border: 'none !important'
          }
        }
      }
    }
  }
}
