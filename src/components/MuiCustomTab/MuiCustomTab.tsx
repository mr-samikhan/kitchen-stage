import * as React from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import { SET_TAB_VALUE } from '@cookup/redux'
import { useDispatch, useSelector } from 'react-redux'

interface MuiCustomTabProps {
  labels?: {
    label: string
    value: string
  }[]
  width?: any
  value?: string
  className?: string
  setValue?: (newValue: string) => void
}

export const MuiCustomTab = (props: MuiCustomTabProps) => {
  const { labels, className, width } = props || {}

  const dispatch = useDispatch()
  const { tabValue } = useSelector((state: any) => state.user)

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: 'personal' | 'business'
  ) => {
    dispatch(SET_TAB_VALUE(newValue))
  }

  let ARRAY_CHECK = labels || [
    {
      label: 'Personal',
      value: 'personal',
    },
    {
      label: 'Business',
      value: 'business',
    },
  ]

  return (
    <React.Fragment>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        className={className || 'custom-tab'}
        // textColor={COLORS.white}
      >
        {ARRAY_CHECK.map((item, index) => (
          <Tab
            key={index}
            value={item.value}
            label={item.label}
            sx={{
              textTransform: 'capitalize',
              width: width,
            }}
          />
        ))}
      </Tabs>
    </React.Fragment>
  )
}

export default MuiCustomTab
