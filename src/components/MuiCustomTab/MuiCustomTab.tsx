import * as React from 'react'
import { COLORS } from '@cookup/constant'
import { Tabs, Tab, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { SET_TAB_VALUE } from '@cookup/redux'

interface MuiCustomTabProps {
  value?: string
  setValue?: (newValue: string) => void
}

export const MuiCustomTab = (props: MuiCustomTabProps) => {
  const {} = props || {}

  const dispatch = useDispatch()
  const { tabValue } = useSelector((state: any) => state.user)

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: 'personal' | 'business'
  ) => {
    dispatch(SET_TAB_VALUE(newValue))
  }

  return (
    <React.Fragment>
      <Tabs
        value={tabValue}
        className="custom-tab"
        onChange={handleChange}
        // textColor={COLORS.white}
      >
        <Tab value="personal" label="Personal" />
        <Tab value="business" label="Business" />
      </Tabs>
    </React.Fragment>
  )
}

export default MuiCustomTab
