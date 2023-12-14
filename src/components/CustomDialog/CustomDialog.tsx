import React, { ReactNode } from 'react'
import {
  Box,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material'

interface CustomDialogProps {
  sx?: any
  title?: string
  icon?: string
  text?: string
  subTitle?: string
  isOpen?: boolean
  onClose?: () => void
  children?: ReactNode
  isOkButton?: boolean
  okButtonText?: string
  onConfirm?: () => void
  cancelButtonText?: string
  isCancleButton?: boolean
  titleVariant?: string | any
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const CustomDialog = (props: CustomDialogProps) => {
  const {
    text,
    icon,
    title,
    onClose,
    children,
    titleVariant,
    subTitle,
    onConfirm,
    isOkButton,
    okButtonText,
    isOpen = false,
    isCancleButton,
    cancelButtonText,
    sx,
    setOpen = () => {},
  } = props || {}

  const onCloseModal = () => {
    return setOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={
          sx || {
            p: 5,
            textAlign: 'center',
            width: { xs: '320px', md: '456px' },
          }
        }
      >
        {icon && (
          <Box>
            <img src={icon} alt="modal-icon" />
          </Box>
        )}
        <DialogTitle variant={titleVariant || 'body2'}>{title}</DialogTitle>
        <Typography variant="subtitle1" color="grey.50">
          {subTitle}
        </Typography>
        <Typography variant="subtitle1" textAlign="justify">
          {text}
        </Typography>
        <DialogContent>{children}</DialogContent>
        <Box display="flex" gap={2} justifyContent="center">
          {isOkButton && (
            <Button variant="contained" onClick={onConfirm}>
              {okButtonText}
            </Button>
          )}
          {isCancleButton && (
            <Button variant="outlined" sx={{ width: 130 }}>
              {cancelButtonText}
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}

export default CustomDialog
