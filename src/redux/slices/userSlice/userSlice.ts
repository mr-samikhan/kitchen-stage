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
  all?: string
  name?: string
  state?: string
  sortType?: string
  joinedDate?: string
}

interface IFilterBy {
  ageRange?: []
  gender?: []
  experience?: []
  sortType?: string
  businessType?: []
}

interface IUserSlice {
  tabValue: ITabs['tabValue']
  isPasswordSent?: boolean
  isUserUpdateModal?: boolean
  sortBy?: ISortBy
  filterBy?: IFilterBy
}

const initialState: IUserSlice = {
  tabValue: 'personal',
  isPasswordSent: false,
  isUserUpdateModal: false,
  sortBy: {
    all: '',
    name: '',
    state: '',
    joinedDate: '',
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
      state.sortBy = action.payload
      // state.sortBy = { ...state.sortBy, sortType: action.payload }
    },
    SET_FILTER_TYPE: (state, action: PayloadAction<any>) => {
      state.filterBy = { ...state.filterBy, ...action.payload }
    },
  },
})

export const {
  SET_TAB_VALUE,
  SET_SORT_TYPE,
  SET_FILTER_TYPE,
  USER_RESET_PASSWORD,
  USER_ACCOUNT_UPDATED,
} = userSlice.actions
export default userSlice.reducer
