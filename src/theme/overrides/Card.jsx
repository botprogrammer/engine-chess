// ==============================|| OVERRIDES - CArd ||============================== //

export default function Card(theme) {
  const { shadow } = theme.palette
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 8,
          boxShadow: shadow['100'],
          borderRadius: 10
        }
      }
    }
  }
}
