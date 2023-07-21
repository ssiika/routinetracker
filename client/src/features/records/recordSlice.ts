import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import recordService from './recordService'
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

export const getRecords = createAsyncThunk<object[], undefined, { state: RootState }>('record/get',
async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await recordService.getRecords(token);
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
        recordReset: (state) => initialState
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
            .addCase(getRecords.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.userRecordList = action.payload;
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const {recordReset} = recordSlice.actions;
export default recordSlice.reducer