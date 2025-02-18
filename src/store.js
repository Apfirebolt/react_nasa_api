import { configureStore } from '@reduxjs/toolkit'
import capsuleReducer from './features/capsule/capsuleSlice'


export const store = configureStore({
  reducer: {
    capsuleData: capsuleReducer,
  },
})