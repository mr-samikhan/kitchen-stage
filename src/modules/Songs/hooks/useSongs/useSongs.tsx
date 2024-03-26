import React from 'react'
import { Api } from '@cookup/services'
import { useForm } from 'react-hook-form'
import { MusicFormResolver } from '@cookup/utils'
import { IAddSongResolver } from '@cookup/types'
import { useMutation, useQueryClient } from 'react-query'

export interface ISingleItem {
  title: string
  artist: string
  time: string
  id: string
  file: {
    name: string
    url: string
    size: number
  }
}

const useSongs = () => {
  const queryClient = useQueryClient()

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
    defaultValues: {
      title: songValues.isEdit ? songValues.singleItem?.title : '',
      artist: songValues.isEdit ? songValues.singleItem?.artist : '',
      time: songValues.isEdit ? songValues.singleItem?.time : '',
      file: songValues.isEdit ? songValues.singleItem?.file : null,
    },
  })

  //muatation for saving & updating data
  const { mutate, isLoading } = useMutation(
    songValues.isEdit ? Api.music.updateMusic : Api.music.addMusic,
    {
      onSuccess: () => {
        methods.reset()
        queryClient.invalidateQueries('getMusics')
        setSongValues((prev: any) => ({
          ...prev,
          addModal: false,
          singleItem: null,
          showModal: false,
        }))
      },
    }
  )

  //delete mutation
  const { mutate: onDeleteMusic, isLoading: isDelLoading } = useMutation(
    Api.music.deleteMusic,
    {
      onSuccess: () => {
        setSongValues((prev: any) => ({
          ...prev,
          singleItem: null,
          showModal: false,
        }))
        queryClient.invalidateQueries('getMusics')
        methods.reset()
        alert('Music Deleted')
      },
      onError: (error) => {
        alert(error)
      },
    }
  )

  const onRowClick = (item: ISingleItem, index: number) => {
    console.log(item)

    setSongValues((prev: any) => ({
      ...prev,
      showModal: false,
      singleItem: item,
      selectedIndex: index,
      showPlayer: index === prev.selectedIndex ? !prev.showPlayer : true,
    }))
  }

  const onEdit = (item: ISingleItem) => {
    setSongValues((prev: any) => ({
      ...prev,
      addModal: true,
      isEdit: true,
      singleItem: item,
    }))
    methods.reset({
      title: item.title,
      artist: item.artist,
      time: item.time,
      file: item?.file,
    })
  }

  const onDelete = (item: ISingleItem) => {
    onDeleteMusic(item.id)
  }

  const onSubmit = (data: IAddSongResolver) => {
    !songValues.isEdit
      ? mutate(data)
      : mutate({ ...data, id: songValues.singleItem.id })
  }

  const onOpenAddModal = () => {
    methods.reset({
      title: '',
      artist: '',
      time: '',
      file: '',
    })
    setSongValues((prev: any) => ({
      ...prev,
      addModal: true,
      isEdit: false,
      singleItem: null,
      showModal: false,
    }))
  }

  return {
    onEdit,
    methods,
    onSubmit,
    onDelete,
    onRowClick,
    songValues,
    setSongValues,
    onOpenAddModal,
    isLoading: isLoading || isDelLoading,
  }
}

export default useSongs
