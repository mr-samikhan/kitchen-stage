import React from 'react'
import { COLORS } from '@cookup/constant'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SUSPENSION_SUCCESS, SET_UNSUSPEND_USER } from '@cookup/redux'

export const SuspensionAlert = () => {
  const dispatch = useDispatch()

  const { isUserSuspened } = useSelector((state: any) => state.header)

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(SET_SUSPENSION_SUCCESS(false))
      dispatch(SET_UNSUSPEND_USER(false))
    }, 3000)
  }, [])

  return (
    <React.Fragment>
      <Box
        top={50}
        width={250}
        height={50}
        display="flex"
        borderRadius="7px"
        position="absolute"
        alignItems="center"
        justifyContent="center"
        bgcolor={COLORS.transparentOrange}
      >
        <Typography variant="subtitle1" textAlign="center" color="secondary">
          {!isUserSuspened
            ? 'User suspended until July 7, 2021'
            : 'User unsuspended'}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default SuspensionAlert
