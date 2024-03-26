import React from 'react'

export interface ISingleItem {
  title: string
  artist: string
  time: string
}

const useSongs = () => {
  const [songValues, setSongValues] = React.useState<any>({
    showModal: false,
    showPlayer: false,
    selectedIndex: null,
    singleItem: null,
    addModalModal: false,
  })

  const onRowClick = (item: ISingleItem, index: number) => {
    console.log(item)

    setSongValues((prev: any) => ({
      ...prev,
      singleItem: item,
      selectedIndex: index,
      showPlayer: index === prev.selectedIndex ? !prev.showPlayer : true,
    }))
  }

  const onEdit = (item: ISingleItem) => {
    console.log('edit', item)
  }
  const onDelete = (item: ISingleItem) => {
    console.log('delete', item)
  }

  return { songValues, setSongValues, onRowClick, onEdit, onDelete }
}

export default useSongs
