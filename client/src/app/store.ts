import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import recordReducer from '../features/records/recordSlice'
import activityReducer from '../features/activities/activitySlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    records: recordReducer,
    activities: activityReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
