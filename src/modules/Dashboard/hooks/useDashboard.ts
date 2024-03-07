import { Api } from '@cookup/services'
import React, { useEffect } from 'react'
import { ROUTES } from '@cookup/constant'
import { useMutation } from 'react-query'
import { useGetUsers } from '@cookup/hooks'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  SET_END_DATE,
  SET_START_DATE,
  SET_SORT_VALUE,
  CLOSE_SORT_MODAL,
} from '@cookup/redux'

export const useDashboard = () => {
  let { users, usersLoading } = useGetUsers({})

  const {
    data,
    isLoading: filterLoading,
    mutate,
  } = useMutation<any, any, any, any>(Api.dashboard.getAllCounters, {})

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const { sortBy, startDate, endDate } = useSelector((state: any) => state.user)

  useEffect(() => {
    if (sortBy.type === '' && startDate === '' && endDate === '') {
      mutate({ interval: '' })
    } else if (sortBy.type === 'today') {
      mutate({ interval: sortBy.type })
    } else if (sortBy.type === 'lastWeek') {
      mutate({ interval: sortBy.type })
    } else if (sortBy.type === 'lastMonth') {
      mutate({ interval: sortBy.type })
    }
    if (startDate !== '' && endDate !== '') {
      mutate({ interval: '', startDate, endDate })
    }
  }, [sortBy.type, startDate, endDate])

  useEffect(() => {
    if (pathname !== ROUTES.ANALYTICS || ROUTES.ROOT) {
      dispatch(SET_SORT_VALUE({ type: '' }))
      dispatch(SET_START_DATE(''))
      dispatch(SET_END_DATE(''))
      dispatch(CLOSE_SORT_MODAL())
    }
  }, [pathname])

  return {
    data,
    users,
    filterLoading,
    isLoading: usersLoading,
  }
}

export default useDashboard
