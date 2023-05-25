import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { backendService } from 'services';

import type { DataTranslate, ImageDeteted, TranslateState } from '../types';
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

function* translateText(action: PayloadAction<DataTranslate[]>) {
  const data = action.payload;
  const translateData: TranslateState = yield select(selectTranslateData);
  const result: WithApiResult<{ image: string }> = yield backendService.post<{ image: string }>(
    '/translateText',
    {
      image: translateData.originImage,
      fontSize: translateData.fontSize,
      maxWidth: translateData.maxWidth,
      dataTrans: data,
    }
  );

  if (result.kind === 'ok') {
    yield put(translateAction.updateImageDetect(result.data.image));
    return;
  }
  notification.warning({
    message: 'Translate Fail',
    description: result.kind,
  });
}

function* removeText(action: PayloadAction<CustomObject<number[][]>>) {
  const location = action.payload;
  const image: string = yield select(selectOriginImage);

  const result: WithApiResult<{ image: string }> = yield backendService.post<{ image: string }>(
    '/removeText',
    {
      image,
      location,
    }
  );
  if (result.kind === 'ok') {
    yield put(translateAction.updateImageDetect(result.data.image));
    return;
  }
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
