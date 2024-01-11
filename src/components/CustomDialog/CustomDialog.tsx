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
  textVariant?: any
  fontFamily?: string
  onClose?: () => void
  onCancel?: () => void
  children?: ReactNode
  isOkButton?: boolean
  okButtonStyle?: {}
  textPosition?: any
  okButtonText?: string
  onConfirm?: () => void
  cancelButtonText?: string
  isCancleButton?: boolean
  titleVariant?: string | any
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const CustomDialog = (props: CustomDialogProps) => {
  const {
    sx,
    text,
    icon,
    title,
    onClose,
    children,
    subTitle,
    onCancel,
    onConfirm,
    fontFamily,
    isOkButton,
    textVariant,
    textPosition,
    okButtonText,
    titleVariant,
    okButtonStyle,
    isOpen = false,
    isCancleButton,
    cancelButtonText,
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
        <Typography variant="subtitle1" color="grey.50" fontFamily={fontFamily}>
          {subTitle}
        </Typography>
        <Typography
          fontFamily={fontFamily}
          variant={textVariant ? textVariant : 'subtitle1'}
          textAlign={textPosition ? textPosition : 'justify'}
        >
          {text}
        </Typography>
        <DialogContent>{children}</DialogContent>
        <Box display="flex" gap={2} justifyContent="center">
          {isOkButton && (
            <Button variant="contained" onClick={onConfirm} sx={okButtonStyle}>
              {okButtonText}
            </Button>
          )}
          {isCancleButton && (
            <Button
              variant="outlined"
              sx={{ width: 130 }}
              onClick={onCancel || onClose}
            >
              {cancelButtonText}
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}

export default CustomDialog
