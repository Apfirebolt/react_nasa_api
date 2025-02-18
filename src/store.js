import { configureStore } from '@reduxjs/toolkit'
import capsuleReducer from './features/capsule/capsuleSlice'
import coreReducer from './features/core/coreSlice'
import payloadReducer from './features/payload/payloadSlice'
import missionReducer from './features/mission/missionSlice'


export const store = configureStore({
  reducer: {
    capsuleData: capsuleReducer,
    coreData: coreReducer,
    payloadData: payloadReducer,
    missionData: missionReducer,
  },
})