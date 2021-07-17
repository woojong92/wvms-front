import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    // createAsyncThunk,
    // createSelector,
  } from '@reduxjs/toolkit';
//   import Axios from 'axios';
//   import { API_ADDRESS } from '../../services';
  
  export const appAdapter = createEntityAdapter();
  const initialState = appAdapter.getInitialState({
    profile: null,
    token: null,
  });
  
  // export const updateUserInfo = createAsyncThunk(
  //   'myInfo/updateUserInfo',
  //   async (params, { getState, requestId }) => {
  //     const { loading, currentRequestId } = getState().faq;
  //     console.log('call fetchFaq');
  //     if (loading !== 'pending' || currentRequestId !== requestId) {
  //       return;
  //     }
  //     try {
  //       const response = await Axios({
  //         method: 'put',
  //         url: `${API_ADDRESS}/user`,
  //         headers: { Authorization: `Bearer ${params.accessToken}` },
  //         data: params.userInfo,
  //         timeout: 3000,
  //       });
  
  //       console(response);
  //       return response.data;
  //       // console.log(response);
  //       // if (response.success) {
  //       //   return response.list;
  //       // } else {
  //       //   return [];
  //       // }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  // );
  
  export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setProfile: (state, action) => { state.profile = action.payload},
        setToken: (state, action) => {state.token = action.payload},
    },
    extraReducers: {
      // [updateUserInfo.pending]: (state, action) => {
      //   if (state.loading === 'idle') {
      //     state.loading = 'pending';
      //     state.currentRequestId = action.meta.requestId;
      //   }
      // },
      // [updateUserInfo.fulfilled]: (state, action) => {
      //   const { requestId } = action.meta;
      //   if (state.loading === 'pending' && state.currentRequestId === requestId) {
      //     state.loading = 'idle';
      //     state.faqList = action.payload;
      //     state.currentRequestId = undefined;
      //   }
      // },
      // [updateUserInfo.rejected]: (state, action) => {
      //   const { requestId } = action.meta;
      //   if (state.loading === 'pending' && state.currentRequestId === requestId) {
      //     state.loading = 'idle';
      //     state.error = action.error;
      //     state.currentRequestId = undefined;
      //   }
      // },
    },
  });
  
  const { reducer, actions } = appSlice;
  export const { setProfile, setToken } = actions;
  export default reducer;
  