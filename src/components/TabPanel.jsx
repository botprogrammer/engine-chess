import { Box } from '@mui/material'

export default function TabPanel({ children, value, index }) {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index ? <Box>{children}</Box> : null}
    </div>
  )
}
