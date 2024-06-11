import DonutChart from './DonutChart'
import GraphCard from './GraphCard'
import { donutChartData } from '../data'
import { Box, Chip, Grid, Typography } from '@mui/material'
import InfoIcon from './svg/InfoIcon'

export default function DeliveryTimeline() {
  return (
    <GraphCard title='Delivery Timeline' duration='(07-05-2024 to 06-06-2024)'>
      <DonutChart data={donutChartData} />

      <Grid container>
        <Chip
          icon={<InfoIcon width={30} />}
          label={
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Box fontSize={22} fontWeight='bold' component='span'>
                53.5%{' '}
              </Box>
              of your orders are delivered in 1-2 days
            </Typography>
          }
          sx={{ m: 'auto', px: 2, py: 3 }}
        />
      </Grid>
    </GraphCard>
  )
}
