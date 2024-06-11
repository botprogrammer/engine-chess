// ==============================|| OVERRIDES - Tab ||============================== //

export default function Tab(theme) {
  const { blue } = theme.palette

  return {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        sx: { textTransform: 'none', py: 1, px: 2 }
      },
      styleOverrides: {
        root: {
          '&.MuiTab-root': {
            color: blue['200'],
            minHeight: 'unset',
            borderRight: `2px solid ${blue['200']}`,
            letterSpacing: '0.5px',
            '&.Mui-selected': {
              background: blue['200'],
              color: '#fff',
              fontWeight: 700
            },
            '&:last-child': { borderRight: 'none' }
          }
        }
      }
    }
  }
}
