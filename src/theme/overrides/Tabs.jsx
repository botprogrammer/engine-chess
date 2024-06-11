// ==============================|| OVERRIDES - Tabs ||============================== //

export default function Tabs() {
  return {
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: {
          style: {
            display: 'none'
          }
        }
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '2px solid #024D83',
          minHeight: 'unset'
        }
      }
    }
  }
}
