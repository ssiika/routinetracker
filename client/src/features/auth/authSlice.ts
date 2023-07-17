import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage

const user = JSON.parse(localStorage.getItem('user') || '{}')

const initialState = {
    user: user ? user : null, 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

interface User {
    username: string,
    password: string
}

// Register user
export const register = createAsyncThunk('auth/register', async (user: User, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
        
        return thunkAPI.rejectWithValue(message);
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user: User, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
        
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    return await authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer