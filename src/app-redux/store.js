import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './modules/tours/tourSlice'

export const store = configureStore({
  reducer: {
    listing: listingReducer,
  },
})