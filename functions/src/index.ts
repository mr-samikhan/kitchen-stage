import admin from 'firebase-admin'
import * as methods from './methods'

admin.initializeApp()

exports.deleteAdmin = methods.deleteAdmin()
exports.createAdmin = methods.createAdmin()
exports.updateAdmin = methods.updateAdmin()
