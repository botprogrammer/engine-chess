import { Suspense } from 'react'

// project import

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) =>
  (
    <Suspense fallback='Loading...'>
      <Component {...props} />
    </Suspense>
  )

export default Loadable
