import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const calculateAgeRange = (dateOfBirth: Timestamp) => {
  if (!dateOfBirth) return 'N/A'
  const dob = dateOfBirth.toDate()

  const currentDate = new Date()

  const age = currentDate.getFullYear() - dob.getFullYear()

  let ageRange
  if (age >= 0 && age <= 27) {
    ageRange = '21-27'
  } else if (age > 27 && age <= 35) {
    ageRange = '28-35'
  } else if (age > 35 && age <= 43) {
    ageRange = '36-43'
  } else if (age > 44 && age <= 51) {
    ageRange = '44-51'
  } else {
    ageRange = '52 and over'
  }

  return ageRange
}
export const formatPhoneNumber = (phoneNumber: string | undefined) => {
  const digitsOnly = phoneNumber?.replace(/\D/g, '')

  const formattedNumber = `+1 (${digitsOnly?.substring(
    0,
    3
  )}) ${digitsOnly?.substring(3, 6)}-${digitsOnly?.substring(6, 10)}`

  return formattedNumber
}

export const formatDateToToday = (dateString: any) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  const now = new Date()

  now.setHours(0, 0, 0, 0)

  const givenDate = new Date(dateString)
  givenDate.setHours(0, 0, 0, 0)

  // Calculate the difference in days
  const diff = now.getTime() - givenDate.getTime()
  const diffDays = diff / (1000 * 60 * 60 * 24)

  let dayIndicator
  if (diffDays === 0) {
    dayIndicator = 'Today'
  } else if (diffDays === 1) {
    dayIndicator = 'Yesterday'
  } else {
    // Formatting the date as 'MM/DD/YYYY' if it's not today or yesterday
    dayIndicator = givenDate.toLocaleDateString()
  }

  let hours = date.getHours()
  const minutes = date.getMinutes()

  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  const minutesFormatted = minutes < 10 ? '0' + minutes : minutes

  // Return formatted string
  return `${dayIndicator} ${hours}:${minutesFormatted} ${ampm}`
}

export const generateWeekGap = () => {
  const start = new Date()

  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const startMonth = start.toLocaleString('default', { month: 'short' })
  const startDay = start.getDate()
  const endMonth = end.toLocaleString('default', { month: 'short' })
  const endDay = end.getDate()

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
}

export const getLastMonthDateRange = () => {
  const today = new Date()
  const year = today.getFullYear()

  const firstDayOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  )
  const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0) // Last day of last month

  const monthName = firstDayOfLastMonth.toLocaleString('default', {
    month: 'short',
  })

  const formattedDateRange = `${monthName} ${firstDayOfLastMonth.getDate()} - ${monthName} ${lastDayOfLastMonth.getDate()}`

  return formattedDateRange
}

export const calculatePercentageIncrease = (
  currentWeek: number,
  lastWeek: number
) => {
  return lastWeek > 0 ? ((currentWeek / lastWeek) * 100).toFixed(2) : 0
}

export function formatStartEndDate(startDate: Date, endDate: Date): string {
  const startFormat = 'MMMM d'

  const endFormat =
    startDate.getFullYear() === endDate.getFullYear()
      ? 'MMMM d'
      : 'MMMM d, yyyy'

  const formattedStartDate = format(startDate, startFormat)
  const formattedEndDate = format(endDate, endFormat)

  const yearSuffix =
    startDate.getFullYear() === endDate.getFullYear()
      ? `, ${startDate.getFullYear()}`
      : ''

  return `${formattedStartDate} - ${formattedEndDate}${yearSuffix}`
}

export const getStartOfDay = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

export const getEndOfDay = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(23, 59, 59, 999)
  return newDate
}

export const getCurrentWeekRange = (date: Date) => {
  const now = new Date(date)
  const firstDayOfWeek = new Date(
    now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1))
  )
  firstDayOfWeek.setHours(0, 0, 0, 0)

  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)
  lastDayOfWeek.setHours(23, 59, 59, 999)

  return { start: firstDayOfWeek, end: lastDayOfWeek }
}

export const getLastWeekRange = (date: Date) => {
  const { start: firstDayOfCurrentWeek } = getCurrentWeekRange(date)

  const firstDayOfLastWeek = new Date(firstDayOfCurrentWeek)
  firstDayOfLastWeek.setDate(firstDayOfLastWeek.getDate() - 7)

  const lastDayOfLastWeek = new Date(firstDayOfLastWeek)
  lastDayOfLastWeek.setDate(lastDayOfLastWeek.getDate() + 6)
  lastDayOfLastWeek.setHours(23, 59, 59, 999)

  return { start: firstDayOfLastWeek, end: lastDayOfLastWeek }
}

export const getCurrentMonthRange = (date: Date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  endOfMonth.setHours(23, 59, 59, 999)

  return { start: startOfMonth, end: endOfMonth }
}
