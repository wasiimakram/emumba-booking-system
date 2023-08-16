import { createSlice } from '@reduxjs/toolkit'
import { toursData } from '../../../app-data/app.data';

const initialState = {
  tours:[],
  myTours:[],
  tourDetails:[],
  myTourDetails:[],
}
export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    getTours: (state) => {
      if (!state.tours || state.tours.length === 0) {
        state.tours = toursData;
      }
    },
    getTourDetails: (state,{payload}) => {
        state.tourDetails = toursData.find((tour) => tour.slug === payload);
    },
    bookTour: (state,{payload}) => {
        const data = {
          ...payload,
          tour: toursData[Math.floor(Math.random() * 6)],
        };
        state.myTours=[...state.myTours,data]
    },
    deleteTour:(state,{payload})=>{
      state.myTours.splice(payload, 1);
    },
    getMyTourDetails:(state,{payload})=>{
      state.myTourDetails = state.myTours.find((item) => item.tour.slug === payload);
    },
    updateTour: (state,action) => {
      const formData=action.payload[0];
      const tourRecord = action.payload[1];
      const slug = action.payload[2];
      const updatedTour = {
        ...formData,
        tour: tourRecord,
      };
      const updatedTourState = state.myTours.filter(item => item.tour && item.tour.slug !== slug)
      state.myTours=[...updatedTourState,updatedTour]
    },
  },
})

export const { getTours,getTourDetails,bookTour,deleteTour,getMyTourDetails,updateTour } = listingSlice.actions
export const selectTours = (state)=>state.listing.tours
export const selectMyTours = (state)=>state.listing.myTours
export const selectTourDetails = (state)=>state.listing.tourDetails
export const selectMyTourDetails = (state)=>state.listing.myTourDetails

export default listingSlice.reducer