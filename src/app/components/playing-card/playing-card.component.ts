import { Component, input, Input, InputSignal, OnChanges, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Monster } from '../../models/monster.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent implements OnChanges {
  
  @Input() monster = new Monster();
  monsterTypeIcon: IconProp = "bolt";
  backgroundColor: string = "rgb(255, 255, 104)";

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['monster']) {
      if (changes['monster'].previousValue?.type !== changes['monster'].currentValue.type) {
        this.monsterTypeIcon = MonsterTypeProperties[this.monster.type].icon;
        this.backgroundColor = MonsterTypeProperties[this.monster.type].color;
      }
    }
  }

}
