import { configureStore } from '@reduxjs/toolkit'
import capsuleReducer from './features/capsule/capsuleSlice'
import coreReducer from './features/core/coreSlice'


export const store = configureStore({
  reducer: {
    capsuleData: capsuleReducer,
    coreData: coreReducer,
  },
})