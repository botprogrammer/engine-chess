import PieChart from './PieChart'
import GraphCard from './GraphCard'
import { pieChartData } from '../data'
import { Box, Chip, Grid, Typography } from '@mui/material'
import InfoIcon from './svg/InfoIcon'

export default function ZoneWiseDistribution() {
  return (
    <GraphCard
      title='Zone Wise Distribution'
      duration='(07-05-2024 to 06-06-2024)'
    >
      <PieChart data={pieChartData} />

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
                11.5%{' '}
              </Box>
              of your orders are in short shipping range
            </Typography>
          }
          sx={{ m: 'auto', px: 2, py: 3 }}
        />
      </Grid>
    </GraphCard>
  )
}
