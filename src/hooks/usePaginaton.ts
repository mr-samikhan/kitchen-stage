import React, { useState, useEffect, useCallback } from 'react'

type ItemType = {
  name: string
  email: string
}

type UsePaginationReturnType = {
  currentItems: ItemType[]
  goToNextPage: () => void
  goToPreviousPage: () => void
  currentPage: number
  totalPages: number
}

export const usePagination = (data: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  )
  const [currentItems, setCurrentItems] = useState<ItemType[]>([])

  const goToNextPage = useCallback(
    () => setCurrentPage((page) => Math.min(page + 1, totalPages - 1)),
    [totalPages]
  )
  const goToPreviousPage = useCallback(
    () => setCurrentPage((page) => Math.max(page - 1, 0)),
    []
  )

  useEffect(() => {
    const start = currentPage * itemsPerPage
    const end = start + itemsPerPage
    setCurrentItems(data?.slice(start, end))
  }, [currentPage, itemsPerPage, data])

  useEffect(() => {
    setTotalPages(Math.ceil(data?.length / itemsPerPage))
  }, [data, itemsPerPage])

  return {
    currentItems,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    totalPages,
  }
}

export default usePagination
