import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import activityService from './activityService'
import { RootState } from '../../app/store'
import { Activity, activityState } from '../../types'

const initialState: activityState = {
    userActivityList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createActivity = createAsyncThunk<Activity, object, { state: RootState }>('activity/create',
async (activityData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.createActivity(activityData, token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const getActivities = createAsyncThunk<Activity[], undefined, { state: RootState }>('activity/get',
async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.getActivities(token);
    } catch (error) {
        let message = 'unknown error message'
        if (error instanceof Error) {
                message = error.message || 
                error.toString();
                return thunkAPI.rejectWithValue(message)
        }
    }
})

export const activitySlice = createSlice({
    name: 'activity', 
    initialState, 
    reducers: {
        activityReset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.userActivityList.push(action.payload);
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getActivities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getActivities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.userActivityList = action.payload;
            })
            .addCase(getActivities.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const {activityReset} = activitySlice.actions;
export default activitySlice.reducer