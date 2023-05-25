import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'types';

import { initialState } from './reducer';

const selectDomain = (state: RootState) => state?.translateStore || initialState;

export const selectWating = createSelector([selectDomain], (state) => state.handing);

export const selectFontSize = createSelector([selectDomain], (state) => state.fontSize);

export const selectShowOriginText = createSelector([selectDomain], (state) => state.showOriginText);

export const selectOriginImage = createSelector([selectDomain], (state) => state.originImage);

export const selectTranslateData = createSelector([selectDomain], (state) => state);

export const selectDataDetect = createSelector([selectDomain], (state) => state.dataDetect);
