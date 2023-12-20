import React from 'react'
import { COLORS } from '@cookup/constant'
import { CustomDropdown } from '../components'
import { CustomTextField } from '@cookup/components'
import { Box, Button, Grid, Typography } from '@mui/material'

interface SuspendModalUIProps {
  methods?: any
  onSevenDaysSuspend?: () => void
}

export const SuspendModalUI = (props: SuspendModalUIProps) => {
  const { methods, onSevenDaysSuspend } = props || {}
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} position="relative">
          <Typography variant="subtitle1" textAlign="left">
            Please select a time range for suspending the selected user.
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onSevenDaysSuspend}
            >
              Suspend 7 days
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" textAlign="center">
              Or
            </Typography>
          </Box>
          <Box mt={2}>
            <CustomTextField
              fullWidth
              name="days"
              type="number"
              placeholder="Enter suspended days(upto 65 days)"
            />
          </Box>
        </Grid>
        <Grid item xs={12} position="relative" mt={2}>
          <CustomDropdown methods={methods} />
          <Box mt={2}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: COLORS.wine.dark,
              }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default SuspendModalUI
