import React from 'react'
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from '@mui/material'
import { COLORS } from '@cookup/constant'

interface ILikesModal {
  data: any[]
  open: boolean
  title: string
  length: number
  userName: string
  userImage?: string
  onClose: () => void
  isCommentsUI: boolean
  onDelete: (id: string | number) => void
}

export const LikesModal = (props: ILikesModal) => {
  const {
    open,
    onClose,
    userName,
    title,
    length,
    onDelete,
    data,
    isCommentsUI,
  } = props || {}
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        elevation={0}
        sx={{
          top: '50%',
          left: '50%',
          overflow: 'hidden',
          bgcolor: '#FFFF',
          borderRadius: '20px',
          position: 'absolute',
          p: '20px 20px 0px 20px',
          width: { xs: '100%', md: 500 },
          height: { xs: '100%', md: 700 },
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box display="flex" gap={2} alignItems="center">
          <IconButton onClick={onClose}>
            <img src="/assets/icons/chevron-left.svg" alt="chevron" />
          </IconButton>
          <Box>
            <Typography variant="h4" color="secondary">
              {userName}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h3" color="secondary" textAlign="center" mt={4}>
          {title}
        </Typography>
        <Typography variant="h6" color="primary" textAlign="end" mt={4}>
          {`Total ${title}: ${length}`}
        </Typography>
        <Box height={{ xs: 700, md: 500 }} overflow="auto">
          <Box width="100%">
            {data?.length === 0 && (
              <Typography
                variant="h6"
                color="primary"
                textAlign="center"
                mt={4}
              >
                {`No ${isCommentsUI ? 'Comments' : 'likes'} found`}
              </Typography>
            )}
            {data?.map((item, index) => (
              <Box
                p={2}
                mt={1}
                key={index}
                display="flex"
                borderRadius="5px"
                alignItems="center"
                bgcolor="#F6F6F6"
                justifyContent="space-between"
              >
                <Box display="flex" gap={2}>
                  <Avatar
                    src={item.userImage}
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  <Box>
                    <Typography variant="h6" color="secondary">
                      {item.userName}
                    </Typography>
                    {isCommentsUI && (
                      <>
                        <Typography variant="h6" color="secondary">
                          {item.comment}
                        </Typography>
                        <Box display="flex" gap={2}>
                          <Typography variant="h6" color={COLORS.input.main}>
                            {item.time}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box
                              height={5}
                              width={5}
                              borderRadius="100%"
                              bgcolor={COLORS.input.main}
                            ></Box>
                            <Typography variant="h6" color={COLORS.input.main}>
                              {`${item.totalLikes}`}
                            </Typography>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
                <IconButton onClick={() => onDelete(item)}>
                  <img src="/assets/icons/delete-icon.svg" alt="chevron" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}

export default LikesModal
