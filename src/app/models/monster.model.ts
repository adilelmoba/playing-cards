import { MonsterType } from "../utils/monster.utils";

export class Monster {

  id: number = -1;
  name: string = "My Monster";
  image: string = "assets/img/1.png";
  type: MonsterType = MonsterType.ELECTRIC;
  hp: number = 40;
  figureCaption: string = "N°001 Monster";
  attackName : string = "Geo Impact";
  attackStrength: number = 60;
  attackDescription: string = "This attack is very powerful and can destroy everything in its path.";

  copy(): Monster {
    return Object.assign(new Monster(), this);
  }
}