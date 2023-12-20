import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IHeaderSlice {
  isSortModal: boolean
  isSearchFocus: boolean
  isDeleteModal: boolean
  isSuspendModal: boolean
  isDeleteSuccess: boolean
  isOpenAdminModal: boolean
}

const initialState: IHeaderSlice = {
  isSortModal: false,
  isSearchFocus: false,
  isDeleteModal: false,
  isSuspendModal: false,
  isDeleteSuccess: false,
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
    SET_SEARCH_FOCUS: (state, action: PayloadAction<boolean>) => {
      state.isSearchFocus = !action.payload
    },
    SET_SUSPEND_MODAL: (state, action: PayloadAction<boolean>) => {
      state.isSuspendModal = action.payload
    },
    SET_DELETE_MODAL: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModal = action.payload
    },
    SET_SUCCESS_DELETE: (state, action: PayloadAction<boolean>) => {
      state.isDeleteSuccess = action.payload
    },
  },
})

export const {
  OPEN_SORT_MODAL,
  CLOSE_SORT_MODAL,
  OPEN_ADMIN_MODAL,
  CLOSE_ADMIN_MODAL,
  SET_SEARCH_FOCUS,
  SET_SUSPEND_MODAL,
  SET_DELETE_MODAL,
  SET_SUCCESS_DELETE,
} = headerSlice.actions
export default headerSlice.reducer
