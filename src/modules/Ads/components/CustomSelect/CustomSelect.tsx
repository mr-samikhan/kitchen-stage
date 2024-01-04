import React from 'react'
import { makeStyles } from '@mui/styles'
import { COLORS } from '@cookup/constant'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Box,
  Menu,
  Chip,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material'

const useStyles = makeStyles((theme) => ({
  customMenu: {
    width: '366px',
    color: 'white',
    backgroundColor: COLORS.secondary.light,
    boxShadow: 'box-shadow: 0px 8px 24px 0px #0000001A',
  },
  noElevation: {
    '&:focus': {
      boxShadow: 'box-shadow: 0px 8px 24px 0px #0000001A',
    },
  },
  noBackdrop: {
    backdropFilter: 'none',
    backgroundColor: 'transparent',
  },
  selected: {
    color: COLORS.primary.main,
  },
}))

interface CustomSelectProps {
  name: string
  icon?: string
  methods?: any
  adValues: any
  options?: {}[]
  label?: string
  placeholder?: string
  isMultiSelect?: boolean
  selectedValue?: string | number
  setSelectedValue?: (value: any) => void
  onMultiSelect?: (item: any, key: any) => void
}

export const CustomSelect = (props: CustomSelectProps) => {
  const {
    name,
    icon,
    label,
    options,
    methods,
    adValues,
    placeholder,
    isMultiSelect,
    onMultiSelect,
    selectedValue,
    setSelectedValue,
  } = props || {}

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  let value = methods.watch(name)
  let error = methods.formState.errors

  const handleMenuItemClick = (value: any) => {
    if (isMultiSelect) {
      onMultiSelect && onMultiSelect(value, name)
    } else {
      methods.setValue(name)
      methods.setValue(name, value)
      setSelectedValue && setSelectedValue(value)
    }
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <TextField
        name={name}
        fullWidth
        variant="outlined"
        value={selectedValue}
        placeholder={placeholder}
        error={!value && !!error[name]}
        className={classes.noElevation}
        helperText={!value && error[name] ? <>{error[name]?.message}</> : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleClick}>
              <IconButton>{icon || <KeyboardArrowDownIcon />}</IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        sx={{
          top: 50,
          left: -150,
          position: 'absolute',
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          className: classes.customMenu,
        }}
        BackdropProps={{
          classes: { root: classes.noBackdrop },
        }}
      >
        <Box display="flex" p={2} gap={2} flexWrap="wrap">
          <Typography
            variant="h6"
            width="100%"
            color="primary"
            fontFamily="Poppins"
          >
            {label}
          </Typography>
          {options?.map((item: any, index) => (
            <Chip
              key={index}
              label={item}
              onClick={() => handleMenuItemClick(item)}
              sx={{
                ...chipStyle,
                bgcolor: adValues[name].includes(item)
                  ? 'secondary.main'
                  : '#FFFF',
                border: adValues[name].includes(item)
                  ? undefined
                  : '1.3px solid #494746',
                color: adValues[name].includes(item)
                  ? COLORS.white
                  : COLORS.primary.main,
              }}
            />
          ))}
        </Box>
      </Menu>
      {isMultiSelect &&
        adValues[name].map(
          (item: any) =>
            options?.includes(item) && (
              <Chip label={item} color="secondary" sx={chipStyle} />
            )
        )}
    </>
  )
}

export default CustomSelect

const chipStyle = {
  height: 44,
  width: '97px',
  borderRadius: '21px',
  fontFamily: 'Poppins',
}
