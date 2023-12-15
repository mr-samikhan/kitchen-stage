import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAdminSlice {
  isAdminSuccess: boolean
  isAdminEditModal: boolean
  isAdminEditSuccess: boolean
}

const initialState: IAdminSlice = {
  isAdminSuccess: false,
  isAdminEditModal: false,
  isAdminEditSuccess: false,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    OPEN_ADMIN_SUCCESS: (state) => {
      state.isAdminSuccess = true
    },
    CLOSE_ADMIN_SUCCESS: (state) => {
      state.isAdminSuccess = false
    },
    OPEN_EDIT_ADMIN_MODAL: (state) => {
      state.isAdminEditModal = true
    },
    CLOSE_EDIT_ADMIN_MODAL: (state) => {
      state.isAdminEditModal = false
    },
    OPEN_ADMIN_EDIT_SUCCESS: (state) => {
      state.isAdminEditSuccess = true
    },
    CLOSE_ADMIN_EDIT_SUCCESS: (state) => {
      state.isAdminEditSuccess = false
    },
  },
})

export const {
  OPEN_ADMIN_SUCCESS,
  CLOSE_ADMIN_SUCCESS,
  OPEN_EDIT_ADMIN_MODAL,
  CLOSE_EDIT_ADMIN_MODAL,
  OPEN_ADMIN_EDIT_SUCCESS,
  CLOSE_ADMIN_EDIT_SUCCESS,
} = adminSlice.actions
export default adminSlice.reducer
