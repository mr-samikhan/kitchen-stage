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
import { useBreakpints } from '@cookup/hooks'
import { ISortItem } from 'types/FormResolvers'
import { CLOSE_SORT_MODAL } from '@cookup/redux'
import CloseIcon from '@mui/icons-material/Close'
import { ChevronRight } from '@mui/icons-material'
import { COLORS, SORT_MODAL_ARRAY } from '@cookup/constant'

export const CustomSortModal = () => {
  const { mobileMode, tabMode } = useBreakpints()

  const dispatch = useDispatch()

  const onSelectValues = (item: ISortItem) => {
    console.log(item)
  }

  let CHECK = mobileMode || tabMode
  const shouldTranslate = mobileMode && CHECK

  return (
    <Paper
      sx={{
        p: 2,
        width: 300,
        height: 'auto',
        position: 'absolute',
        borderRadius: '20px',
        right: { xs: 0, sm: 0, md: 150 },
        top: { xs: '50%', sm: '50%', md: 50 },
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
          Sort By
        </Typography>
        <IconButton onClick={() => dispatch(CLOSE_SORT_MODAL())}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
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
    </Paper>
  )
}

export default CustomSortModal
