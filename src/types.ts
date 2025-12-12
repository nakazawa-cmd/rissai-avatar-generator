export type HairId = `hair_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;

export type EyesId = `eyes_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17}`;

export type MouthId = `mouth_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17}`;

export type CheekId = 'blush' | 'no_blush';

export type AvatarConfig = {
  hair: HairId;
  eyes: EyesId;
  mouth: MouthId;
  cheeks: CheekId;
};

export const HAIR_OPTIONS: HairId[] = [
  'hair_1', 'hair_2', 'hair_3', 'hair_4', 'hair_5',
  'hair_6', 'hair_7', 'hair_8', 'hair_9', 'hair_10'
];

export const EYES_OPTIONS: EyesId[] = [
  'eyes_1', 'eyes_2', 'eyes_3', 'eyes_4', 'eyes_5',
  'eyes_6', 'eyes_7', 'eyes_8', 'eyes_9', 'eyes_10',
  'eyes_11', 'eyes_12', 'eyes_13', 'eyes_14', 'eyes_15',
  'eyes_16', 'eyes_17'
];

export const MOUTH_OPTIONS: MouthId[] = [
  'mouth_1', 'mouth_2', 'mouth_3', 'mouth_4', 'mouth_5',
  'mouth_6', 'mouth_7', 'mouth_8', 'mouth_9', 'mouth_10',
  'mouth_11', 'mouth_12', 'mouth_13', 'mouth_14', 'mouth_15',
  'mouth_16', 'mouth_17'
];

export const CHEEK_OPTIONS: CheekId[] = ['blush', 'no_blush'];

