import React from 'react'
import { makeStyles } from '@mui/styles'
import { COLORS } from '@cookup/constant'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Menu,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material'

const useStyles = makeStyles((theme) => ({
  customMenu: {
    width: '238px',
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

interface CustomDropdownProps {
  methods?: any
}

export const CustomDropdown = (props: CustomDropdownProps) => {
  const { methods } = props || {}

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedValue, setSelectedValue] = React.useState('')

  const resaon = methods.watch('reason')

  const handleMenuItemClick = (value: any) => {
    methods.setValue('reason', value)
    setSelectedValue(value)
    handleClose()
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
        fullWidth
        variant="outlined"
        // onClick={handleClick}
        value={selectedValue}
        placeholder="Reason"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleClick}>
              <IconButton>
                <KeyboardArrowDownIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className={classes.noElevation}
        error={methods.formState.errors.reason ? true : false}
        helperText={methods.formState.errors.reason?.message}
      />
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        sx={{ position: 'absolute', left: -120 }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        PaperProps={{
          className: classes.customMenu,
        }}
        BackdropProps={{
          classes: { root: classes.noBackdrop },
        }}
      >
        {['Inappropriate Posts', 'Harrasment'].map((item, index) => (
          <MenuItem
            onClick={() => handleMenuItemClick(item)}
            key={index}
            className={item === resaon ? classes.selected : ''}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default CustomDropdown
