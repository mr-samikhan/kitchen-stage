import React, { useEffect } from 'react'
import { ROUTES } from '@cookup/constant'
import { useGetUsers } from '@cookup/hooks'
import {
  CLOSE_SORT_MODAL,
  SET_END_DATE,
  SET_SORT_VALUE,
  SET_START_DATE,
} from '@cookup/redux'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { calculatePercentageIncrease } from '@cookup/helpers'
import { Api } from '@cookup/services'
import { useQuery } from 'react-query'

interface User {
  createdAt: {
    seconds: number
  }
}

export const useDashboard = () => {
  let { users, usersLoading } = useGetUsers({})

  const { data } = useQuery<any>(
    ['getAllCounters'],
    Api.dashboard.getAllCounters,
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  console.log(data, ':::::::data')

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const [filterData, setFilterData] = React.useState(null)

  const { sortBy, startDate, endDate } = useSelector((state: any) => state.user)

  const now = new Date()

  const startOfThisWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay(),
    0,
    0,
    0
  )

  const startOfLastWeek = new Date(
    startOfThisWeek.getTime() - 7 * 24 * 60 * 60 * 1000
  )

  function filterDataBetweenDates(
    users: User[],
    startDate: Date,
    endDate: Date
  ): User[] {
    return users?.filter((item: User) => {
      if (!item?.createdAt || item?.createdAt?.seconds === undefined) {
        return false
      }
      const itemDate = new Date(item.createdAt.seconds * 1000)
      const applyStartDate = startDate.getTime()
      const applyEndDate = endDate.getTime()

      return (
        itemDate.getTime() >= applyStartDate &&
        itemDate.getTime() <= applyEndDate
      )
    })
  }

  useEffect(() => {
    if (sortBy.type === 'today') {
      const filter = users?.filter(
        (user: any) =>
          new Date(user?.createdAt?.seconds * 1000).toDateString() ===
          new Date().toDateString()
      )
      return setFilterData(filter)
    } else if (sortBy.type === 'lastWeek') {
      const filter = users?.filter((user: any) => {
        const createdAtDate = new Date(user?.createdAt?.seconds * 1000)
        return (
          createdAtDate >= startOfLastWeek && createdAtDate < startOfThisWeek
        )
      })
      return setFilterData(filter)
    } else if (sortBy.type === 'lastMonth') {
      const filter = users?.filter((user: any) => {
        const createdAtDate = new Date(user?.createdAt?.seconds * 1000)
        return createdAtDate.getMonth() === now.getMonth()
      })
      return setFilterData(filter)
    } else if (startDate !== '' && endDate !== '') {
      const filter: any = filterDataBetweenDates(users, startDate, endDate)
      return setFilterData(filter)
    }
  }, [sortBy.type, users, startDate, endDate])

  useEffect(() => {
    if (pathname !== ROUTES.ANALYTICS || ROUTES.ROOT) {
      dispatch(SET_SORT_VALUE({ type: '' }))
      dispatch(SET_START_DATE(''))
      dispatch(SET_END_DATE(''))
      dispatch(CLOSE_SORT_MODAL())
    }
  }, [pathname])

  let usersCheck = filterData || users

  const registeredUsers = usersCheck?.filter(
    (user: any) => user.status === 'Active'
  )

  const unregisteredUsers = usersCheck?.filter(
    (user: any) => user.status === 'Inactive' || user.status === 'Pending'
  )

  const isUserCreatedWithin = (user: any, startTime: Date, endTime: Date) => {
    const createdAtDate = new Date(user?.createdAt?.seconds * 1000)
    return createdAtDate >= startTime && createdAtDate < endTime
  }

  const usersLastWeek = usersCheck?.filter((user: any) =>
    isUserCreatedWithin(user, startOfLastWeek, startOfThisWeek)
  )

  const usersThisWeek = usersCheck?.filter((user: any) =>
    isUserCreatedWithin(user, startOfThisWeek, now)
  )

  const registeredUsersLastWeek = usersLastWeek?.filter(
    (user: any) => user.status === 'Active'
  )
  const registeredUsersThisWeek = usersThisWeek?.filter(
    (user: any) => user.status === 'Active'
  )

  const deactivatedUsersLastWeek = usersLastWeek?.filter(
    (user: any) => user.status === 'Inactive' || user.status === 'Pending'
  )
  const deactivatedUsersThisWeek = usersThisWeek?.filter(
    (user: any) => user.status === 'Inactive' || user.status === 'Pending'
  )

  // Total counts
  const totalRegisteredUsersLastWeek = registeredUsersLastWeek?.length
  const totalRegisteredUsersThisWeek = registeredUsersThisWeek?.length

  const totalDeactivatedUsersLastWeek = deactivatedUsersLastWeek?.length
  const totalDeactivatedUsersThisWeek = deactivatedUsersThisWeek?.length

  const registeredPercentageIncrease = calculatePercentageIncrease(
    totalRegisteredUsersThisWeek,
    totalRegisteredUsersLastWeek
  )
  const deactivatedPercentageIncrease = calculatePercentageIncrease(
    totalDeactivatedUsersThisWeek,
    totalDeactivatedUsersLastWeek
  )

  //new
  useEffect(() => {
    Api.dashboard.getAllAnalytics().then((data: any) => {
      console.log(data, '::::::')
    })
  }, [])

  return {
    registeredUsers,
    unregisteredUsers,
    users: usersCheck,
    isLoading: usersLoading,
    registeredPercentageIncrease,
    deactivatedPercentageIncrease,
  }
}

export default useDashboard
