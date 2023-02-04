import { RootState } from '~/store'
import { darkTheme, lightTheme } from '~/theme'

import { createSlice } from '@reduxjs/toolkit'

import type { PaletteMode } from '@mui/material'

// ユーザの初期状態
export type InitialThemeStateType = {
  mode: PaletteMode
}
const initialState: InitialThemeStateType = {
  mode: 'light',
}

export const themeSlice = createSlice({
  // 初期状態
  initialState,
  name: 'theme',

  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload
    },
  },
})

// Reducer→Storeと接続するため
export const themeReducer = themeSlice.reducer

// actionを取り出す
export const { setMode } = themeSlice.actions

// Selecter→状態を取り出す
export const selectTheme = (state: RootState) =>
  state.theme.mode === 'light' ? lightTheme : darkTheme
export const selectMode = (state: RootState) => state.theme.mode
