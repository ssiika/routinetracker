import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import recordService from './recordService'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { RootState } from '../../app/store'

interface state {
    userRecordList: object[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
    
}

const initialState: state = {
    userRecordList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createRecord = createAsyncThunk<object[], object, { state: RootState }>('record/create',
async (recordData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recordService.createRecord(recordData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const recordSlice = createSlice({
    name: 'record', 
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.userRecordList.push(action.payload);
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})