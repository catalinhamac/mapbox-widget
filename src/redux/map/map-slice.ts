import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mapboxgl from 'mapbox-gl';

import { RootState } from '../store';

interface InitialState {
  map: mapboxgl.Map | null;
}

export const initialState: InitialState = {
  map: null
};

export const slice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<mapboxgl.Map>) => {
      state.map = action.payload;
    },
  },
});

export const { setMap } = slice.actions;

export const selectMap = (state: RootState): null | mapboxgl.Map=>
  state.map.map;

export default slice.reducer;
