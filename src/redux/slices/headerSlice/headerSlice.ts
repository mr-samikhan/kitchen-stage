import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IHeaderSlice {
  isSortModal: boolean
}

const initialState: IHeaderSlice = {
  isSortModal: false,
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
  },
})

export const { OPEN_SORT_MODAL, CLOSE_SORT_MODAL } = headerSlice.actions
export default headerSlice.reducer
