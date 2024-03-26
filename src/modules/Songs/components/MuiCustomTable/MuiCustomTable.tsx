import React from 'react'
import { CustomTooltip } from '../components'
import { ISingleItem } from '../../hooks/useSongs/useSongs'
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
  onIconClick: () => void
  selectedIndex: number | null
  onEdit: (item: ISingleItem) => void
  onDelete: (item: ISingleItem) => void
  setSelectedIndex: (index: number) => void
  onRowClick: (data: ISingleItem, index: number) => void
}

const MuiCustomTable = (props: MuiCustomTableProps) => {
  const {
    data,
    onEdit,
    onDelete,
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
              onClick={() => {
                onRowClick(data[index], index)
              }}
              sx={{
                position: 'relative',
              }}
            >
              <TableCell>{title}</TableCell>
              <TableCell>{time}</TableCell>
              <TableCell>{artist}</TableCell>
              <TableCell>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedIndex(index)
                    onIconClick()
                  }}
                >
                  <img src="/assets/icons/three-dot.svg" alt="three-dot" />
                </IconButton>
                {selectedIndex === index && showModal && (
                  <CustomTooltip
                    onEdit={() => onEdit(data[index])}
                    onDelete={() => onDelete(data[index])}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default MuiCustomTable
