import {
  Box,
  Paper,
  Divider,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useBreakPoints } from '@cookup/hooks'
import { ISortItem } from 'types/FormResolvers'
import CloseIcon from '@mui/icons-material/Close'
import { ChevronRight } from '@mui/icons-material'
import { COLORS, SORT_MODAL_ARRAY } from '@cookup/constant'
import { CLOSE_SORT_MODAL, SET_FILTER_MODAL } from '@cookup/redux'

interface CustomSortModalProps {
  height?: any
  top?: number
  padding?: any
  title?: string
  width?: any
  children?: React.ReactNode
}

export const CustomSortModal = (props: CustomSortModalProps) => {
  const { children, top, padding, height, title, width } = props || {}
  const { mobileMode, tabMode } = useBreakPoints()

  const dispatch = useDispatch()

  const onSelectValues = (item: ISortItem) => {
    console.log(item)
  }

  let CHECK = mobileMode || tabMode
  const shouldTranslate = mobileMode && CHECK

  return (
    <Paper
      sx={{
        zIndex: 1,
        width: width || 300,
        position: 'absolute',
        borderRadius: '20px',
        height: height || 'auto',
        p: padding ? padding : 2,
        right: { xs: 0, sm: 0, md: 150 },
        top: { xs: '50%', sm: '50%', md: top || 50 },
        left: shouldTranslate ? '50%' : undefined,
        dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        transform: shouldTranslate ? 'translate(-50%, -50%)' : undefined,
      }}
    >
      <Box
        px={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="subtitle2" color="primary">
          {title || 'Sort By'}
        </Typography>
        <IconButton
          onClick={() => {
            dispatch(SET_FILTER_MODAL(false))
            dispatch(CLOSE_SORT_MODAL())
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {children || (
        <>
          {SORT_MODAL_ARRAY.map((item, index) => (
            <Box
              px={2}
              display="flex"
              gap={2}
              mt={1}
              key={index}
              onClick={() => onSelectValues(item)}
            >
              <Typography variant="subtitle2">{item.title}</Typography>
              <Typography variant="subtitle2" color="grey">
                {item.value}
              </Typography>
            </Box>
          ))}
          <Box
            mt={2}
            px={2}
            height={60}
            display="flex"
            alignItems="center"
            bgcolor={COLORS.grey.dark}
          >
            <Typography variant="subtitle2" color="primary">
              Custom Range
            </Typography>
          </Box>
          <Box px={2} mt={2}>
            <Typography variant="subtitle2">Start Date</Typography>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              className="start-end-date"
              placeholder="Choose Date"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <ChevronRight />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box px={2} mt={2}>
            <Typography variant="subtitle2">End Date</Typography>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              placeholder="Choose Date"
              className="start-end-date"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <ChevronRight />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </>
      )}
    </Paper>
  )
}

export default CustomSortModal
