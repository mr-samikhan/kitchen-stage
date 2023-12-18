import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserSlice {
  tabValue: 'personal' | 'business'
}

const initialState: IUserSlice = {
  tabValue: 'personal',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_TAB_VALUE: (state, action: PayloadAction<'personal' | 'business'>) => {
      state.tabValue = action.payload
    },
  },
})

export const { SET_TAB_VALUE } = userSlice.actions
export default userSlice.reducer
