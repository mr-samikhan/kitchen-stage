import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IsupportSlice {
  singleSupportData: any
  isExportModal?: boolean
  isViewMessage?: boolean
  isToolTipModal?: boolean
  isToolTip?: string | null
  isExportSuccess?: boolean
  isConfirmSuspension?: boolean
}

const initialState: IsupportSlice = {
  isToolTip: null,
  isExportModal: false,
  isViewMessage: false,
  isToolTipModal: false,
  isExportSuccess: false,
  singleSupportData: null,
  isConfirmSuspension: false,
}

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    SET_TOOL_TIP: (state, action: PayloadAction<any>) => {
      state.isToolTipModal = action.payload.isToolTipModal
      state.isToolTip = action.payload.isToolTip
    },
    SET_VIEW_MESSAGE: (state, action: PayloadAction<boolean>) => {
      state.isViewMessage = action.payload
    },
    SET_CONFIRM_SUSPENSION: (state, action: PayloadAction<boolean>) => {
      state.isConfirmSuspension = action.payload
    },
    SET_EXPORT_MODAL: (state, action: PayloadAction<boolean>) => {
      state.isExportModal = action.payload
    },
    SET_EXPORT_SUCCESS: (state, action: PayloadAction<boolean>) => {
      state.isExportSuccess = action.payload
    },
    SET_SINGLE_SUPPORT_DATA: (state, action: PayloadAction<any>) => {
      state.singleSupportData = action.payload.user
      state.isViewMessage = action.payload.isViewMessage
    },
  },
})
export const {
  SET_TOOL_TIP,
  SET_VIEW_MESSAGE,
  SET_EXPORT_MODAL,
  SET_EXPORT_SUCCESS,
  SET_CONFIRM_SUSPENSION,
  SET_SINGLE_SUPPORT_DATA,
} = supportSlice.actions
export default supportSlice.reducer
