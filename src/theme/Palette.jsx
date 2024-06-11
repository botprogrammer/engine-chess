import { createTheme } from '@mui/material/styles'

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = () => {
  return createTheme({
    palette: {
      shadow: {
        100: 'rgba(99, 99, 99, 0.5) 0px 2px 8px 0px',
        200: 'rgba(99, 99, 99, 0.8) 0px 2px 8px 0px'
      },
      blue: {
        100: '#40719C',
        200: '#024D83'
      }
    }
  })
}

export default Palette
