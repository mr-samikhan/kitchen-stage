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
