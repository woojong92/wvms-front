import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface IThemeState {
  isDark: boolean
}

// Define the initial state using that type
const initialState: IThemeState = {
    isDark: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      setIsDart: (state, action) => { state.isDark = action.payload }
  },
})

export const { setIsDart } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.theme.isDark

export default themeSlice.reducer;