import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IHeaderSlice {
  isSortModal: boolean
  isOpenAdminModal: boolean
  isAdminSuccess: boolean
}

const initialState: IHeaderSlice = {
  isSortModal: false,
  isAdminSuccess: false,
  isOpenAdminModal: false,
}

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    OPEN_SORT_MODAL: (state) => {
      state.isSortModal = true
    },
    CLOSE_SORT_MODAL: (state) => {
      state.isSortModal = false
    },
    OPEN_ADMIN_MODAL: (state) => {
      state.isOpenAdminModal = true
    },
    CLOSE_ADMIN_MODAL: (state) => {
      state.isOpenAdminModal = false
    },
    OPEN_ADMIN_SUCCESS: (state) => {
      state.isAdminSuccess = true
    },
    CLOSE_ADMIN_SUCCESS: (state) => {
      state.isAdminSuccess = false
    },
  },
})

export const {
  OPEN_SORT_MODAL,
  CLOSE_SORT_MODAL,
  OPEN_ADMIN_MODAL,
  CLOSE_ADMIN_MODAL,
  OPEN_ADMIN_SUCCESS,
  CLOSE_ADMIN_SUCCESS,
} = headerSlice.actions
export default headerSlice.reducer
