// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const { blue, shadow } = theme.palette

  return {
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&:hover': {
            cursor: 'pointer'
          }
        },
        contained: {
          backgroundColor: blue['100'],
          borderRadius: 8,
          boxShadow: shadow['200'],
          '&:hover': {
            backgroundColor: blue['100']
          }
        },
        text: {
          color: blue['200'],
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }
    }
  }
}
