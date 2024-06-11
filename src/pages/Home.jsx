import { Fragment } from 'react'
import { Grid } from '@mui/material'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import SideNav from '../components/SideNav'

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <Grid container component='main'>
        <SideNav />
        <Dashboard />
      </Grid>
    </Fragment>
  )
}
