import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAdminSlice {
  isAdminSuccess: boolean
  isAdminEditModal: boolean
  isAdminEditSuccess: boolean
  isDeleteAdminModal: boolean
  isDeleteAdminSuccess?: boolean
}

const initialState: IAdminSlice = {
  isAdminSuccess: false,
  isAdminEditModal: false,
  isAdminEditSuccess: false,
  isDeleteAdminModal: false,
  isDeleteAdminSuccess: false,
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
    OPEN_DELETE_ADMIN_MODAL: (state) => {
      state.isDeleteAdminModal = true
    },
    CLOSE_DELETE_ADMIN_MODAL: (state) => {
      state.isDeleteAdminModal = false
    },
    OPEN_DELETE_ADMIN_SUCCESS: (state, action: PayloadAction<boolean>) => {
      state.isDeleteAdminSuccess = action.payload
    },
  },
})

export const {
  OPEN_ADMIN_SUCCESS,
  CLOSE_ADMIN_SUCCESS,
  OPEN_EDIT_ADMIN_MODAL,
  CLOSE_EDIT_ADMIN_MODAL,
  OPEN_ADMIN_EDIT_SUCCESS,
  OPEN_DELETE_ADMIN_MODAL,
  CLOSE_DELETE_ADMIN_MODAL,
  CLOSE_ADMIN_EDIT_SUCCESS,
  OPEN_DELETE_ADMIN_SUCCESS,
} = adminSlice.actions
export default adminSlice.reducer
