import { SendMailOptions } from 'nodemailer'
import { mailTransporter } from '../../config'

class Email {
  send(params: SendMailOptions) {
    return new Promise((resolve, reject) => {
      try {
        mailTransporter.sendMail(params, (error: Error | null, info) => {
          if (error) {
            reject(error?.message)
          } else {
            console.log(info.response)

            resolve('The email has been sent successfully.')
          }
        })
      } catch (error: any) {
        console.error(error)

        reject(error?.message)
      }
    })
  }
}

export const EmailService = new Email()
