import { configureStore } from '@reduxjs/toolkit'
import {
  userSlice,
  adminSlice,
  headerSlice,
  supportSlice,
  settingsSlice,
} from '@cookup/redux'

const store = configureStore({
  reducer: {
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
