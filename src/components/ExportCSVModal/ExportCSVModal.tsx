import React from 'react'
import { EXPORT_CSV_DATA } from '@cookup/constant'
import { Box, Button, Checkbox, Modal, Paper, Typography } from '@mui/material'

interface IExportProps {
  isOpen: boolean
  data?: {}[]
  onClose: () => void
  onExport: () => void
}

export const ExportCSVModal = (props: IExportProps) => {
  const { isOpen, data, onClose, onExport } = props || {}

  let isArray = data ? data : EXPORT_CSV_DATA

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Paper
          sx={{
            p: 3,
            width: { xs: 320, md: 400 },
            top: '50%',
            left: '50%',
            position: 'absolute',
            borderRadius: '16px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Box textAlign="center">
            <Box>
              <img
                alt="ExportCSVModal"
                src="/assets/icons/warn-icon.svg"
                style={{
                  width: '36px',
                  height: '36px',
                }}
              />
            </Box>
            <Typography
              mt={2}
              fontFamily="Poppins"
              fontSize={20}
              fontWeight={600}
            >
              Export Support Tickets
            </Typography>
            <Typography variant="h6" fontWeight={500} fontFamily="Poppins">
              Select info you want to include in CSV
            </Typography>
          </Box>
          <Box
            py={2}
            display="flex"
            flexWrap="wrap"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            {isArray.map((item: any, index) => (
              <Box
                height={25}
                key={index}
                width={210}
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontFamily="Poppins"
                    fontWeight={item.value === 'email' ? 100 : undefined}
                    color={item.value === 'email' ? 'primary' : undefined}
                    fontStyle={item.value === 'email' ? 'italic' : undefined}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Checkbox checked={item.isChecked} color="secondary" />
              </Box>
            ))}
          </Box>
          <Box mt={2} display="flex" gap={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{ width: 205 }}
              onClick={onExport}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={onClose}
              sx={{ width: 130 }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </React.Fragment>
  )
}

export default ExportCSVModal
