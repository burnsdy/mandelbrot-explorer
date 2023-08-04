import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  DEFAULT_MAX_ITERATIONS,
  DEFAULT_COLOR_SCHEME
} from '../utils/constants';
import { AppState } from './store';

interface RenderingSettingsState {
  maxIterations: number;
  colorScheme: string[];
}

const initialState: RenderingSettingsState = {
  maxIterations: DEFAULT_MAX_ITERATIONS,
  colorScheme: DEFAULT_COLOR_SCHEME
};

export const renderingSettingsSlice = createSlice({
  name: 'renderingSettings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.maxIterations = action.payload.maxIterations;
      state.colorScheme = action.payload.colorScheme;
    }
  },
  // HYDRATE action dispatched whenever pages that contain getStaticProps or getServerSideProps are opened
  // action.payload contains the state at the moment of static generation/SSR, so reducer must merge it with existing client state
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.renderingSettings
      };
    }
  }
});

export const { updateSettings } = renderingSettingsSlice.actions;
export const selectMaxIterations = (state: AppState) =>
  state.renderingSettings.maxIterations;
export const selectColorScheme = (state: AppState) =>
  state.renderingSettings.colorScheme;
export default renderingSettingsSlice.reducer;
