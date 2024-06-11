import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  useTheme
} from '@mui/material'
import DownloadIcon from './svg/DownloadIcon'
import InfoIcon from './svg/InfoIcon'

export default function GraphCard({ title, duration, children }) {
  const theme = useTheme()

  return (
    <Card sx={{ p: 0 }}>
      <CardHeader
        title={
          <Typography
            variant='subtitle2'
            fontWeight='bold'
            letterSpacing={0}
            display='flex'
            alignItems='center'
          >
            {title}
            <Box component='span' fontWeight='normal' sx={{ ml: 2, mr: 1 }}>
              {duration}
            </Box>

            <InfoIcon strokeColor={theme.palette.blue['200']} />
          </Typography>
        }
        action={
          <IconButton>
            <DownloadIcon width={30} />
          </IconButton>
        }
        sx={{ py: 1, px: 2, borderBottom: '1px solid lightgrey' }}
      />
      <CardContent sx={{ pb: '1rem !important' }}>{children}</CardContent>
    </Card>
  )
}
