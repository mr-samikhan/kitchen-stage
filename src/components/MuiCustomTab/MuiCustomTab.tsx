import * as React from 'react'
import { COLORS } from '@muc/constant'
import { Tabs, Tab, Box } from '@mui/material'

interface MuiCustomTabProps {
  value?: string
  setValue?: (newValue: string) => void
}

export const MuiCustomTab = (props: MuiCustomTabProps) => {
  const {} = props || {}

  const [value, setValue] = React.useState('one')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <Tabs
        className="custom-tab"
        value={value}
        onChange={handleChange}
        textColor={COLORS.white}
      >
        <Tab value="one" label="Personal" />
        <Tab value="two" label="Business" />
      </Tabs>
    </React.Fragment>
  )
}

export default MuiCustomTab
