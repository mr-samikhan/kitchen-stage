import { configureStore } from '@reduxjs/toolkit'
import {
  adminSlice,
  headerSlice,
  userSlice,
  settingsSlice,
} from '@cookup/redux'

const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
    header: headerSlice,
    settings: settingsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
