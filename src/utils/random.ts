import type { AvatarConfig } from '../types';
import {
  HAIR_OPTIONS,
  EYES_OPTIONS,
  MOUTH_OPTIONS,
  CHEEK_OPTIONS,
} from '../types';

/**
 * ランダムなアバター設定を生成する
 */
export function generateRandomAvatar(): AvatarConfig {
  return {
    hair: getRandomItem(HAIR_OPTIONS),
    eyes: getRandomItem(EYES_OPTIONS),
    mouth: getRandomItem(MOUTH_OPTIONS),
    cheeks: getRandomItem(CHEEK_OPTIONS),
  };
}

/**
 * 配列からランダムに1つの要素を取得する
 */
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

