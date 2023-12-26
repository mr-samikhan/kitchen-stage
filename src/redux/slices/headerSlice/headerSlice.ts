import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IHeaderSlice {
  isSortModal: boolean
  isFilterModal: boolean
  isSearchFocus: boolean
  isDeleteModal: boolean
  isSuspendModal: boolean
  isUserSuspened: boolean
  isDeleteSuccess: boolean
  isOpenAdminModal: boolean
  isUserSuspension: boolean
  unsuspenedUser?: boolean
  isSuspensionSuccess: boolean
}

const initialState: IHeaderSlice = {
  isSortModal: false,
  isFilterModal: false,
  isSearchFocus: false,
  isDeleteModal: false,
  unsuspenedUser: false,
  isSuspendModal: false,
  isUserSuspened: false,
  isDeleteSuccess: false,
  isUserSuspension: false,
  isOpenAdminModal: false,
  isSuspensionSuccess: false,
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
    SET_USER_SUSPENSION: (state, action: PayloadAction<boolean>) => {
      state.isUserSuspension = action.payload
    },
    SET_SUSPENSION_SUCCESS: (state, action: PayloadAction<boolean>) => {
      state.isSuspensionSuccess = action.payload
      state.isUserSuspened = true
    },
    SET_UNSUSPEND_USER: (state, action: PayloadAction<boolean>) => {
      state.unsuspenedUser = action.payload
      state.isUserSuspened = false
    },
    SET_FILTER_MODAL: (state, action: PayloadAction<boolean>) => {
      state.isFilterModal = action.payload
    },
  },
})

export const {
  OPEN_SORT_MODAL,
  CLOSE_SORT_MODAL,
  OPEN_ADMIN_MODAL,
  SET_SEARCH_FOCUS,
  SET_DELETE_MODAL,
  SET_FILTER_MODAL,
  SET_SUSPEND_MODAL,
  CLOSE_ADMIN_MODAL,
  SET_UNSUSPEND_USER,
  SET_SUCCESS_DELETE,
  SET_USER_SUSPENSION,
  SET_SUSPENSION_SUCCESS,
} = headerSlice.actions
export default headerSlice.reducer
