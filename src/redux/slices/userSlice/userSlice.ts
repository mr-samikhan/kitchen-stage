import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITabs {
  tabValue:
    | 'email'
    | 'password'
    | 'personal'
    | 'business'
    | 'account-info'
    | 'profile-info'
    | 'uploaded-media'
    | 'ads'
    | 'reports'
    | 'suspended-users'
    | 'resolved'
    | 'current'
    | 'expired'
    | 'drafts'
}

interface ISortBy {
  sortValue?: string
  sortType?: string
}

interface IFilterBy {
  ageRange?: []
  gender?: []
  experience?: []
  sortType?: string
  businessType?: []
}

interface IUserSlice {
  endDate?: string | Date
  startDate?: string | Date
  sortBy?: ISortBy
  filterBy?: IFilterBy
  isPasswordSent?: boolean
  tabValue: ITabs['tabValue']
  isUserUpdateModal?: boolean
}

const initialState: IUserSlice = {
  tabValue: 'personal',
  isPasswordSent: false,
  isUserUpdateModal: false,
  startDate: '',
  endDate: '',
  sortBy: {
    sortValue: '',
    sortType: 'ascending',
  },
  filterBy: {
    gender: [],
    sortType: '',
    ageRange: [],
    experience: [],
    businessType: [],
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_TAB_VALUE: (state, action: PayloadAction<ITabs['tabValue']>) => {
      state.tabValue = action.payload
    },
    USER_RESET_PASSWORD: (state, action: PayloadAction<boolean>) => {
      state.isPasswordSent = action.payload
    },
    USER_ACCOUNT_UPDATED: (state, action: PayloadAction<boolean>) => {
      state.isUserUpdateModal = action.payload
    },
    SET_SORT_TYPE: (state, action: PayloadAction<any>) => {
      state.sortBy = { ...state.sortBy, ...action.payload }
    },
    SET_SORT_VALUE: (state, action: PayloadAction<any>) => {
      state.sortBy = { ...state.sortBy, ...action.payload }
    },
    SET_FILTER_TYPE: (state, action: PayloadAction<any>) => {
      state.filterBy = { ...state.filterBy, ...action.payload }
    },
    SET_START_DATE: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload
    },
    SET_END_DATE: (state, action: PayloadAction<any>) => {
      state.endDate = action.payload
    },
    CLEAR_USER_VALUES: (state) => {
      state.startDate = ''
      state.endDate = ''
      state.sortBy = { sortValue: '', sortType: 'ascending' }
    },
  },
})

export const {
  SET_TAB_VALUE,
  SET_SORT_TYPE,
  SET_SORT_VALUE,
  SET_START_DATE,
  SET_END_DATE,
  SET_FILTER_TYPE,
  CLEAR_USER_VALUES,
  USER_RESET_PASSWORD,
  USER_ACCOUNT_UPDATED,
} = userSlice.actions
export default userSlice.reducer
