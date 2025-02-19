import { configureStore } from '@reduxjs/toolkit'
import capsuleReducer from './features/capsule/capsuleSlice'
import coreReducer from './features/core/coreSlice'
import payloadReducer from './features/payload/payloadSlice'
import missionReducer from './features/mission/missionSlice'
import rocketReducer from './features/rocket/rocketSlice'
import shipReducer from './features/ship/shipSlice'
import dragonReducer from './features/dragon/dragonSlice'
import historyReducer from './features/history/historySlice'
import landingPadReducer from './features/landing/landingPadSlice'
import launchReducer from './features/launch/launchSlice'

export const store = configureStore({
  reducer: {
    capsuleData: capsuleReducer,
    coreData: coreReducer,
    payloadData: payloadReducer,
    missionData: missionReducer,
    rocketData: rocketReducer,
    shipData: shipReducer,
    dragonData: dragonReducer,
    historyData: historyReducer,
    landingPadData: landingPadReducer,
    launchData: launchReducer,
  },
})