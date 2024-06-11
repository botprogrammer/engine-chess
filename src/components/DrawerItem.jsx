import { Grid, Typography, useTheme } from '@mui/material'

export default function DrawerItem({ icon: Icon, title, path, isActive }) {
  const theme = useTheme()

  const primaryStroke = isActive ? theme.palette.blue['200'] : 'white'
  const primaryColor = isActive ? theme.palette.blue['200'] : 'white'
  const primaryBackgrond = isActive ? 'white' : 'transparent'

  return (
    <Grid
      container
      flexDirection='column'
      alignItems='center'
      gap={1}
      sx={{
        background: primaryBackgrond,
        px: 3,
        py: 1.5,
        borderRadius: 1.5,
        cursor: 'pointer'
      }}
    >
      <Icon width={24} strokeColor={primaryStroke} />
      <Typography fontWeight='bold' color={primaryColor} variant='subtitle2'>
        {title}
      </Typography>
    </Grid>
  )
}
