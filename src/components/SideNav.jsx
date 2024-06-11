import { Grid, useTheme } from '@mui/material'
import DrawerItem from './DrawerItem'
import HomeIcon from '../components/svg/HomeIcon'
import InventoryIcon from '../components/svg/InventoryIcon'
import OrdersIcon from '../components/svg/OrdersIcon'
import TruckIcon from '../components/svg/TruckIcon'
import BillIcon from '../components/svg/BillIcon'
import AnalyticsIcon from '../components/svg/AnalyticsIcon'
import CustomerIcon from '../components/svg/CustomerIcon'
import SettingsIcon from '../components/svg/SettingsIcon'
import SignoutIcon from '../components/svg/SignoutIcon'

const drawerLinks = [
  { icon: HomeIcon, path: '/', title: 'Home' },
  { icon: InventoryIcon, path: '/inventory', title: 'Inventory' },
  { icon: OrdersIcon, path: '/orders', title: 'Orders' },
  { icon: TruckIcon, path: '/control-tower', title: 'Control Tower' },
  { icon: BillIcon, path: '/billing', title: 'Billing' },
  { icon: AnalyticsIcon, path: '/analytics', title: 'Analytics' },
  { icon: CustomerIcon, path: '/customers', title: 'Customers' },
  { icon: SettingsIcon, path: '/settings', title: 'Settings' },
  { icon: SignoutIcon, path: '/sign-out', title: 'Sign Out' }
]

export default function SideNav() {
  const theme = useTheme()
  return (
    <Grid
      container
      flexDirection='column'
      gap={1}
      sx={{
        p: 2,
        maxWidth: 200,
        background: theme.palette.blue['200']
      }}
    >
      {drawerLinks.map(({ icon, path, title }) => {
        return (
          <DrawerItem
            key={path}
            icon={icon}
            path={path}
            title={title}
            isActive={path === '/'}
          />
        )
      })}
    </Grid>
  )
}
