// ==============================|| OVERRIDES - Ship ||============================== //

export default function Chip(theme) {
  const { blue } = theme.palette
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-outlinedDefault': {
            boxShadow: 'rgba(6, 6, 6, 0.05) 0px 2px 6px 0px;',
            background: '#fff'
          }
        },
        filled: {
          background: blue['200'],
          color: '#fff',
          borderRadius: 30
        }
      }
    }
  }
}
