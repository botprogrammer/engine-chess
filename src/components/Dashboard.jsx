import { Box, Card, Grid, Typography, useTheme } from '@mui/material'
import Infocard from './Infocard'
import { infoCardData } from '../data'
import CalendarIcon from './svg/CalenderIcon'
import InfoIcon from './svg/InfoIcon'
import OrdersAndRevenue from './OrdersAndRevenue'
import ZoneWiseDistribution from './ZoneWiseDistribution'
import DeliveryTimeline from './DeliveryTimeline'

export default function Dashboard() {
  const theme = useTheme()
  return (
    <Box flex={1} sx={{ py: 3, px: 4 }}>
      <Typography variant='h4'>
        Welcome,{' '}
        <Box component='span' sx={{ fontWeight: 'bold' }}>
          Origin
        </Box>
      </Typography>

      {/* For INfoCards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 4,
          mt: 4
        }}
      >
        {infoCardData.map(({ title, amount, percentage, yDay }) => {
          return (
            <Box key={title} flex={1}>
              <Infocard
                title={title}
                amount={amount}
                percentage={percentage}
                yDay={yDay}
              />
            </Box>
          )
        })}
      </Box>

      {/* FOr Overview */}
      <Box sx={{ mt: 6 }}>
        <Grid
          container
          justifyContent='space-between'
          sx={{ borderBottom: '1px solid lightgrey', pb: 2 }}
        >
          <Typography variant='h5'>Overview</Typography>
          <Grid
            container
            alignItems='center'
            sx={{
              width: 'max-content',
              border: '1px solid lightgrey',
              px: 1.5,
              py: 1,
              borderRadius: 2
            }}
            gap={1}
          >
            <CalendarIcon width={15} />
            <Typography
              variant='subtitle2'
              color='grey'
              sx={{ ml: 0.5, fontSize: '0.75rem' }}
            >
              07/05/24 - 06/06/24
            </Typography>
          </Grid>
        </Grid>
        <Grid container gap={4} mt={4}>
          <Box flex={1}>
            <Typography
              variant='subtitle2'
              fontWeight={700}
              mb={1}
              letterSpacing={0}
            >
              Shipping{' '}
              <Box component='span' fontWeight={500} sx={{ pl: 1 }}>
                (07-05-2024 to 06-06-2024)
              </Box>
            </Typography>
            <Card>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  py: 1
                }}
              >
                <Box sx={{ px: 2, borderRight: '1px solid lightgrey' }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>
                      Active Shipments
                    </Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    7
                  </Typography>
                </Box>
                <Box sx={{ px: 2, borderRight: '1px solid lightgrey' }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>
                      Yet to be Picked{' '}
                    </Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    14.3%
                  </Typography>
                  <Typography variant='subtitle2'>(1)</Typography>
                </Box>
                <Box sx={{ px: 2, borderRight: '1px solid lightgrey' }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>Open Shipments</Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    0%
                  </Typography>
                  <Typography variant='subtitle2'>(0)</Typography>
                </Box>
                <Box sx={{ px: 2 }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>Closed Shipment</Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    85.7%
                  </Typography>
                  <Typography variant='subtitle2'>(6)</Typography>
                </Box>
              </Box>
            </Card>
          </Box>
          <Box flex={1}>
            <Typography
              variant='subtitle2'
              fontWeight={700}
              mb={1}
              letterSpacing={0}
            >
              NDR
              <Box component='span' fontWeight={500} sx={{ pl: 1 }}>
                (07-05-2024 to 06-06-2024)
              </Box>
            </Typography>
            <Card>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  py: 1
                }}
              >
                <Box sx={{ px: 2, borderRight: '1px solid lightgrey' }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>NDR Raised</Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    0
                  </Typography>
                </Box>
                <Box sx={{ px: 2, borderRight: '1px solid lightgrey' }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>NDR Active</Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    0%
                  </Typography>
                  <Typography variant='subtitle2'>(0)</Typography>
                </Box>
                <Box sx={{ px: 2, borderRight: '1px solid lightgrey' }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>NDR Delivered</Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    0%
                  </Typography>
                  <Typography variant='subtitle2'>(0)</Typography>
                </Box>
                <Box sx={{ px: 2 }}>
                  <Grid container alignItems='center' gap={1}>
                    <Typography variant='subtitle2'>RTO Post NDR</Typography>
                    <InfoIcon strokeColor={theme.palette.blue['200']} />
                  </Grid>
                  <Typography
                    fontWeight={700}
                    my={1}
                    color={theme.palette.blue['200']}
                  >
                    0%
                  </Typography>
                  <Typography variant='subtitle2'>(0)</Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>

        <Box mt={4}>
          <OrdersAndRevenue />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 4,
            mt: 4
          }}
        >
          <ZoneWiseDistribution />
          <DeliveryTimeline />
        </Box>
      </Box>
    </Box>
  )
}
