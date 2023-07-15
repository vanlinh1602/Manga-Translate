import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { backendService } from 'services';

import type { DataTranslate, ImageDeteted, Translated, TranslateState } from '../types';
import { actions as translateAction } from './reducer';
import { selectOriginImage, selectTranslateData } from './selectors';

function* detectBubble() {
  const image: string = yield select(selectOriginImage);
  const result: WithApiResult<ImageDeteted> = yield backendService.post<ImageDeteted>(
    '/detectBubble',
    { image }
  );

  if (result.kind === 'ok') {
    yield put(translateAction.updateDataDetect(result.data));
    return;
  }
  yield put(translateAction.updateDataDetect(undefined));
  notification.warning({
    message: 'Detect Fail',
    description: result.kind,
  });
}

function* translateText(action: PayloadAction<CustomObject<DataTranslate>>) {
  const data = action.payload;
  const translateData: TranslateState = yield select(selectTranslateData);
  const useOriginImage = !translateData.useCurrentImage;
  const result: WithApiResult<{ image: string }> = yield backendService.post<{ image: string }>(
    '/translateText',
    {
      image: useOriginImage ? translateData.originImage : translateData.dataDetect?.imageDetected,
      fontSize: translateData.fontSize,
      maxWidth: translateData.maxWidth,
      dataTrans: Object.values(data).map((value) => value),
      font: translateData.font ?? 'Roboto',
    }
  );

  if (result.kind === 'ok') {
    const translated: Translated = {};
    Object.entries(data).forEach(([key, value]) => {
      translated[key] = {
        text: value.text,
        location: value.location,
        font: translateData.font,
        fontSize: translateData.fontSize,
        textInLine: translateData.maxWidth,
      };
    });

    yield put(translateAction.updateImageDetect(result.data.image));
    yield put(translateAction.updateTranslated(translated));
    return;
  }
  yield put(translateAction.updateImageDetect());
  notification.warning({
    message: 'Translate Fail',
    description: result.kind,
  });
}

function* removeText(action: PayloadAction<CustomObject<number[][]>>) {
  const location = action.payload;
  const translateData: TranslateState = yield select(selectTranslateData);

  const selectedGroup = Object.keys(location).map((key) => key);
  const transLatedData: Translated = {};
  Object.entries(translateData.translated ?? {}).forEach(([key, data]) => {
    if (!selectedGroup.includes(key)) {
      transLatedData[key] = data;
    }
  });

  const result: WithApiResult<{ image: string }> = yield backendService.post<{ image: string }>(
    '/removeText',
    {
      image: translateData.originImage,
      location,
      translated: transLatedData,
    }
  );
  if (result.kind === 'ok') {
    yield put(translateAction.updateImageDetect(result.data.image));
    return;
  }
  yield put(translateAction.updateImageDetect());
  notification.warning({
    message: 'Remmove Text Fail',
    description: result.kind,
  });
}

export default function* saga() {
  yield all([takeLatest(translateAction.detectBubble.type, detectBubble)]);
  yield all([takeLatest(translateAction.translateText.type, translateText)]);
  yield all([takeLatest(translateAction.removeText.type, removeText)]);
}
