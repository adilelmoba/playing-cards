import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum MonsterType {
  PLANT = "plant",
  ELECTRIC = "electric",
  FIRE = "fire",
  WATER = "water"
}

export interface IMonsterProperties {
  icon: IconProp;
  color: string;
}

export const MonsterTypeProperties: { [ key in MonsterType ]: IMonsterProperties } = {
  [MonsterType.PLANT]: {
    icon: 'leaf',
    color: 'rgba(135, 255, 124)'
  },
  [MonsterType.ELECTRIC]: {
    icon: 'bolt',
    color: 'rgba(255, 255, 104)'
  },
  [MonsterType.FIRE]: {
    icon: 'fire',
    color: 'rgba(255, 104, 104)'
  },  
  [MonsterType.WATER]: {
    icon: 'droplet',
    color: 'rgba(255, 100, 30)'
  }
}