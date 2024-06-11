/* eslint-disable react/prop-types */
// ==============================|| DEFAULT THEME   ||============================== //

import { useMemo } from 'react'

import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Palette from './Palette'
import componentsOverride from './overrides'

export default function ThemeCustomization({ children }) {
  const theme = Palette()

  const themeOptions = useMemo(
    () => ({
      palette: theme.palette
    }),
    [theme]
  )

  const themes = createTheme(themeOptions)

  themes.components = componentsOverride(themes)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
