import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IsupportSlice {
  isToolTipModal?: boolean
  isViewMessage?: boolean
  isToolTip?: string | null
  isConfirmSuspension?: boolean
}

const initialState: IsupportSlice = {
  isToolTip: null,
  isViewMessage: false,
  isToolTipModal: false,
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
  },
})

export const { SET_TOOL_TIP, SET_VIEW_MESSAGE, SET_CONFIRM_SUSPENSION } =
  supportSlice.actions
export default supportSlice.reducer
