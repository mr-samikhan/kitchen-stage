import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserSlice {
  tabValue:
    | 'personal'
    | 'business'
    | 'account-info'
    | 'profile-info'
    | 'uploaded-media'
  isPasswordSent?: boolean
  isUserUpdateModal?: boolean
}

const initialState: IUserSlice = {
  tabValue: 'personal',
  isPasswordSent: false,
  isUserUpdateModal: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_TAB_VALUE: (
      state,
      action: PayloadAction<
        | 'personal'
        | 'business'
        | 'account-info'
        | 'profile-info'
        | 'uploaded-media'
      >
    ) => {
      state.tabValue = action.payload
    },
    USER_RESET_PASSWORD: (state, action: PayloadAction<boolean>) => {
      state.isPasswordSent = action.payload
    },
    USER_ACCOUNT_UPDATED: (state, action: PayloadAction<boolean>) => {
      state.isUserUpdateModal = action.payload
    },
  },
})

export const { SET_TAB_VALUE, USER_RESET_PASSWORD, USER_ACCOUNT_UPDATED } =
  userSlice.actions
export default userSlice.reducer
