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
