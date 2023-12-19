import React from 'react'
import { COLORS } from '@cookup/constant'
import { Box, Button, Grid, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

interface TableFooterProps {
  isExportCSV?: boolean
  isPaginationIcons?: boolean
}

export const TableFooter = (props: TableFooterProps) => {
  const { isExportCSV, isPaginationIcons } = props || {}

  return (
    <React.Fragment>
      {isPaginationIcons && (
        <Grid
          item
          md={6}
          xs={6}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box display="flex" gap={3} justifyContent="flex-end">
            <IconButton>
              <ChevronLeft
                sx={{
                  color: COLORS.grey.main,
                }}
              />
            </IconButton>
            <IconButton>
              <ChevronRight color="error" />
            </IconButton>
          </Box>
        </Grid>
      )}
      <Grid item md={!isPaginationIcons ? 11 : 6} xs={6} textAlign="end">
        {isExportCSV && (
          <Box>
            <Button
              color="primary"
              variant="contained"
              sx={{ p: 1.5, borderRadius: '12px' }}
            >
              EXPORT CSV
            </Button>
          </Box>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default TableFooter
