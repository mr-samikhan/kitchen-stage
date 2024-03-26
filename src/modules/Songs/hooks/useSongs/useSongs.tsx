import React from 'react'
import { useForm } from 'react-hook-form'
import { MusicFormResolver } from '@cookup/utils'
import { IAddSongResolver } from '@cookup/types'

export interface ISingleItem {
  title: string
  artist: string
  time: string
}

const useSongs = () => {
  const [songValues, setSongValues] = React.useState<any>({
    showModal: false,
    isEdit: false,
    showPlayer: false,
    selectedIndex: null,
    singleItem: null,
    addModalModal: false,
  })

  const methods = useForm<any>({
    resolver: MusicFormResolver,
    mode: 'onSubmit',
  })
  console.log(methods.formState.errors)

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
    setSongValues((prev: any) => ({
      ...prev,
      addModal: true,
      isEdit: true,
    }))
  }

  const onDelete = (item: ISingleItem) => {
    console.log('delete', item)
  }

  const onSubmit = (data: IAddSongResolver) => {
    console.log(data)
  }

  return {
    onEdit,
    methods,
    onSubmit,
    onDelete,
    onRowClick,
    songValues,
    setSongValues,
  }
}

export default useSongs
