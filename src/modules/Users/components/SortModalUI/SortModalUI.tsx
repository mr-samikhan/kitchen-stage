import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useDispatch, useSelector } from 'react-redux'
import FormControlLabel from '@mui/material/FormControlLabel'
import { SET_FILTER_TYPE, SET_SORT_TYPE } from '@cookup/redux'
import { Box, Chip, Divider, Grid, Typography } from '@mui/material'
import {
  COLORS,
  GENDER_ARRAY,
  AGE_RANGE_ARRAY,
  EXPERIENCED_ARRAY,
  BUSINESS_TYPES_ARRAY,
} from '@cookup/constant'

interface SortModalUIProps {
  isSortUI?: boolean
  isFilterUI?: boolean
  isBusinessFilter?: boolean
}

export const SortModalUI = (props: SortModalUIProps) => {
  const { isSortUI, isFilterUI, isBusinessFilter } = props || {}

  const dispatch = useDispatch()

  const { sortBy, filterBy } = useSelector((state: any) => state.user)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SET_SORT_TYPE((event.target as HTMLInputElement).value))
  }

  const onExpFilter = (item: any) => {
    const selectedIdx = filterBy.experience.indexOf(item)

    if (selectedIdx !== -1) {
      const updatedExperience = filterBy.experience.filter(
        (el: any) => el !== item
      )
      dispatch(SET_FILTER_TYPE({ experience: updatedExperience }))
    } else {
      const updatedExperience = [...filterBy.experience, item]
      dispatch(SET_FILTER_TYPE({ experience: updatedExperience }))
    }
  }

  const onAgeFilter = (item: any) => {
    const selectedIdx = filterBy.ageRange.indexOf(item)

    if (selectedIdx !== -1) {
      const updatedageRange = filterBy.ageRange.filter((el: any) => el !== item)
      dispatch(SET_FILTER_TYPE({ ageRange: updatedageRange }))
    } else {
      const updatedageRange = [...filterBy.ageRange, item]
      dispatch(SET_FILTER_TYPE({ ageRange: updatedageRange }))
    }
  }

  const onSelectGender = (item: any) => {
    const selectedIdx = filterBy.gender.indexOf(item)

    if (selectedIdx !== -1) {
      const updatedGender = filterBy.gender.filter((el: any) => el !== item)
      dispatch(SET_FILTER_TYPE({ gender: updatedGender }))
    } else {
      const updatedGender = [...filterBy.gender, item]
      dispatch(SET_FILTER_TYPE({ gender: updatedGender }))
    }
  }

  const onBusinessFilter = (item: any) => {
    const selectedIdx = filterBy.businessType.indexOf(item)

    if (selectedIdx !== -1) {
      const updatedbusinessType = filterBy.businessType.filter(
        (el: any) => el !== item
      )
      dispatch(SET_FILTER_TYPE({ businessType: updatedbusinessType }))
    } else {
      const updatedbusinessType = [...filterBy.businessType, item]
      dispatch(SET_FILTER_TYPE({ businessType: updatedbusinessType }))
    }
  }

  return (
    <React.Fragment>
      {isSortUI && (
        <React.Fragment>
          <Box
            mt={2}
            px={2}
            height={63}
            display="flex"
            alignItems="center"
            bgcolor={COLORS.grey.dark}
          >
            <Typography variant="subtitle2" color="primary">
              Name
            </Typography>
          </Box>
          <Box mt={2} px={2} height={40}>
            <Typography
              color="primary"
              variant="subtitle2"
              fontFamily="SF Pro Display"
            >
              State
            </Typography>
          </Box>
          <Box mt={2} px={2} height={40}>
            <Typography
              color="primary"
              variant="subtitle2"
              fontFamily="SF Pro Display"
            >
              Date Joined
            </Typography>
          </Box>
          <Box mt={2} px={2} height={40}>
            <Typography
              color="primary"
              variant="subtitle2"
              fontFamily="SF Pro Display"
            >
              All
            </Typography>
          </Box>
          <Box mt={2} px={2}>
            <Divider />
          </Box>
        </React.Fragment>
      )}

      {isFilterUI && (
        <>
          <Grid container>
            <Grid item md={11}>
              <Box mt={2} px={2} display="flex" alignItems="center">
                <Typography variant="subtitle2" color="primary">
                  Experience
                </Typography>
              </Box>
              <Box
                mt={2}
                px={2}
                gap={3}
                display="flex"
                flexWrap="wrap"
                alignItems="center"
              >
                {EXPERIENCED_ARRAY.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onClick={() => onExpFilter(item)}
                    className={
                      filterBy.experience.includes(item)
                        ? 'selected'
                        : 'custom-chip'
                    }
                  />
                ))}
              </Box>
              <Grid item md={6} mt={2}>
                <Divider />
              </Grid>
              <Box mt={2} px={2} display="flex" alignItems="center">
                <Typography variant="subtitle2" color="primary">
                  Age Range
                </Typography>
              </Box>
              <Box
                mt={2}
                px={2}
                gap={3}
                display="flex"
                flexWrap="wrap"
                alignItems="center"
              >
                {AGE_RANGE_ARRAY.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onClick={() => onAgeFilter(item)}
                    className={
                      filterBy.ageRange.includes(item)
                        ? 'selected'
                        : 'custom-chip'
                    }
                  />
                ))}
              </Box>
              <Grid item md={6} mt={2}>
                <Divider />
              </Grid>
              <Box mt={2} px={2} display="flex" alignItems="center">
                <Typography variant="subtitle2" color="primary">
                  Gender
                </Typography>
              </Box>
              <Box
                mt={2}
                px={2}
                gap={3}
                display="flex"
                flexWrap="wrap"
                alignItems="center"
              >
                {GENDER_ARRAY.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onClick={() => onSelectGender(item)}
                    className={
                      filterBy.gender.includes(item)
                        ? 'selected'
                        : 'custom-chip'
                    }
                  />
                ))}
              </Box>
            </Grid>
            <Grid item md={6} mt={2}>
              <Divider />
            </Grid>
          </Grid>
        </>
      )}

      {isBusinessFilter && (
        <>
          <Box mt={2} px={2} display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary">
              Business Type
            </Typography>
          </Box>
          <Box
            mt={2}
            px={2}
            gap={3}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
          >
            {BUSINESS_TYPES_ARRAY.map((item) => (
              <Chip
                key={item}
                label={item}
                onClick={() => onBusinessFilter(item)}
                className={
                  filterBy.businessType.includes(item)
                    ? 'selected'
                    : 'custom-chip'
                }
              />
            ))}
          </Box>
        </>
      )}

      <Box mt={2} px={2}>
        <RadioGroup value={sortBy.sortType} onChange={handleChange}>
          <FormControlLabel
            sx={fontStyle}
            value="ascending"
            label="Ascending"
            control={<Radio color="secondary" sx={iconStyle} />}
          />
          <FormControlLabel
            sx={fontStyle}
            value="descending"
            label="Descending"
            control={<Radio color="secondary" sx={iconStyle} />}
          />
        </RadioGroup>
      </Box>
    </React.Fragment>
  )
}

export default SortModalUI

const fontStyle = {
  '& .MuiTypography-root': {
    fontSize: '1rem',
  },
}

const iconStyle = {
  '& .MuiSvgIcon-root': {
    fontSize: 30,
  },
}
