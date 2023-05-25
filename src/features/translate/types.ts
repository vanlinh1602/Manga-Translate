export type GroupText = {
  locate: number[][];
  text: string;
  textTrans: string;
};

export type ImageDeteted = {
  imageDetected?: string;
  groupText?: CustomObject<GroupText>;
};

export type DataTranslate = {
  text: string;
  location: number[][];
};

export type TranslateState = {
  fontSize: number;
  showOriginText: boolean;
  maxWidth: number;
  handing: boolean;
  originImage?: string;
  dataDetect?: ImageDeteted;
};
