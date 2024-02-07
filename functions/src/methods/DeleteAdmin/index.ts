const cors = require('cors')({ origin: true })
import { COLLECTIONS } from '../../constant'
import { auth, firestore } from 'firebase-admin'
import { Request, Response, https } from 'firebase-functions'

export const deleteAdmin = () =>
  https.onRequest(async (request: Request, response: Response) => {
    cors(request, response, async () => {
      try {
        const { id } = request.query as { id: string }

        if (!id)
          response
            .status(400)
            .json({ success: false, message: 'ID field is required' })

        await auth().deleteUser(id)

        await firestore().doc(`/${COLLECTIONS.ADMINS}/${id}`).delete()

        response.send(`Admin account has been deleted!`)
      } catch (error: any) {
        response.status(500).json({ error: error.message })
      }
    })
  })
