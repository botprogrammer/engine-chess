import { Box, Card, Grid, Tooltip, Typography, useTheme } from '@mui/material'
import { Fragment } from 'react'
import DownArrowIcon from './svg/DownArrowIcon'
import InfoIcon from './svg/InfoIcon'
import OrdersIcon from './svg/OrdersIcon'

export default function Infocard({ title, amount, percentage, yDay }) {
  const theme = useTheme()

  const isLoss = percentage < 0

  return (
    <Fragment>
      <Grid container alignItems='center' sx={{ mb: 1 }}>
        <Typography variant='subtitle1' fontWeight={700} sx={{ mr: 1 }}>
          {title}
        </Typography>
        <Tooltip title={title} placement='right' arrow>
          <Grid container alignItems='center' sx={{ width: 'max-content' }}>
            <InfoIcon strokeColor={theme.palette.blue['200']} />
          </Grid>
        </Tooltip>
      </Grid>
      <Card sx={{ px: 2, py: 1.5 }}>
        <Grid container alignItems='center' gap={2}>
          <Box>
            <Grid
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#e9feff'
              }}
              container
              alignItems='center'
              justifyContent='center'
            >
              <OrdersIcon />
            </Grid>
          </Box>
          <Box>
            <Typography variant='subtitle1'>Today</Typography>
            <Grid container alignItems='center' sx={{ my: 0.5 }}>
              <Typography
                variant='body1'
                fontWeight={700}
                sx={{ mr: 2 }}
                color={theme.palette.blue['200']}
              >
                {amount}
              </Typography>
              <DownArrowIcon
                width={12}
                strokeColor={isLoss ? 'red' : 'green'}
                style={{ transform: isLoss ? 'none' : 'rotate(180deg)' }}
              />
              <Typography
                fontWeight={700}
                sx={{ ml: 0.7 }}
                color={isLoss ? 'red' : 'green'}
                variant='subtitle2'
              >
                {Math.abs(percentage)}%
              </Typography>
            </Grid>
            <Typography variant='subtitle2'>
              Y'day -{' '}
              <Box component='span' fontWeight='bold'>
                {yDay}
              </Box>
            </Typography>
          </Box>
        </Grid>
      </Card>
    </Fragment>
  )
}
