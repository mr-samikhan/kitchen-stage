import functions = require('firebase-functions')
import admin = require('firebase-admin')

export const sendEmailVerification = () =>
  functions.auth.user().onCreate((user) => {
    if (user.email) {
      const email = user.email

      return admin
        .auth()
        .generateEmailVerificationLink(email, {
          url: 'https://kitchen-stage.web.app/',
        })
        .then((link) => {
          console.log(`Verification email sent to ${email} with link: ${link}`)
        })
        .catch((error) => {
          console.error(`Error sending verification email to ${email}`, error)
        })
    }

    return null
  })
