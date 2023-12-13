import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../slices/headerSlice/headerSlice'

const store = configureStore({
  reducer: {
    header: headerSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
