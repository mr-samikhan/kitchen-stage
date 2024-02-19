const cors = require('cors')({ origin: true })
import { UpdateAdminDto } from '../../types'
import { COLLECTIONS } from '../../constant'
import { auth, firestore } from 'firebase-admin'
import { Request, Response, https } from 'firebase-functions'

export const updateAdmin = () =>
  https.onRequest(async (request: Request, response: Response) => {
    cors(request, response, async () => {
      try {
        const { id, email, userName, role, phoneNumber } =
          request.body as UpdateAdminDto

        if (!email)
          response
            .status(400)
            .json({ success: false, message: 'Email field is required' })

        if (!role)
          response.status(400).json({
            success: false,
            message: 'Role field is required',
          })

        if (!id)
          response.status(400).json({
            success: false,
            message: 'ID field is required',
          })

        if (!userName)
          response.status(400).json({
            success: false,
            message: 'Username field is required',
          })

        const user = await auth().updateUser(id, {
          email,
          displayName: userName,
        })

        await firestore()
          .doc(`/${COLLECTIONS.ADMINS}/${user.uid}`)
          .update({
            role,
            email,
            userName,
            phoneNumber: phoneNumber || '',
          })

        response.send(`${userName} account has been updated!`)
      } catch (error: any) {
        response.status(500).json({ error: error.message })
      }
    })
  })
