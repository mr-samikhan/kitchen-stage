import React from 'react'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'

interface IMessageProps {
  reason: string
  onReply: () => void
  onCancel: () => void
  isSender?: boolean
}

export const MessageModal = (props: IMessageProps) => {
  const { onCancel, onReply, isSender, reason } = props || {}

  return (
    <React.Fragment>
      <Box textAlign="center">
        <Box>
          <img src="/assets/icons/mail.svg" alt="" />
        </Box>
        <Typography
          variant="h4"
          fontSize={20}
          color="primary"
          fontFamily="Poppins"
        >
          Support Message
        </Typography>
      </Box>
      <Typography
        variant="subtitle1"
        color="secondary"
        fontFamily="Poppins"
        py={3}
      >
        Reason: [{reason || 'N/A'}]
      </Typography>
      <Typography variant="subtitle1" color="primary" fontFamily="Poppins">
        Message:
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary"
        fontFamily="Poppins"
        fontWeight={500}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci in eu
        tortor aliquam id augue at scelerisque. Arcu justo, id sed mauris, fusce
        nunc. Duis in vel pellentesque vitae arcu.
      </Typography>
      <Box py={2}>
        <Divider />
      </Box>
      <Box py={2}>
        <TextField placeholder="Type Message..." fullWidth rows={5} multiline />
      </Box>
      <Box display="flex" gap={2} py={2}>
        <Button variant="contained" fullWidth onClick={onReply}>
          {isSender ? 'Send' : 'Reply'}
        </Button>
        <Button variant="outlined" sx={{ width: 130 }} onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default MessageModal
