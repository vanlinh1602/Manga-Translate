export type GroupText = {
  locate: number[][];
  text: string;
  textTrans: string;
};

export type ImageDeteted = {
  originImage: string;
  imageDetected: string;
  groupText: CustomObject<GroupText>;
};
