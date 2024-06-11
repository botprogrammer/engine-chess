import merge from 'lodash.merge'

import Button from './Button'
import Card from './Card'
import Chip from './Chip'
import TextField from './TextField'
import Select from './Select'
import Typography from './Typography'
import Tab from './Tab'
import Tabs from './Tabs'

// ==============================|| OVERRIDES - COmponents ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(
    Button(theme),
    Card(theme),
    Chip(theme),
    TextField(theme),
    Select(theme),
    Typography(theme),
    Tabs(theme),
    Tab(theme)
  )
}
