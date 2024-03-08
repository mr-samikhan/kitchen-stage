import React, { useRef } from 'react'
import { EXPORT_CSV_DATA } from '@cookup/constant'
import { Box, Button, Checkbox, Modal, Paper, Typography } from '@mui/material'

interface IExportProps {
  data?: {}[]
  record?: any[]
  title?: string
  isOpen: boolean
  filename?: string
  onClose: () => void
  onExport: () => void
  csvData: any[] | undefined
}

export const ExportCSVModal = (props: IExportProps) => {
  const { isOpen, data, onClose, onExport, csvData, record, filename, title } =
    props || {}

  let isArray = data ? data : EXPORT_CSV_DATA
  const [exportData, setExportData] = React.useState([])
  const [selectedLabels, setSelectedLabels] = React.useState(isArray)

  const downloadRef = useRef<any>(null)

  const handleCheckboxChange = (index: number) => {
    const newArray: any = [...selectedLabels]
    newArray[index].isChecked = !newArray[index].isChecked
    setSelectedLabels(newArray)
  }

  const handleExport = () => {
    let csvData_: any = []
    let csvDataHeader: any = []
    record?.forEach((dataItem: any) => {
      const filteredData: any = {}
      let selectedLabelsData: any = {}

      selectedLabels.forEach((item: any) => {
        if (item.isChecked) {
          filteredData[item.value] =
            dataItem[item.value] === undefined || dataItem[item.value] === null
              ? 'N/A'
              : dataItem[item.value]
          selectedLabelsData[item.label] = dataItem[item.label]
        }
      })
      csvDataHeader.push(selectedLabelsData)

      csvData_.push(filteredData)
    })
    setExportData(csvData_)

    const csvString = [
      Object.keys(csvDataHeader[0]).join(','), // header row
      ...csvData_.map((row: any) => Object.values(row).join(',')), // data rows
    ].join('\n')
    const blob = new Blob([csvString], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    downloadRef.current.href = url
    downloadRef.current.download = filename
    downloadRef.current.click()
    onExport()
  }

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
              {title || 'Export Support Tickets'}
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
            {selectedLabels?.map((item: any, index) => (
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
                <Checkbox
                  checked={item.isChecked}
                  color="secondary"
                  onChange={() => handleCheckboxChange(index)}
                />
              </Box>
            ))}
          </Box>
          <Box mt={2} display="flex" gap={2}>
            {/* <CSVLink
              data={exportData || []}
              filename={filename || 'support_file.csv'}
            > */}
            <Button
              fullWidth
              variant="contained"
              sx={{ width: 205 }}
              onClick={handleExport}
            >
              Export
            </Button>
            {/* </CSVLink> */}
            <Button
              variant="outlined"
              size="medium"
              onClick={onClose}
              sx={{ width: 130 }}
            >
              Cancel
            </Button>
          </Box>
          <a
            ref={downloadRef}
            style={{ display: 'none' }}
            href="/#"
            download={filename}
          >
            Download
          </a>
        </Paper>
      </Modal>
    </React.Fragment>
  )
}

export default ExportCSVModal
