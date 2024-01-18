import { configureStore } from '@reduxjs/toolkit'
import {
  userSlice,
  adminSlice,
  headerSlice,
  supportSlice,
  settingsSlice,
  authSlice,
} from '@cookup/redux'

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    admin: adminSlice,
    header: headerSlice,
    support: supportSlice,
    settings: settingsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
