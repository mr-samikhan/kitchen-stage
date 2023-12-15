import { adminSlice, headerSlice } from '@cookup/redux'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    admin: adminSlice,
    header: headerSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
