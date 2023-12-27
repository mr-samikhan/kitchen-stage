import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IsettingsSlice {
  isLogoutModal?: boolean
}

const initialState: IsettingsSlice = {
  isLogoutModal: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    SET_LOGOUT_MODAL: (state, action: PayloadAction<boolean>) => {
      state.isLogoutModal = action.payload
    },
  },
})

export const { SET_LOGOUT_MODAL } = settingsSlice.actions
export default settingsSlice.reducer
