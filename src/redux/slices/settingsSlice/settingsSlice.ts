import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IsettingsSlice {
  isError?: {}
  isLogoutModal?: boolean
}

const initialState: IsettingsSlice = {
  isError: {},
  isLogoutModal: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    SET_LOGOUT_MODAL: (state, action: PayloadAction<boolean>) => {
      state.isLogoutModal = action.payload
    },
    SET_SETTINGS_ERROR: (state, action: PayloadAction<{}>) => {
      state.isError = action.payload
    },
  },
})

export const { SET_LOGOUT_MODAL, SET_SETTINGS_ERROR } = settingsSlice.actions
export default settingsSlice.reducer
