import {
  AppBar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import NavLogo from './svg/NavLogo'
import SearchIcon from './svg/SearchIcon'
import AddIcon from './svg/AddIcon'
import DownloadIcon from './svg/DownloadIcon'
import NotificationIcon from './svg/NotificationIcon'
import WalletIcon from './svg/WalletIcon'

const originOptions = [
  { option: 'Profile', value: 1 },
  { option: 'Settings', value: 2 },
  { option: 'Logout', value: 3 }
]

export default function Navbar() {
  const theme = useTheme()

  const { blue, shadow } = theme.palette

  return (
    <AppBar
      position='static'
      sx={{
        px: 2,
        py: 2,
        bgcolor: 'transparent',
        boxShadow: shadow['100'],
        position: 'relative',
        background: 'white'
      }}
    >
      <Grid container justifyContent='space-between' alignItems='center'>
        <Box>
          <NavLogo width={120} />
        </Box>

        <Grid container alignItems='center' width='max-content' gap={2}>
          <Grid container width='max-content' gap={2}>
            <Box sx={{ boxShadow: shadow['100'], borderRadius: 2, p: 1.5 }}>
              <Typography sx={{ color: blue['200'] }}>
                App Credits: ₹1702
              </Typography>
            </Box>
            <Button variant='contained' startIcon={<WalletIcon width={24} />}>
              <Typography>Recharge</Typography>
            </Button>
          </Grid>

          {/* Search and Icon Buttons */}
          <TextField
            sx={{
              border: '1px solid #eaeaea',
              borderRadius: 3,
              background: '#eaeaea'
            }}
            placeholder='Search'
            InputProps={{
              startAdornment: (
                <Grid
                  container
                  alignItems='center'
                  width='max-content'
                  sx={{ mr: 0 }}
                >
                  <SearchIcon width={20} strokeColor='grey' />
                </Grid>
              )
            }}
          />

          <Tooltip title='Add an item' arrow>
            <IconButton
              sx={{
                background: '#eaeaea',
                borderRadius: 3,
                '&:hover': { background: '#e1e1e1' }
              }}
            >
              <AddIcon width={28} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Download data' arrow>
            <IconButton
              sx={{
                background: '#eaeaea',
                borderRadius: 3,
                '&:hover': { background: '#e1e1e1' }
              }}
            >
              <DownloadIcon width={28} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Notifications' arrow>
            <IconButton
              sx={{
                background: '#eaeaea',
                borderRadius: 3,
                '&:hover': { background: '#e1e1e1' }
              }}
            >
              <NotificationIcon width={28} />
            </IconButton>
          </Tooltip>

          {/* FOr switch user */}
          <Button variant='text'>
            <Typography fontWeight={700}>Switch Back</Typography>
          </Button>

          {/* For SIgn in User Info */}
          <Typography variant='body2' color='grey'>
            Signed in as demoaccount@wareiq.com
          </Typography>

          {/* FOr ORigin */}
          <Box>
            <FormControl sx={{ width: 120 }}>
              <InputLabel id='origin'>Origin</InputLabel>
              <Select
                labelId='origin'
                id='origin'
                label='Origin'
                onChange={console.log('ok')}
              >
                {originOptions.map(({ value, option }) => {
                  return (
                    <MenuItem key={value} value={value}>
                      {option}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  )
}
