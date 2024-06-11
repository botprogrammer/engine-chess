import { useState } from 'react'
import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import GraphCard from './GraphCard'
import TabPanel from './TabPanel'
import OrdersChart from './OrdersChart'

export default function OrdersAndRevenue() {
  const [value, setValue] = useState(0)

  const theme = useTheme()

  return (
    <GraphCard title='Orders & Revenue' duration='(07-05-2024 to 06-06-2024)'>
      <Grid container justifyContent='space-between'>
        <Grid container gap={2} width='max-content'>
          <Box
            sx={{
              background: theme.palette.grey['100'],
              px: 1.75,
              pt: 1.5,
              pb: 3,
              borderRadius: 2,
              width: 240
            }}
          >
            <Typography variant='subtitle2' letterSpacing={0.5}>
              Total Orders
            </Typography>
            <Typography
              variant='h6'
              mt={0.5}
              color={theme.palette.blue['200']}
              fontWeight={700}
            >
              6,430
            </Typography>
          </Box>
          <Box
            sx={{
              background: theme.palette.grey['100'],
              px: 1.75,
              pt: 1.5,
              pb: 3,
              borderRadius: 2,
              width: 240
            }}
          >
            <Typography variant='subtitle2' letterSpacing={0.5}>
              Total Revenue
            </Typography>
            <Typography
              variant='h6'
              mt={0.5}
              color={theme.palette.blue['200']}
              fontWeight={700}
            >
              ₹79,87,987
            </Typography>
          </Box>
        </Grid>

        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(_, val) => setValue(val)}>
              <Tab label='Orders' />
              <Tab label='Picked' />
              <Tab label='Delivered' />
            </Tabs>
          </Box>
        </Box>
      </Grid>
      <TabPanel value={value} index={0}>
        <Box sx={{ py: 2 }}>
          <OrdersChart />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ py: 2 }}>
          <OrdersChart />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ py: 2 }}>
          <OrdersChart />
        </Box>
      </TabPanel>
    </GraphCard>
  )
}
