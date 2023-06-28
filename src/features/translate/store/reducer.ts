import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import type { DataTranslate, ImageDeteted, TranslateState } from '../types';

export const initialState: TranslateState = {
  fontSize: 14,
  maxWidth: 15,
  showOriginText: false,
  handing: false,
  useCurrentImage: true,
  font: '',
};

const slice = createSlice({
  name: 'translateStore',
  initialState,
  reducers: {
    changeFont(state, action: PayloadAction<string>) {
      state.font = action.payload;
    },
    changeFontSize(state, action: PayloadAction<number>) {
      state.fontSize = action.payload;
    },
    changeShowOriginText(state, action: PayloadAction<boolean>) {
      state.showOriginText = action.payload;
    },
    changeMaxWidth(state, action: PayloadAction<number>) {
      state.maxWidth = action.payload;
    },
    changeUseCurrentImage(state, action: PayloadAction<boolean>) {
      state.useCurrentImage = action.payload;
    },

    detectBubble(state) {
      state.handing = true;
    },

    translateText(state, _action: PayloadAction<DataTranslate[]>) {
      state.handing = true;
    },

    removeText(state, _action: PayloadAction<CustomObject<number[][]>>) {
      state.handing = true;
    },

    updateDataDetect(state, actions: PayloadAction<ImageDeteted | undefined>) {
      state.dataDetect = actions.payload;
      state.handing = false;
    },

    updateOriginImage(state, action: PayloadAction<string | undefined>) {
      state.originImage = action.payload;
    },

    updateImageDetect(state, action: PayloadAction<string>) {
      state.dataDetect = {
        ...state.dataDetect,
        imageDetected: action.payload,
      };
      state.handing = false;
    },
  },
});

export const { actions, name: key, reducer } = slice;
