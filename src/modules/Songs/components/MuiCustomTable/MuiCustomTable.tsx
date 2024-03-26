import React from 'react'
import { CustomTooltip } from '../components'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
} from '@mui/material'

interface MuiCustomTableProps {
  data: any[]
  showModal: boolean
  onRowClick: () => void
  onIconClick: () => void
  selectedIndex: number | null
  setSelectedIndex: (index: number) => void
}

const MuiCustomTable = (props: MuiCustomTableProps) => {
  const {
    data,
    showModal,
    onRowClick,
    onIconClick,
    selectedIndex,
    setSelectedIndex,
  } = props || {}

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(({ title, time, artist }, index) => (
            <TableRow
              key={index}
              onClick={onRowClick}
              sx={{
                position: 'relative',
              }}
            >
              <TableCell>{title}</TableCell>
              <TableCell>{time}</TableCell>
              <TableCell>{artist}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    setSelectedIndex(index)
                    onIconClick()
                  }}
                >
                  <img src="/assets/icons/three-dot.svg" alt="three-dot" />
                </IconButton>
                {selectedIndex === index && <CustomTooltip />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default MuiCustomTable
