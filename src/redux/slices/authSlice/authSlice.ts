import { Api } from '@cookup/services'
import { RootState } from 'redux/store/store'
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { auth } from '@cookup/firebase'

export interface IUser {
  uid: string
  role: string
  email: string
  userName: string
  lastLogin?: string
  phoneNumber?: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface IAuthSlice {
  isLoading: boolean
  user: IUser | null
  isAuthenticated: boolean
  error: {} | string | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  userLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: IAuthSlice = {
  user: null,
  error: null,
  loading: 'idle',
  userLoading: 'idle',
  isLoading: false,
  isAuthenticated: false,
}

export const loginUser = createAsyncThunk<any, LoginCredentials>(
  'auth/login',
  async (creds, { rejectWithValue }) => {
    try {
      const { user } = await Api.auth.login(creds)
      return user
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

//define types
export const getCurrentUserData = createAsyncThunk<
  IUser,
  any,
  { rejectValue: SerializedError }
>('auth/getCurrentUser', async (user_, { rejectWithValue }: any) => {
  try {
    const { user } = await Api.auth.getCurrentUser(user_)
    return user
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_AUTHENTICATED: (state) => {
      state.isAuthenticated = true
    },
    SET_UNAUTHENTICATED: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    UPDATE_USER: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    SET_LOADING: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    SET_ERROR: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    CLEAR_ERROR: (state) => {
      state.error = null
    },
    LOGOUT: () => {
      return initialState
    },
  },
  extraReducers(builder) {
    // Pending action
    builder.addCase(loginUser.pending, (state) => {
      state.loading = 'pending'
    })

    // Success action
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    })

    // Failure action
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload ? action.payload : 'Failed to log in'
    })

    // Pending action
    builder.addCase(getCurrentUserData.pending, (state) => {
      state.userLoading = 'pending'
    })

    // Success action
    builder.addCase(getCurrentUserData.fulfilled, (state, action) => {
      state.userLoading = 'succeeded'
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    })

    // Failure action
    builder.addCase(getCurrentUserData.rejected, (state, action) => {
      state.userLoading = 'failed'
      state.error = action.payload ? action.payload : 'no user found'
    })
  },
})

export const {
  LOGOUT,
  UPDATE_USER,
  SET_ERROR,
  SET_LOADING,
  CLEAR_ERROR,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectLoading = (state: RootState) => state.auth.loading
export const selectError = (state: RootState) => state.auth.error
