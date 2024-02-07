const cors = require('cors')({ origin: true })
import { COLLECTIONS } from '../../constant'
import { CreateAdminDto } from '../../types'
import { auth, firestore } from 'firebase-admin'
import { Request, Response, https } from 'firebase-functions'

export const createAdmin = () =>
  https.onRequest(async (request: Request, response: Response) => {
    cors(request, response, async () => {
      try {
        const { email, userName, password, role } =
          request.body as CreateAdminDto

        if (!email)
          response
            .status(400)
            .json({ success: false, message: 'Email field is required' })

        if (!role)
          response.status(400).json({
            success: false,
            message: 'Role field is required',
          })

        if (!password)
          response.status(400).json({
            success: false,
            message: 'Password field is required',
          })

        if (!userName)
          response.status(400).json({
            success: false,
            message: 'Username field is required',
          })

        const user = await auth().createUser({
          email,
          password,
          disabled: false,
          emailVerified: true,
          displayName: userName,
        })

        await firestore().doc(`/${COLLECTIONS.ADMINS}/${user.uid}`).create({
          role,
          email,
          userName,
          uid: user.uid,
          createdAt: new Date(),
        })

        response.send(`${userName} account has been created!`)
      } catch (error: any) {
        response.status(500).json({ error: error.message })
      }
    })
  })
