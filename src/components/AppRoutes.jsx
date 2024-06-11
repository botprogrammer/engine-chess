import { lazy } from 'react'

import MainLayout from '../ui/layout/MainLayout'
import Loadable from '@components/Loadable'

const DashboardDefault = Loadable(lazy(() => import('@pages/dashboard')))

// render - checklists
const CreateNewChecklist = Loadable(
  lazy(() => import('@pages/checklists/CreateNewChecklist'))
)
const EditChecklist = Loadable(
  lazy(() => import('@pages/checklists/EditChecklist'))
)
const AllChecklists = Loadable(
  lazy(() => import('@pages/checklists/AllChecklists'))
)

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },

    // For Checklists
    {
      path: 'checklists/new',
      element: <CreateNewChecklist />
    },
    {
      path: 'checklists/:action/:checklist_id',
      element: <EditChecklist />
    },
    {
      path: 'checklists/all',
      element: <AllChecklists />
    }
  ]
}

export default MainRoutes
