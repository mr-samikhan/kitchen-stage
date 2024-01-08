import * as React from 'react'
import { COLORS } from '@cookup/constant'
import { useFormContext } from 'react-hook-form'
import EventIcon from '@mui/icons-material/Event'
import { Box, Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface MuiCustomDatePickerProps {
  date?: Date
  methods?: any
  label?: string
  error?: boolean
  helperText?: string
  name?: string | undefined
  setDate?: (date: any) => void
}

export const MuiCustomDatePicker = (props: MuiCustomDatePickerProps) => {
  const { label, setDate, name, methods } = props || {}

  const ActionBarUI = ({ onCancel, onAccept }: any) => (
    <Box maxWidth={320}>
      <Box
        gap={4}
        px={2}
        bottom={20}
        display="flex"
        position="absolute"
        justifyContent="space-between"
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={onCancel}
          sx={{ width: 120, height: 50 }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          color="secondary"
          onClick={onAccept}
          variant="contained"
          sx={{ width: 120, height: 50 }}
        >
          Done
        </Button>
      </Box>
    </Box>
  )

  let errors = methods?.formState?.errors || {}

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          name={name}
          label={label}
          onChange={setDate}
          closeOnSelect={false}
          views={['year', 'month', 'day']}
          slots={{
            actionBar: ({ onAccept, onCancel }) => (
              <ActionBarUI onAccept={onAccept} onCancel={onCancel} />
            ),
            openPickerIcon: EventIcon as any,
            textField: (props) => (
              <TextField
                {...props}
                fullWidth
                error={name ? !!errors[name] : true}
                helperText={
                  name && errors[name] ? <>{errors[name]?.message}</> : ''
                }
              />
            ),
          }}
          slotProps={{
            leftArrowIcon: {
              sx: leftArrowStyle,
            },
            rightArrowIcon: {
              sx: {
                color: COLORS.secondary.main,
              },
            },
            calendarHeader: {
              sx: calendarStyle,
            },
            layout: {
              sx: layoutStyle,
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default MuiCustomDatePicker

const leftArrowStyle = {
  left: -220,
  color: 'red',
  position: 'absolute',
  '& .MuiPickersArrowSwitcher-spacer': {
    display: 'none',
  },
}

const layoutStyle = {
  position: 'relative',

  '& .MuiDateCalendar-root': {
    height: 383,
    maxHeight: 383,
  },
  '& .MuiButtonBase-root': {
    '&.MuiPickersDay-root': {
      '&.Mui-selected': {
        bgcolor: COLORS.secondary.main,
      },
    },
  },
}
const calendarStyle = {
  display: 'flex',
  '& .MuiPickersCalendarHeader-switchViewButton': {
    display: 'none',
  },
  '& .MuiPickersCalendarHeader-label': {
    ml: 10,
  },
}
