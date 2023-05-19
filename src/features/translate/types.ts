export type GroupText = {
  locate: number[][];
  text: string;
};

export type ImageDeteted = {
  image: string;
  groupText: CustomObject<GroupText>;
};
