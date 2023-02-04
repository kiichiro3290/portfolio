import { themeReducer } from './theme'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 日付とかはシリアライズでエラーが出る
      },
    }),
  reducer: {
    theme: themeReducer,
  },
})

// 型定義
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
